 ;

import { useDispatch, useSelector } from "react-redux";
import { Box, Chip } from "@mui/material";
import {
  setCategory,
  selectFilters,
  selectCategories,
} from "../features/products/productsSlice";

function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const categories = useSelector(selectCategories);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      <Chip
        label="All"
        onClick={() => handleCategoryChange("all")}
        color={filters.category === "all" ? "primary" : "default"}
        variant={filters.category === "all" ? "filled" : "outlined"}
        sx={{ textTransform: "capitalize" }}
      />
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          onClick={() => handleCategoryChange(category)}
          color={filters.category === category ? "primary" : "default"}
          variant={filters.category === category ? "filled" : "outlined"}
          sx={{ textTransform: "capitalize" }}
        />
      ))}
    </Box>
  );
}

export default FilterBar;
