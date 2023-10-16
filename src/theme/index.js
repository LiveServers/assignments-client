import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shadows, { customShadows } from "./shadows";
import componentsOverride from "./overrides";

export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};