 ;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import {
  setSearchQuery,
  selectFilters,
} from "../features/products/productsSlice";
import { useDebounce } from "../hooks/useDebounce";

function SearchBar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [inputValue, setInputValue] = useState(filters.searchQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue));
  }, [debouncedValue, dispatch]);

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <TextField
      fullWidth
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search products..."
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: inputValue && (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClear}
              edge="end"
              aria-label="Clear search"
            >
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
      aria-label="Search products"
    />
  );
}

export default SearchBar;
