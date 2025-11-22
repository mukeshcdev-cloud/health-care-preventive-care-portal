import React from "react";
import { Box, Toolbar, CssBaseline } from "@mui/material";
import ProviderSidebar from "./ProviderSidebar";
import Provider from "./Provider";

const ProviderLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ProviderSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - 240px)` },
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Toolbar />
        <Provider />
      </Box>
    </Box>
  );
};

export default ProviderLayout;

