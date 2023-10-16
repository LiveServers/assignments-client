export default function Card(theme) {
    return {
      MuiCard: {
        styleOverrides: {
          root: {
            position: "relative",
            boxShadow: theme.customShadows.main,
            borderRadius: 0,
            zIndex: 0, // Fix Safari overflow: hidden with border radius
            height: "95px",
            padding: 0,
            width: "100%",
            cursor: "pointer",
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: { variant: "h6" },
          subheaderTypographyProps: {
            variant: "body2",
            marginTop: theme.spacing(0.5),
          },
        },
        styleOverrides: {
          root: {
            padding: theme.spacing(3, 3, 0),
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: theme.spacing(3),
          },
        },
      },
    };
  }