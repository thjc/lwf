import { createTheme } from '@mui/material/styles'
import { green, orange } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: orange[500]
    },
    secondary: {
      main: green[500]
    }
  }
})
