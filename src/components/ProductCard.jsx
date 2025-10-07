import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Rating,
  Chip,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  addToFavorites,
  removeFromFavorites,
  selectIsFavorite,
} from "../features/favorites/favoritesSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsFavorite(product.id));

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <Card
      component={Link}
      to={`/product/${product.id}`}
      sx={{
        textDecoration: "none",
        height: 480, 
        width: 380, 
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
        position: "relative",
        mx: "auto", 
      }}
    >
      <IconButton
        onClick={handleToggleFavorite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "background.paper",
          zIndex: 1,
          "&:hover": { bgcolor: "background.paper" },
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      <CardMedia
        component="img"
        image={product.image || "/placeholder.svg"}
        alt={product.title}
        sx={{
          height: 240,
          objectFit: "contain",
          p: 2,
          bgcolor: "grey.50",
        }}
      />

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3em",
          }}
        >
          {product.title}
        </Typography>

        <Chip
          label={product.category}
          size="small"
          sx={{ alignSelf: "flex-start", textTransform: "capitalize" }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold">
            ${product.price.toFixed(2)}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Rating
              value={product.rating?.rate || 0}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography variant="caption" color="text.secondary">
              ({product.rating?.count || 0})
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
