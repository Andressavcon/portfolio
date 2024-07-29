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
          message +
          '\nOBS: esta funcionalidade ainda será implementada'
      );
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  const username = 'Andressavcon';
  const reposContainer = document.getElementById('projects-list');
  const prevPageButton = document.getElementById('prev-page');
  const nextPageButton = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');
  const favoritesList = document.getElementById('favorites-list');

  let currentPage = 1;
  const reposPerPage = 6;
  let allRepos = [];
  let favorites = [];

  loadFavorites();

  fetchRepos();

  function fetchRepos() {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((repos) => {
        allRepos = repos.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        displayRepos();
        updatePaginationControls();
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  function displayRepos() {
    reposContainer.innerHTML = '';

    const start = (currentPage - 1) * reposPerPage;
    const end = start + reposPerPage;
    const paginatedRepos = allRepos.slice(start, end);

    paginatedRepos.forEach((repo) => {
      const repoElement = document.createElement('div');
      repoElement.className = 'card repo';
      repoElement.innerHTML = `
        <button class="favorite-button" data-repo-id="${
          repo.id
        }"><i class="fa-regular fa-heart"></i></button>
        <h5><a href="${repo.html_url}" target="_blank">${repo.name}</a></h5>
        <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
      `;

      reposContainer.appendChild(repoElement);
    });

    document.querySelectorAll('.favorite-button').forEach((button) => {
      button.addEventListener('click', addToFavorites);
    });
  }

  function updatePaginationControls() {
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * reposPerPage >= allRepos.length;
    pageInfo.textContent = `Page ${currentPage}`;
  }

  function addToFavorites(event) {
    const repoId = event.currentTarget.getAttribute('data-repo-id');
    const repo = allRepos.find((r) => r.id === parseInt(repoId));

    if (!favorites.some((fav) => fav.id === repo.id)) {
      favorites.push(repo);
      saveFavorites();
      updateFavoritesList();
    }
  }

  function removeFromFavorites(event) {
    const repoId = event.currentTarget.getAttribute('data-repo-id');
    favorites = favorites.filter((repo) => repo.id !== parseInt(repoId));
    saveFavorites();
    updateFavoritesList();
  }

  function updateFavoritesList() {
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
      const noFavoritesMessage = document.createElement('p');
      noFavoritesMessage.textContent = 'Você ainda não tem favoritos.';
      favoritesList.appendChild(noFavoritesMessage);
    } else {
      const favoritesToShow = favorites.slice(0, 6);

      favoritesToShow.forEach((repo) => {
        const repoElement = document.createElement('div');
        repoElement.className = 'card repo';
        repoElement.innerHTML = `
          <button class="remove-favorite-button" data-repo-id="${
            repo.id
          }"><i class="fa-solid fa-heart"></i></button>
          <h5><a href="${repo.html_url}" target="_blank">${repo.name}</a></h5>
          <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
        `;

        favoritesList.appendChild(repoElement);
      });

      document.querySelectorAll('.remove-favorite-button').forEach((button) => {
        button.addEventListener('click', removeFromFavorites);
      });
    }
  }

  function loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      favorites = JSON.parse(savedFavorites);
      updateFavoritesList();
    }
  }

  function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayRepos();
      updatePaginationControls();
    }
  });

  nextPageButton.addEventListener('click', () => {
    if (currentPage * reposPerPage < allRepos.length) {
      currentPage++;
      displayRepos();
      updatePaginationControls();
    }
  });
});
