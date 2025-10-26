import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: "#fff",
  border: "1.5px solid #ccc",
  margin: "auto",
  width: "60%",
  transition: "all 0.3s ease",
  "&:hover": { borderColor: "#000" },
  "&:focus-within": {
    borderColor: "#000",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
  },
  [theme.breakpoints.down("sm")]: { width: "80%" },
  [theme.breakpoints.down("xs")]: { width: "100%" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#333",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#000",
  width: "100%",
  fontFamily: "monospace",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: "1rem",
  },
}));

export default function MinimalNavbar() {
  const searchRef = useRef();
  const cursorRef = useRef();
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const topics = [
    "nature",
    "interior",
    "aesthetic",
    "fashion",
    "travel",
    "photography",
  ];

  // Typing animation
  useEffect(() => {
    if (query) return;

    let topicIndex = 0;
    let charIndex = 0;
    let forward = true;
    const typeSpeed = 0.15;
    const pauseTime = 1.2;

    const typeWord = () => {
      const word = topics[topicIndex];
      const display = word.slice(0, charIndex);
      if (searchRef.current) searchRef.current.textContent = display;

      if (forward) {
        charIndex++;
        if (charIndex > word.length) {
          forward = false;
          gsap.delayedCall(pauseTime, typeWord);
          return;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          forward = true;
          topicIndex = (topicIndex + 1) % topics.length;
        }
      }

      gsap.delayedCall(typeSpeed, typeWord);
    };

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      duration: 0.5,
      yoyo: true,
    });
    typeWord();
  }, [query]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setVisible(true);
      setOpacity(1);
    } else if (location.pathname.startsWith("/results")) {
      setVisible(false);
      setOpacity(0.85);
    } else if (location.pathname.startsWith("/full-image")) {
      setVisible(false);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith("/results")) {
      const handleMouseMove = (e) => {
        if (e.clientY < 50) setVisible(true);
        else if (e.clientY > 100) setVisible(false);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") navigate(`/results/${query}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (
    location.pathname.startsWith("/full-image") ||
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup")
  )
    return null;

  return (
    <Box sx={{ flexGrow: 1, pb: 2 }}>
      <AppBar
        position="fixed"
        sx={{
          borderRadius: "0px",
          backgroundColor:
            location.pathname === "/" ? "#fff" : "rgba(255,255,255,0.85)",
          backdropFilter: location.pathname === "/" ? "none" : "blur(10px)",
          padding: "10px 20px",
          boxShadow:
            location.pathname === "/"
              ? "0 2px 15px rgba(0,0,0,0.15)"
              : "0 8px 20px rgba(0,0,0,0.25)",
          transition:
            "transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease",
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          opacity: visible ? opacity : 0,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#000",
              fontFamily: "Merriweather",
              fontSize: { xs: "1.5rem", sm: "2rem" },
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            IdeaScape
          </Typography>

          <form onSubmit={handleSearch} style={{ flexGrow: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <div style={{ position: "relative" }}>
                <StyledInputBase
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  inputProps={{ "aria-label": "search" }}
                  placeholder=""
                />
                {!query && (
                  <span
                    ref={searchRef}
                    style={{
                      position: "absolute",
                      left: "40px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#888",
                      pointerEvents: "none",
                      fontFamily: "monospace",
                    }}
                  />
                )}
                <span
                  ref={cursorRef}
                  style={{
                    position: "absolute",
                    left: "40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                    fontWeight: "bold",
                    pointerEvents: "none",
                  }}
                >
                  |
                </span>
              </div>
            </Search>
          </form>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              ml: { xs: 0, sm: 2 },
              flexDirection: { xs: "column", sm: "row" },
              mt: { xs: 1, sm: 0 },
            }}
          >
            {isLoggedIn ? (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  color: "#000",
                  borderColor: "#000",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  sx={{
                    textTransform: "none",
                    color: "#000",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "25px" }} /> {/* Padding for content */}
    </Box>
  );
}
