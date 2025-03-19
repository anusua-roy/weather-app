import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ComboBox({
  cities,
  setSelectedCity,
  handleChange,
  loading,
}) {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Autocomplete
        options={cities}
        getOptionLabel={(option) => option.label}
        onChange={(event, newValue) => setSelectedCity(newValue || null)}
        loading={loading}
        noOptionsText="No results found"
        sx={{
          width: "100%",
          maxWidth: 500,
          margin: "auto",
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search City"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
