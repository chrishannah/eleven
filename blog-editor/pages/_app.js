import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    charcoal: '#264653',
    persianGreen: '#2A9D8F',
    saffron: '#E9C46A',
    sandyBrown: '#F4A261',
    burntSienna: '#E76F51',
    charcoalDark: '#1a2f38',
    charcoalLight: '#315a6b',
  },
};

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  colors,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'brand.charcoalDark' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'teal' ? 'brand.persianGreen' : undefined,
          _hover: {
            bg: props.colorScheme === 'teal' ? 'brand.charcoal' : undefined,
          },
        }),
      },
    },
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'brand.charcoal' : 'white',
          boxShadow: props.colorMode === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.4)' : 'lg',
        },
      }),
    },
    Tag: {
      variants: {
        solid: (props) => ({
          container: {
            bg: props.colorScheme === 'blue' ? 'brand.persianGreen' :
                props.colorScheme === 'green' ? 'brand.saffron' : undefined,
            color: props.colorScheme === 'green' ? 'black' : 'white',
          },
        }),
      },
    },
    Input: {
      variants: {
        filled: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.50' : 'gray.100',
            _hover: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.200',
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.200',
              borderColor: 'brand.persianGreen',
            },
          },
        }),
      },
    },
    Textarea: {
      variants: {
        filled: (props) => ({
          bg: props.colorMode === 'dark' ? 'whiteAlpha.50' : 'gray.100',
          _hover: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.200',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'gray.200',
            borderColor: 'brand.persianGreen',
          },
        }),
      },
    },
    IconButton: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : undefined,
        _hover: {
          bg: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.200',
        },
      }),
    },
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'brand.charcoal',
      }),
    },
    FormLabel: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : undefined,
      }),
    },
    Divider: {
      baseStyle: (props) => ({
        borderColor: props.colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200',
      }),
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
