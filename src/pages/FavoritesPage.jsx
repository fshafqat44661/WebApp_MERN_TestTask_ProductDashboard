import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Rating,
  Fade,
} from "@mui/material";
import { FavoriteBorder, Delete, Visibility } from "@mui/icons-material";
import {
  selectFavorites,
  removeFromFavorites,
  clearFavorites,
} from "../features/favorites/favoritesSlice";

function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const handleRemove = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all favorites?")) {
      dispatch(clearFavorites());
    }
  };

  if (favorites.length === 0) {
    return (
      <Fade in>
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FavoriteBorder sx={{ fontSize: 80, color: "text.disabled" }} />
          <Typography variant="h4" fontWeight={700}>
            No Favorites Yet
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
            Start adding products to your favorites list to see them here.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{
              mt: 2,
              borderRadius: 3,
              px: 4,
              py: 1.2,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Browse Products
          </Button>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, pb: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            ❤️ My Favorites ({favorites.length})
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearAll}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 2.5,
            }}
          >
            Clear All
          </Button>
        </Box>

        {/* Cards */}
        <Grid container spacing={3}>
          {favorites.map((product) => (
            <Grid item xs={12} md={6} lg={4} key={product.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.9)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                  },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                {/* Product Image */}
                <Box
                  component={Link}
                  to={`/product/${product.id}`}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "grey.100",
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 180,
                    transition: "0.3s",
                    "&:hover": { bgcolor: "grey.200" },
                  }}
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: 10,
                    }}
                  />
                </Box>

                {/* Product Info */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component={Link}
                    to={`/product/${product.id}`}
                    sx={{
                      textDecoration: "none",
                      color: "text.primary",
                      fontWeight: 600,
                      lineHeight: 1.3,
                      display: "block",
                      mb: 1,
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      textTransform: "capitalize",
                      mb: 1,
                      bgcolor: "primary.light",
                      color: "white",
                      fontWeight: 500,
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 1,
                    }}
                  >
                    <Typography variant="h6" color="primary" fontWeight={700}>
                      ${product.price.toFixed(2)}
                    </Typography>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Rating
                        value={product.rating?.rate || 0}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography variant="caption" color="text.secondary">
                        ({product.rating?.rate || 0})
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: "auto",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to={`/product/${product.id}`}
                    startIcon={<Visibility />}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<Delete />}
                    onClick={() => handleRemove(product.id)}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
}

export default FavoritesPage;
