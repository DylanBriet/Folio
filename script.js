document.addEventListener('DOMContentLoaded', function() {
  var sections = document.querySelectorAll('.hero-section, .about-section, .portfolio-section, .parcours-section, .contact-section');
  var menuButton = document.querySelector('.burger-menu-button');
  var closeButton = document.querySelector('.close-button');
  var menu = document.getElementById('sidebar');
  var currentIndex = 0; // Commence par la hero-section
  var isMenuOpen = false; // Suivi de l'état du menu

  function adjustNavDisplay() {
    // Sur la page d'accueil, affiche la barre de navigation seulement si le menu burger a été activé
    if (currentIndex === 0) {
        if (isMenuOpen) {
            menu.classList.add('active');
        } else {
            menu.classList.remove('active');
        }
    }
    // Pour les autres pages
    else {
        if (window.innerWidth > 680) {
            // Affiche la barre de navigation par défaut si la largeur est > 680px
            menu.classList.add('active');
        } else if (isMenuOpen) {
            // Affiche la barre de navigation si le menu burger a été activé et la largeur est ≤ 680px
            menu.classList.add('active');
        } else {
            // Cache la barre de navigation dans tous les autres cas
            menu.classList.remove('active');
        }
    }
}

function toggleMenu() {
  menu.classList.toggle('active');
  isMenuOpen = menu.classList.contains('active');
}

  function transitionToSection(index) {
    sections.forEach((section, i) => {
      section.style.top = (i === index) ? '0' : '100vh';
    });
    currentIndex = index;
    adjustNavDisplay();
  }

  sections.forEach((section, index) => {
    section.addEventListener('click', () => {
      if (currentIndex < sections.length - 1) {
        transitionToSection(currentIndex + 1);
      }
    });
  });

  document.querySelectorAll('.navigation a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      transitionToSection(index);
    });
  });

  window.addEventListener('wheel', function(event) {
    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
      transitionToSection(currentIndex + 1);
    } else if (event.deltaY < 0 && currentIndex > 0) {
      transitionToSection(currentIndex - 1);
    }
  });

  menuButton.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen; // Bascule l'état ouvert/fermé du menu
    adjustNavDisplay(); // Met à jour l'affichage du menu basé sur le nouvel état
});
  closeButton.addEventListener('click', toggleMenu);

  window.addEventListener('resize', handleResize);

  function handleResize() {
    adjustNavDisplay();
    var isHomePage = currentIndex === 0;
    if (window.innerWidth > 680 && isHomePage) {
      menu.classList.remove('active');
      isMenuOpen = false;
    } else if (window.innerWidth <= 680 || isMenuOpen) {
      menu.classList.add('active');
    } else {
      menu.classList.remove('active');
    }
  }

  function filterProjects(category) {
    var items = document.querySelectorAll('.project-item');
    var visibleItemsCount = 0; // Compteur pour les éléments visibles

    items.forEach(function(item) {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'flex';
            visibleItemsCount++; // Incrémente pour chaque élément visible
        } else {
            item.style.display = 'none';
        }
    });

    // Ajuste la largeur des éléments en fonction du nombre d'éléments visibles
    var newWidth = '100%'; // Valeur par défaut pour 1 élément
    if (visibleItemsCount > 1) {
        // Calcule la largeur en fonction du nombre d'éléments, par exemple :
        newWidth = `${Math.min(100 / Math.ceil(visibleItemsCount / 2), 100)}%`;
    }

    // Applique la nouvelle largeur à tous les éléments visibles
    items.forEach(function(item) {
        if (item.style.display !== 'none') {
            item.style.width = newWidth;
        }
    });

    document.querySelectorAll('.category-btn').forEach(function(button) {
      button.addEventListener('click', function(event) {
          event.stopPropagation(); // Empêche l'événement de se propager plus loin
          var category = this.getAttribute('data-category');
          filterProjects(category);
      });
  });
  }

  // Attache des écouteurs d'événements aux boutons de catégorie après le chargement du DOM
  document.querySelectorAll('.category-btn').forEach(function(button) {
    button.addEventListener('click', function() {
      var category = this.getAttribute('data-category');
      filterProjects(category);
    });
  });

  document.addEventListener('click', function(event) {
    var clickInsideMenu = menu.contains(event.target) || menuButton.contains(event.target);
    
    if (!clickInsideMenu && isMenuOpen && window.innerWidth <= 680) {
        toggleMenu(); // Ferme la barre de navigation

        // Empêche le clic de déclencher d'autres actions si la barre de navigation est ouverte
        event.stopImmediatePropagation();
    }
}, true);

  // Appel initial pour ajuster l'affichage et filtrer les projets à 'all'
  adjustNavDisplay();
  filterProjects('all');
  handleResize();
  window.addEventListener('resize', adjustNavDisplay);
 
});
