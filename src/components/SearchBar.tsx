"use client";

import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        my: 3,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Buscar productos..."
        size="small"
        sx={{
          width: "50%",
          bgcolor: "#fff",
          borderRadius: 2,
        }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
