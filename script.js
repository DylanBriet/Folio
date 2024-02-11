document.addEventListener('DOMContentLoaded', function() {
  var sections = document.querySelectorAll('.hero-section, .about-section, .portfolio-section, .parcours-section, .contact-section');
  var menuButton = document.querySelector('.burger-menu-button');
  var closeButton = document.querySelector('.close-button');
  var menu = document.getElementById('sidebar');
  var currentIndex = 0; // Commence par la hero-section
  var isMenuOpen = false; // Suivi de l'état du menu

  function adjustNavDisplay(index) {
    // Ne modifiez la classe 'active' que si le menu a été explicitement ouvert
    if (window.innerWidth > 680 || isMenuOpen) {
      menu.classList.add('active');
    } else {
      menu.classList.remove('active');
    }
  }

  function toggleMenu() {
    menu.classList.toggle('active');
    isMenuOpen = menu.classList.contains('active'); // Met à jour l'état basé sur la classe 'active'
    adjustNavDisplay(currentIndex); // Ajuste l'affichage en fonction de l'état du menu et de la section actuelle
  }

  // Initial ajustement pour la barre de navigation
  adjustNavDisplay(currentIndex);

  function transitionToSection(index) {
    // Cache toutes les sections sauf celle ciblée
    sections.forEach((section, i) => {
      section.style.top = (i === index) ? '0' : '100vh';
    });

    currentIndex = index; // Met à jour l'index actuel
    adjustNavDisplay(index); // Ajuste l'affichage en fonction de l'état du menu et de la section actuelle
  }

  // Gestion des clics sur les sections pour naviguer
  sections.forEach((section, index) => {
    section.addEventListener('click', () => {
      if (currentIndex < sections.length - 1) {
        transitionToSection(currentIndex + 1);
      }
    });
  });

  // Gestion des clics sur le menu pour naviguer
  document.querySelectorAll('.navigation a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      transitionToSection(index);
    });
  });

  // Gérer le scroll pour naviguer entre les sections
  window.addEventListener('wheel', function(event) {
    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
      transitionToSection(currentIndex + 1);
    } else if (event.deltaY < 0 && currentIndex > 0) {
      transitionToSection(currentIndex - 1);
    }
  });

  // Écouteurs d'événements pour le bouton du menu burger et le bouton de fermeture
  menuButton.addEventListener('click', toggleMenu);
  closeButton.addEventListener('click', toggleMenu);

  // Gestion du redimensionnement de la fenêtre pour ajuster l'affichage du menu
  function handleResize() {
    // Détermine si l'utilisateur est sur la page d'accueil
    var isHomePage = currentIndex === 0;
    // Force la barre de navigation à se cacher sur la page d'accueil pour les fenêtres plus larges que 680px
    if (window.innerWidth > 680 && isHomePage) {
      menu.classList.remove('active');
      isMenuOpen = false; // Met à jour l'état du menu comme étant fermé
    } else if (window.innerWidth > 680) {
      // Sur les autres pages, le menu peut rester visible si cela correspond à l'état souhaité
      menu.classList.add('active');
    } else {
      // Sur les petits écrans, respecte l'état d'ouverture du menu
      if (isMenuOpen) {
        menu.classList.add('active');
      } else {
        menu.classList.remove('active');
      }
    }
  }
  function transitionToSection(index) {
    // Cache toutes les sections sauf celle ciblée
    sections.forEach((section, i) => {
      section.style.top = (i === index) ? '0' : '100vh';
    });
  
    currentIndex = index; // Met à jour l'index actuel
  
    // Vérifie si l'utilisateur se trouve sur la page d'accueil et ajuste l'affichage de la barre de navigation
    if (window.innerWidth > 680 && currentIndex === 0) {
      menu.classList.remove('active');
      isMenuOpen = false; // Assure que le menu est considéré comme fermé
    } else {
      adjustNavDisplay(index); // Ajuste l'affichage en fonction de l'état du menu et de la section actuelle
    }
  }

  function filterProjects(category, event) {
    var items = document.querySelectorAll('.project-item');
    for (var i = 0; i < items.length; i++) {
      if (category === 'all' || items[i].classList.contains(category)) {
        items[i].style.display = 'block';
      } else {
        items[i].style.display = 'none';
      }
    }
    // Update buttons active class
    var buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(function(btn) {
      if(btn.getAttribute('onclick').includes(category)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  filterProjects('all');

  window.addEventListener('resize', handleResize);
  handleResize(); // Appel initial pour définir l'état correct au chargement de la page

  
});
