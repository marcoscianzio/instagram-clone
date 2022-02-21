import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: { primary: "#3884ff", border: "#0000003b", secondary: "#3e3e54" },
  fonts: {
    heading: "IBM Plex Sans",
    body: "IBM Plex Sans",
  },
  breakpoints,
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "border",
            py: 8,
            _placeholder: {
              color: "secondary",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderColor: "border",
          _placeholder: {
            color: "secondary",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "bold",
        letterSpacing: "tighter",
      },
    },
    Button: {
      baseStyle: {
        rounded: "xl",
      },
      variants: {
        primary: {
          bg: "primary",
          color: "white",
        },
        secondary: {
          bg: "transparent",
          borderColor: "#0000003b",
          borderWidth: 1,
          color: "secondary",
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          boxShadow: "none",
          borderWidth: 1,
          borderColor: "border",
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            color: "secondary",
            _selected: {
              borderWidth: 1,
              color: "secondary",
              borderColor: "border",
              fontWeight: "bold",
            },
          },
        },
      },
    },
  },
});

export default theme;
