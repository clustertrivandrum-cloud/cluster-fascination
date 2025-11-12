import React, { useState, useEffect } from "react";
import AuthLayout from "./AuthLayout";
import Box from "components/Box";
import Input from "components/Input";
import { Switch } from "@mui/material";
import Typography from "components/Typography";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { useController } from "context";
import { setAuth } from "context";
import toast from "react-hot-toast";
import image from "assets/images/logo.png";

const Login = () => {
  const [controller, dispatch] = useController();
  const [data, setData] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRememberMe = localStorage.getItem("rememberMe");
    if (savedEmail && savedRememberMe === "true") {
      setData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    if (
      process.env.REACT_APP_USERNAME === data?.email &&
      process.env.REACT_APP_PASSWORD === data?.password
    ) {
      toast.success("Login Successfull");
      setAuth(dispatch, true);

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data?.email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberMe");
      }
    } else {
      toast.error("Invalid username or password");
    }
  };
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  return (
    <AuthLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        title: "Cluster Fascination",
        description: "Admin Management Console",
        image,
      }}
      color="info"
    >
      <Box component="form" role="form">
        <Box mb={2}>
          <Input
            type="email"
            placeholder="Email / Username"
            size="large"
            onChange={handleChange}
            name="email"
            value={data?.email || ""}
          />
        </Box>
        <Box mb={2}>
          <Input
            type="password"
            placeholder="Password"
            size="large"
            onChange={handleChange}
            name="password"
            value={data?.password || ""}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleRememberMeChange} />
          <Typography
            variant="button"
            fontWeight="regular"
            onClick={handleRememberMeChange}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </Typography>
        </Box>
        <Box mt={4} mb={1}>
          <Button color="info" size="large" fullWidth onClick={handleLogin}>
            Sign In
          </Button>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <Typography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
