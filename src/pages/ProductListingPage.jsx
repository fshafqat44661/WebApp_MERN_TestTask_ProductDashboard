import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid, Button, Alert } from "@mui/material";
import { ErrorOutline, Inventory } from "@mui/icons-material";
import {
  loadProducts,
  loadCategories,
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
} from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import SortDropdown from "../components/SortDropdown";
import Loader from "../components/Loader";

function ProductListingPage() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
  }, [dispatch]);

  if (loading && products.length === 0) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <ErrorOutline sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Error Loading Products
        </Typography>
        <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => dispatch(loadProducts())}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Products
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SearchBar />
          </Box>
          <Box sx={{ width: { xs: "100%", lg: 256 } }}>
            <SortDropdown />
          </Box>
        </Box>

        <FilterBar />
      </Box>

      {products.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Inventory sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            No Products Found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
        >
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ProductListingPage;
