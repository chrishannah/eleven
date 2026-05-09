export const tokyoNightStorm = {
  bg: '#1a1b26',
  bgDark: '#16161e',
  bgHighlight: '#292e42',
  fg: '#c0caf5',
  fgDark: '#a9b1d6',
  fgGutter: '#3b4261',
  comment: '#565f89',
  cyan: '#7dcfff',
  blue: '#7aa2f7',
  purple: '#bb9af7',
  green: '#9ece6a',
  yellow: '#e0af68',
  orange: '#ff9e64',
  red: '#f7768e',
  selection: '#33467c',
};

export const tokyoNightDay = {
  bg: '#e1e2e7',
  bgDark: '#d5d6db',
  bgHighlight: '#c4c8da',
  fg: '#3760bf',
  fgDark: '#6172b0',
  fgGutter: '#a8aecb',
  comment: '#848cb5',
  cyan: '#007197',
  blue: '#2e7de9',
  purple: '#9854f1',
  green: '#587539',
  yellow: '#8c6c3e',
  orange: '#b15c00',
  red: '#f52a65',
  selection: '#b6b7c4',
};

export const palette = (mode) => (mode === 'light' ? tokyoNightDay : tokyoNightStorm);
