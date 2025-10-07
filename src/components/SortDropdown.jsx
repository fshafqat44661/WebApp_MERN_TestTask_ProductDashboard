 ;

import { useDispatch, useSelector } from "react-redux";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { setSortBy, selectFilters } from "../features/products/productsSlice";

function SortDropdown() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-label">Sort by</InputLabel>
      <Select
        labelId="sort-label"
        id="sort"
        value={filters.sortBy}
        label="Sort by"
        onChange={handleSortChange}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortDropdown;
