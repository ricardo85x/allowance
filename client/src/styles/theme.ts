import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({



  colors: {
    brown: {
      50: "#ffd7ab",
      100: "#ebae6a",
      200: "#bf7d32",
      300: "#a36621",
      400: "#824f15",
      500: "#854a08",
      600: "#6e3c04",
      700: "#542d02",
      800: "#402201",
      900: "#301900"
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        color: 'gray.900',
        bg: 'gray.50'
      }
    }
  }
})