document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('light-icon');
  const darkIcon = document.getElementById('dark-icon');
  const root = document.documentElement;
  const contactForm = document.getElementById('contact-form');

  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';

  root.setAttribute('data-theme', DARK_THEME);

  toggleButton.addEventListener('click', toggleTheme);
  contactForm.addEventListener('submit', submitForm);

  function toggleTheme() {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    root.setAttribute('data-theme', newTheme);

    lightIcon.style.display =
      newTheme === LIGHT_THEME ? 'inline-block' : 'none';
    darkIcon.style.display = newTheme === DARK_THEME ? 'inline-block' : 'none';
  }

  function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      alert(
        'Formulário enviado com sucesso!\n' +
          'Nome: ' +
          name +
          '\nEmail: ' +
          email +
          '\nMensagem: ' +
          message
      );
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
});
