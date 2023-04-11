import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#127C95",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "15px",
          width: "145px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
