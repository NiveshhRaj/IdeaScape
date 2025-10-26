import axios from "axios";
import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }} />

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: "20px",
            width: { xs: "90%", sm: "400px" },
            mx: "auto",
            mt: "10vh",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#fff" }}>Login</Typography>
          <TextField label="Email" type="email" fullWidth sx={{ mb: 3, input: { color: "#fff" }, label: { color: "rgba(255,255,255,0.8)" } }} value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth sx={{ mb: 4, input: { color: "#fff" }, label: { color: "rgba(255,255,255,0.8)" } }} value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth variant="contained" sx={{ borderRadius: "25px", py: 1.5, background: "linear-gradient(135deg, #ff416c, #ff4b2b)", "&:hover": { background: "linear-gradient(135deg, #ff4b2b, #ff416c)" } }}type="submit" onClick={handleLogin}>Login</Button>
          <Typography sx={{ mt: 2, textAlign: "center", cursor: "pointer", color: "#fff", textDecoration: "underline" }} onClick={() => navigate("/signup")}>Don't have an account? Sign Up</Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
