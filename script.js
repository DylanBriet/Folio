document.addEventListener('DOMContentLoaded', function() {
  let currentSectionIndex = 0;
  const sections = document.querySelectorAll('div[id]');
  let isThrottled = false;
  const burgerMenuButton = document.querySelector('.burger-menu-button');
  const menu = document.querySelector('.menu');
  const closeButton = document.querySelector('.close-button');
  let isMenuOpen = false;

  function manageClicksOutsideMenu(e) {
    if (isMenuOpen && !menu.contains(e.target) && e.target !== burgerMenuButton) {
      menu.classList.remove('open');
      isMenuOpen = false;
      e.stopPropagation();
    }
  }

  burgerMenuButton.addEventListener('click', (e) => {
      if (isMenuOpen) {
          menu.classList.remove('open');
          isMenuOpen = false;
        } else {
          menu.classList.add('open');
          isMenuOpen = true;
        }
        e.stopPropagation(); 
      });

  closeButton.addEventListener('click', () => {
    menu.classList.remove('open');
    isMenuOpen = false;
  });

  document.addEventListener('click', manageClicksOutsideMenu);

  window.addEventListener('click', function(e) {
    if (!e.target.closest('a, button, .burger-menu-button, .close-button, .category-btn') && !isMenuOpen) {
      scrollToSection(currentSectionIndex + 1);
    }
  });

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isThrottled) {
      return;
    }
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, 600);

    const targetSection = sections[index];
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
    currentSectionIndex = index;

    const textElements = targetSection.querySelectorAll('h1, h2, p, div');
    textElements.forEach(el => {
      el.classList.add('animated-text');
    });

    sections.forEach((section, idx) => {
      if (idx !== index) {
        section.querySelectorAll('h1, h2, p, div').forEach(el => {
          el.classList.remove('animated-text');
        });
      }
    });

    if (isMenuOpen) {
      menu.classList.remove('open');
      isMenuOpen = false;
    }
  }

  window.addEventListener('wheel', function(e) {
    if (!isMenuOpen) { 
      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToSection(currentSectionIndex + direction);
    }
  });

  let startY = 0;
  document.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
  }, false);

  document.addEventListener('touchend', function(e) {
    let endY = e.changedTouches[0].clientY;
    let direction = startY - endY > 0 ? 1 : -1;
    if (Math.abs(startY - endY) > 50 && !isMenuOpen) {
      scrollToSection(currentSectionIndex + direction);
    }
  }, false);
  window.addEventListener('scroll', function() {
      if (window.pageYOffset === 0) {
        currentSectionIndex = 0;
      }
      
    });
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

    document.querySelectorAll('.category-btn').forEach(function(button) {
      button.addEventListener('click', function() {
          document.querySelectorAll('.category-btn').forEach(function(btn) {
              btn.classList.remove('active');
          });
          this.classList.add('active');
  
          var category = this.getAttribute('data-category');
          filterProjects(category);
      });
  });
    filterProjects('all');


    const navigationLinks = document.querySelectorAll('.navigation a');
    navigationLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId);
        const index = Array.from(sections).indexOf(targetSection); 
  
        scrollToSection(index);

        if (isMenuOpen) {
          menu.classList.remove('open');
          isMenuOpen = false;
        }
      });
    });

    function restartAnimation() {
      const bubbles = document.querySelectorAll('.bubble1, .bubble2, .bubble3, .bubble4');
      bubbles.forEach(bubble => {
        bubble.style.animation = 'none';
        bubble.offsetHeight; 
        bubble.style.animation = null; 
      });
    }
    
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          restartAnimation();
        }
      });
    }, { threshold: 0.1 });
    
    let homeSection = document.querySelector('#home');
    observer.observe(homeSection);
});
