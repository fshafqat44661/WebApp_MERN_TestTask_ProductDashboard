import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Badge, Box } from "@mui/material";
import { Favorite, Store } from "@mui/icons-material";
import { selectFavoritesCount } from "../features/favorites/favoritesSlice";

function Navbar() {
  const favoritesCount = useSelector(selectFavoritesCount);

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar
        sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto", px: 2 }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Store /> Product Dashboard
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/" startIcon={<Store />}>
            Products
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/favorites"
            startIcon={<Favorite />}
          >
            <Badge badgeContent={favoritesCount} color="error">
              Favorites
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
