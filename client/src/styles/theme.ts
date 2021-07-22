import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({

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