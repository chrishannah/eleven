(() => {
  const preview = document.querySelector('#theme-preview');
  const caption = document.querySelector('#theme-caption');
  const buttons = document.querySelectorAll('.theme-picker button');
  const descriptions = {
    light: 'Light — white space, dark type.',
    dark: 'Dark — soft charcoal, bright words.',
    sepia: 'Sepia — warm parchment, brown ink.',
    black: 'Black — pure black, clear contrast.',
    paper: 'Paper — clean ivory, charcoal ink.',
    red: 'Red — a bold canvas, warm white type.'
  };
  if (!preview || !caption) return;
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      if (!Object.hasOwn(descriptions, theme)) return;
      preview.dataset.theme = theme;
      preview.setAttribute('aria-label', `Example text shot in the ${button.textContent.trim()} theme`);
      caption.textContent = descriptions[theme];
      buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    });
  });
})();
