document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('light-icon');
  const darkIcon = document.getElementById('dark-icon');
  const root = document.documentElement;

  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';

  root.setAttribute('data-theme', DARK_THEME);

  toggleButton.addEventListener('click', toggleTheme);

  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    root.setAttribute('data-theme', newTheme);

    lightIcon.style.display =
      newTheme === LIGHT_THEME ? 'inline-block' : 'none';
    darkIcon.style.display = newTheme === DARK_THEME ? 'inline-block' : 'none';
  }
});
