export default function Button(theme) {
    return {
      MuiButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              boxShadow: "none",
              borderRadius: 0,
            },
          },
          sizeLarge: {
            height: 60,
          },
          containedInherit: {
            color: theme.palette.grey[900],
            boxShadow: theme.customShadows.main,
            backgroundColor: theme.palette.secondary.white,
            borderRadius: 0,
            "&:hover": {
              backgroundColor: theme.palette.secondary.secondaryGrey,
              borderRadius: 0,
            },
          },
          containedPrimary: {
            boxShadow: theme.customShadows.main,
            borderRadius: 0,
          },
          containedSecondary: {
            boxShadow: theme.customShadows.main,
            borderRadius: 0,
          },
          outlinedInherit: {
            border: `1px solid ${theme.palette.grey[500_32]}`,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
          textInherit: {
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    };
  }