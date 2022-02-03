import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    instagram: {
      gray: "#fafafa",
      border: "#dbdbdb",
      darkGray: "#8e8e8e",
      primary: "#0095f6",
    },
  },
  styles: {
    global: {
      "html, body, #__next": {
        minHeight: "100vh",
        height: "100%",
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        bg: "instagram.gray",
      },
    },
  },
  fonts: {
    heading: "Billabong",
  },
  breakpoints,
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            fontSize: "14px",
            bg: "instagram.gray",
            borderColor: "instagram.border",
            rounded: "sm",
            _placeholder: { color: "instagram.darkGray", fontSize: "14px" },
            _focus: {
              boxShadow: "none !important",
              borderColor: "instagram.darkGray",
            },
          },
        },
      },
    },
    Button: {
      baseStyle: {
        rounded: "sm",
        fontSize: "14px",
        paddingX: 2,
      },
      variants: {
        primary: {
          rounded: "sm",
          bg: "instagram.primary",
          color: "white",
          fontSize: "14px",
        },
        secondary: {
          px: 2,
          py: 1,
          rounded: "sm",
          fontSize: "14px",
          borderWidth: 1,
          borderColor: "instagram.border",
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: "14px",
      },
    },
    Link: {
      baseStyle: {
        fontSize: "14px",
        color: "instagram.primary",
        fontWeight: "medium",
      },
    },
    Menu: {
      baseStyle: {
        item: {
          fontSize: "14px",
          _hover: {
            bg: "instagram.gray",
          },
        },
        list: {
          borderWidth: 0,
          rounded: "sm",
          shadow: "md",
        },
        divider: {
          borderColor: "instagram.border",
        },
      },
    },
    Tabs: {
      baseStyle: {
        tablist: {
          justifyContent: "center",
        },
        tab: {
          _focus: {
            boxShadow: "none",
            outline: "none",
          },
        },
      },
      variants: {
        line: {
          tablist: {
            borderBottom: "1px solid",
            borderColor: "instagram.border",
          },
          tab: {
            fontSize: "14px",
            _selected: {
              borderColor: "black",
              color: "black",
            },
            color: "instagram.darkGray",
          },
        },
      },
    },
  },
});

export default theme;
