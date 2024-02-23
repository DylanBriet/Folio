document.addEventListener('DOMContentLoaded', function() {
  var sections = document.querySelectorAll('.hero-section, .about-section, .portfolio-section, .parcours-section, .contact-section');
  var menuButton = document.querySelector('.burger-menu-button');
  var closeButton = document.querySelector('.close-button');
  var menu = document.getElementById('sidebar');
  var currentIndex = 0; 
  var isMenuOpen = false; 

  function adjustNavDisplay() {

    if (currentIndex === 0) {
        if (isMenuOpen) {
            menu.classList.add('active');
        } else {
            menu.classList.remove('active');
        }
    }

    else {
        if (window.innerWidth > 680) {
            menu.classList.add('active');
        } else if (isMenuOpen) {
            menu.classList.add('active');
        } else {
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
    if (i === index) {
      section.style.top = '0'; 
      section.classList.add('active-section'); 
    } else {
      section.style.top = '100vh';
      section.classList.remove('active-section'); 
    }
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
    isMenuOpen = !isMenuOpen;
    adjustNavDisplay();
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
    var visibleItemsCount = 0;

    items.forEach(function(item) {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'flex';
            visibleItemsCount++; 
        } else {
            item.style.display = 'none';
        }
    });

    var newWidth = '100%';
    if (visibleItemsCount > 1) {
        newWidth = `${Math.min(100 / Math.ceil(visibleItemsCount / 2), 100)}%`;
    }

    items.forEach(function(item) {
        if (item.style.display !== 'none') {
            item.style.width = newWidth;
        }
    });

    document.querySelectorAll('.category-btn').forEach(function(button) {
      button.addEventListener('click', function(event) {
          event.stopPropagation(); 
          var category = this.getAttribute('data-category');
          filterProjects(category);
      });
  });
  }

  document.querySelectorAll('.category-btn').forEach(function(button) {
    button.addEventListener('click', function() {
      var category = this.getAttribute('data-category');
      filterProjects(category);
    });
  });

  document.addEventListener('click', function(event) {
    var clickInsideMenu = menu.contains(event.target) || menuButton.contains(event.target);
    
    if (!clickInsideMenu && isMenuOpen && window.innerWidth <= 680) {
        toggleMenu();
        event.stopImmediatePropagation();
    }
}, true);

  adjustNavDisplay();
  filterProjects('all');
  handleResize();
  window.addEventListener('resize', adjustNavDisplay);
 
});
