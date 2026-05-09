import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { tokyoNightStorm, tokyoNightDay } from '../lib/tokyoNight';

const semanticToken = (light, dark) => ({ default: light, _dark: dark });

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  fonts: {
    heading: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`,
    body: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`,
    mono: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace`,
  },
  semanticTokens: {
    colors: {
      'tn.bg': semanticToken(tokyoNightDay.bg, tokyoNightStorm.bg),
      'tn.bgDark': semanticToken(tokyoNightDay.bgDark, tokyoNightStorm.bgDark),
      'tn.bgHighlight': semanticToken(tokyoNightDay.bgHighlight, tokyoNightStorm.bgHighlight),
      'tn.fg': semanticToken(tokyoNightDay.fg, tokyoNightStorm.fg),
      'tn.fgDark': semanticToken(tokyoNightDay.fgDark, tokyoNightStorm.fgDark),
      'tn.fgGutter': semanticToken(tokyoNightDay.fgGutter, tokyoNightStorm.fgGutter),
      'tn.comment': semanticToken(tokyoNightDay.comment, tokyoNightStorm.comment),
      'tn.cyan': semanticToken(tokyoNightDay.cyan, tokyoNightStorm.cyan),
      'tn.blue': semanticToken(tokyoNightDay.blue, tokyoNightStorm.blue),
      'tn.purple': semanticToken(tokyoNightDay.purple, tokyoNightStorm.purple),
      'tn.green': semanticToken(tokyoNightDay.green, tokyoNightStorm.green),
      'tn.yellow': semanticToken(tokyoNightDay.yellow, tokyoNightStorm.yellow),
      'tn.orange': semanticToken(tokyoNightDay.orange, tokyoNightStorm.orange),
      'tn.red': semanticToken(tokyoNightDay.red, tokyoNightStorm.red),
      'tn.selection': semanticToken(tokyoNightDay.selection, tokyoNightStorm.selection),
    },
  },
  styles: {
    global: {
      body: {
        bg: 'tn.bg',
        color: 'tn.fg',
      },
      '::selection': {
        bg: 'tn.selection',
      },
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'tnBlue' },
      baseStyle: { fontWeight: 'medium', borderRadius: 'md' },
      variants: {
        solid: (props) => {
          const map = {
            tnBlue: { bg: 'tn.blue', color: props.colorMode === 'light' ? 'white' : 'tn.bgDark' },
            tnYellow: { bg: 'tn.yellow', color: 'tn.bgDark' },
            tnRed: { bg: 'tn.red', color: 'white' },
            tnGreen: { bg: 'tn.green', color: 'tn.bgDark' },
            tnPurple: { bg: 'tn.purple', color: 'tn.bgDark' },
            blue: { bg: 'tn.blue', color: 'tn.bgDark' },
            yellow: { bg: 'tn.yellow', color: 'tn.bgDark' },
            red: { bg: 'tn.red', color: 'white' },
            teal: { bg: 'tn.cyan', color: 'tn.bgDark' },
          };
          const style = map[props.colorScheme] || map.tnBlue;
          return { ...style, _hover: { opacity: 0.85 }, _active: { opacity: 0.75 } };
        },
        ghost: {
          color: 'tn.fgDark',
          _hover: { bg: 'tn.bgHighlight', color: 'tn.fg' },
        },
        outline: {
          borderColor: 'tn.fgGutter',
          color: 'tn.fg',
          _hover: { bg: 'tn.bgHighlight' },
        },
      },
    },
    IconButton: {
      baseStyle: {
        color: 'tn.fgDark',
        _hover: { bg: 'tn.bgHighlight', color: 'tn.fg' },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'tn.bgDark',
          boxShadow: 'none',
          borderRadius: 'lg',
        },
      },
    },
    Input: {
      defaultProps: { variant: 'filled' },
      variants: {
        filled: {
          field: {
            bg: 'tn.bg',
            border: '1px solid',
            borderColor: 'transparent',
            color: 'tn.fg',
            _hover: { bg: 'tn.bg', borderColor: 'tn.comment' },
            _focus: { bg: 'tn.bg', borderColor: 'tn.blue' },
            _placeholder: { color: 'tn.comment' },
          },
        },
      },
    },
    Textarea: {
      defaultProps: { variant: 'filled' },
      variants: {
        filled: {
          bg: 'tn.bg',
          border: '1px solid',
          borderColor: 'tn.fgGutter',
          color: 'tn.fg',
          _hover: { bg: 'tn.bg', borderColor: 'tn.comment' },
          _focus: { bg: 'tn.bg', borderColor: 'tn.blue' },
          _placeholder: { color: 'tn.comment' },
        },
      },
    },
    Tag: {
      variants: {
        solid: (props) => ({
          container: {
            bg: props.colorScheme === 'red' ? 'tn.red' : 'tn.purple',
            color: 'tn.bgDark',
          },
        }),
      },
    },
    Heading: {
      baseStyle: { color: 'tn.fg', letterSpacing: '-0.01em' },
    },
    FormLabel: {
      baseStyle: { color: 'tn.fgDark', fontSize: 'sm', textTransform: 'uppercase', letterSpacing: '0.05em' },
    },
    Divider: {
      baseStyle: { borderColor: 'tn.fgGutter' },
    },
    Switch: {
      baseStyle: {
        track: { _checked: { bg: 'tn.blue' } },
      },
    },
    Tooltip: {
      baseStyle: {
        bg: 'tn.bgHighlight',
        color: 'tn.fg',
        borderRadius: 'md',
      },
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
