import Link from "@mui/material/Link";
import Button from "components/Button";
import Box from "components/Box";
import Typography from "components/Typography";
import Icon from "@mui/material/Icon";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useController, setAuth } from "context";

function SidenavFooter() {
  const [controller, dispatch] = useController();
  const { miniSidenav, darkSidenav } = controller;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuth(dispatch, false);
      localStorage.removeItem("adminAuth");
      localStorage.removeItem("Tokens");
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <Box opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <Box position="relative" textAlign="center">
        <Box mb={2}>
          <Button
            color="error"
            variant="gradient"
            fullWidth
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Icon>logout</Icon>
            Logout
          </Button>
        </Box>
        <Box
          width="100%"
          pt={2}
          px={2}
          color={darkSidenav ? "white" : "dark"}
          textAlign="center"
          lineHeight={0}
        >
          <Typography color="inherit" variant="h6">
            Need help?
          </Typography>
          <Typography color="inherit" variant="caption">
            Please reach at dev@acmeflare.in
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default SidenavFooter;
