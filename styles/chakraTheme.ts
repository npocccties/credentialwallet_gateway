import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        dialogContainer: {
          px: 2,
        },
      },
    },
  },
});
