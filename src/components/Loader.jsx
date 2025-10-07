import { CircularProgress, Box, Backdrop } from "@mui/material";

function Loader({ size = "medium", fullScreen = false }) {
  const sizeMap = {
    small: 24,
    medium: 48,
    large: 64,
  };

  const spinner = (
    <CircularProgress size={sizeMap[size]} aria-label="Loading" />
  );

  if (fullScreen) {
    return (
      <Backdrop
        open
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {spinner}
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      {spinner}
    </Box>
  );
}

export default Loader;
