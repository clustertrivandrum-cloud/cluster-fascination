import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import Box from "components/Box";
import Input from "components/Input";
import { Switch } from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { useController, setAuth } from "context";
import toast from "react-hot-toast";

const Login = () => {
  const [controller, dispatch] = useController();
  const [data, setData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load saved credentials if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRememberMe = localStorage.getItem("rememberMe");
    if (savedEmail && savedRememberMe === "true") {
      setData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRememberMeChange = () => setRememberMe((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        process.env.REACT_APP_USERNAME === data.email &&
        process.env.REACT_APP_PASSWORD === data.password
      ) {
        toast.success("Login Successful");
        setAuth(dispatch, true);

        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberMe");
        }
      } else {
        toast.error("Invalid username or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        title: "Cluster Fascination",
        description: "Admin Management Console",
      }}
      color="info"
    >
      <Box
        component="form"
        role="form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box mb={2}>
          <Input
            type="email"
            placeholder="Email / Username"
            size="large"
            onChange={handleChange}
            name="email"
            value={data.email}
            disabled={loading}
            autoFocus
            required
          />
        </Box>
        <Box mb={2}>
          <Input
            type="password"
            placeholder="Password"
            size="large"
            onChange={handleChange}
            name="password"
            value={data.password}
            disabled={loading}
            required
            autoComplete="current-password"
          />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Switch
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color="info"
            disabled={loading}
          />
          <Typography
            variant="button"
            fontWeight="regular"
            onClick={handleRememberMeChange}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </Typography>
        </Box>
        <Box mt={3} mb={1}>
          <Button
            color="info"
            size="large"
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
       
      </Box>
    </AuthLayout>
  );
};

export default Login;
