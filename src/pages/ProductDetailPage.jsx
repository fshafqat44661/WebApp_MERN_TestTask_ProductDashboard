import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Rating,
  Grid,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  ErrorOutline,
} from "@mui/icons-material";
import {
  loadProductById,
  selectCurrentProduct,
  selectProductsLoading,
  selectProductsError,
  clearCurrentProduct,
} from "../features/products/productsSlice";
import {
  addToFavorites,
  removeFromFavorites,
  selectIsFavorite,
} from "../features/favorites/favoritesSlice";
import Loader from "../components/Loader";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectCurrentProduct);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const isFavorite = useSelector(selectIsFavorite(Number(id)));

  useEffect(() => {
    dispatch(loadProductById(id));
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <ErrorOutline sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Error Loading Product
        </Typography>
        <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Products
        </Button>
      </Box>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto" }}>
      <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mb: 3 }}>
        Back to Products
      </Button>
      <Paper elevation={2} sx={{ p: { xs: 3, lg: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
            flexWrap: "nowrap",
            "@media (max-width: 900px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              flex: "1 1 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.100",
              borderRadius: 2,
              p: 4,
              minHeight: 400,
              maxWidth: 400,
            }}
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              style={{
                maxHeight: 400,
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          <Box
            sx={{
              flex: "2 1 0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              minWidth: 0,
            }}
          >
            <Box>
              <Chip
                label={product.category}
                color="primary"
                size="small"
                sx={{ textTransform: "capitalize", mb: 2 }}
              />
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                fontWeight="bold"
              >
                {product.title}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Rating
                  value={product.rating?.rate || 0}
                  precision={0.1}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary">
                  {product.rating?.rate || 0} ({product.rating?.count || 0}{" "}
                  reviews)
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                borderTop: 1,
                borderBottom: 1,
                borderColor: "divider",
                py: 2,
              }}
            >
              <Typography variant="h3" color="primary" fontWeight="bold">
                ${product.price.toFixed(2)}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Description
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                {product.description}
              </Typography>
            </Box>

            <Button
              variant={isFavorite ? "contained" : "outlined"}
              color={isFavorite ? "error" : "primary"}
              size="large"
              startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
              onClick={handleToggleFavorite}
              fullWidth
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProductDetailPage;
