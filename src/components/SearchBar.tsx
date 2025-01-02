import React, { useState } from "react";
import { Box, Paper, InputBase, IconButton } from "@mui/material";
import Search from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Buscar productos"
          inputProps={{ "aria-label": "buscar productos" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            color: "#333",
            bgcolor: "#f8f9fa",
          }}
        />
        <IconButton
          onClick={handleSearch}
          sx={{
            p: "10px",
            color: "#38bdf8",
            "&:hover": {
              bgcolor: "#e0f2fe",
            },
          }}
        >
          <Search />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;