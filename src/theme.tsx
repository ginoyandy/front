import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    primary: {
      dark: '#333',
      light: '#3DB2FF',
      lighter: '#A4EBF3',
      // lighter: '#CCF2F4',
      semidark: '#080863ff',
    },
    grayblue: '#E4F1F1',
    beige: '#eef5dbff',
    error: {
      light: '#FE8E86',
      main: '#fe5f55ff',
      dark: '#650701',
    },
  },

  fonts: {
    heading: 'Open Sans Condensed',
    body: 'Source Sans Pro',
  },

  components: {
    Button: {
      variants: {
        base: {
          fontFamily: 'Open Sans',
          fontWeight: 300,
          background: 'primary.light',
          backgroundColor: 'primary.light',
          color: '#fff',
          _hover: {
            background: 'primary.lighter',
            backgroundColor: 'primary.lighter',
            color: '#333',
          },
        },
        outline: {
          borderColor: 'primary.light',
          background: '#fff',
          backgroundColor: '#fff',
          color: '#333',
          _hover: {
            borderColor: 'primary.lighter',
            background: 'primary.lighter',
            backgroundColor: 'primary.lighter',
            color: '#333',
          },
        },
        'outline-red': {
          border: '2px',
          borderColor: 'error.main',
          color: 'error.main',
          _hover: {
            background: 'error.main',
            backgroundColor: 'error.main',
            color: '#fff',
          },
        },
        error: {
          border: '2px',
          borderColor: 'error.main',
          color: '#fff',
          background: 'error.main',
          backgroundColor: 'error.main',
          _hover: {
            background: 'error.dark',
            backgroundColor: 'error.dark',
            borderColor: 'error.dark',
            color: '#fff',
          },
        },
      },
      defaultProps: {
        variant: 'base',
      },
    },
    
  },
});
