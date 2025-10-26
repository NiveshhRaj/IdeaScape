import axios from "axios";
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) return alert("Passwords do not match!");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message || "Signup failed");
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
        <Paper elevation={10} sx={{ p: 5, borderRadius: "20px", width: { xs: "90%", sm: "400px" }, mx: "auto", mt: "10vh", backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
          <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#fff" }}>Sign Up</Typography>
          <TextField label="Email" type="email" fullWidth sx={{ mb: 3, input: { color: "#fff" }, label: { color: "rgba(255,255,255,0.8)" } }} value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" fullWidth sx={{ mb: 3, input: { color: "#fff" }, label: { color: "rgba(255,255,255,0.8)" } }} value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField label="Confirm Password" type="password" fullWidth sx={{ mb: 4, input: { color: "#fff" }, label: { color: "rgba(255,255,255,0.8)" } }} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button fullWidth variant="contained" sx={{ borderRadius: "25px", py: 1.5, background: "linear-gradient(135deg, #36d1dc, #5b86e5)", "&:hover": { background: "linear-gradient(135deg, #5b86e5, #36d1dc)" } }}type="submit" onClick={handleSignup}>Sign Up</Button>
          <Typography sx={{ mt: 2, textAlign: "center", cursor: "pointer", color: "#fff", textDecoration: "underline" }} onClick={() => navigate("/login")}>Already have an account? Login</Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
