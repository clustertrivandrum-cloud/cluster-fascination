import React from 'react'
import PropTypes from 'prop-types';
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const PageLayout = ({ title, action, children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box py={isMobile ? 2 : 3} px={isMobile ? 1 : 0}>
      <Card sx={{ boxShadow: 10, minHeight: '70vh', overflow: 'hidden' }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems={isMobile ? "flex-start" : "center"} 
          p={isMobile ? 2 : 3}
          flexDirection={isMobile && action ? "column" : "row"}
          gap={isMobile && action ? 2 : 0}
        >
          <Typography variant="h6" sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>
            {title}
          </Typography>
          {action && (
            <Box sx={{ width: isMobile ? "100%" : "auto" }}>
              {action}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          {children}
        </Box>
      </Card>
    </Box>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLayout