document.getElementById("currentYear").textContent = new Date().getFullYear();

function toggleMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navbar");
  
  hamburger.classList.toggle("active");
  
  // FadeToggle logika
  if (navLinks.style.opacity === '0' || navLinks.style.opacity === '') {
    navLinks.style.display = 'block';
    setTimeout(() => {
      navLinks.style.opacity = '1';
    }, 10);
  } else {
    navLinks.style.opacity = '0';
    setTimeout(() => {
      navLinks.style.display = 'none';
    }, 300); // Időzítés megegyezik a CSS transition idővel
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Slider funkcionalitás
  const container = document.querySelector(".container");
  const cards = document.querySelectorAll(".card");

  // Csak mobilnézetben jelenjen meg
  if (window.innerWidth <= 768 && cards.length > 0) {
    // Kezdeti állapot
    let currentIndex = 0;
    let isScrolling = false;

    window.addEventListener("load", () => {
      setTimeout(() => {
        scrollToCard(currentIndex);
      }, 100);
    });

    // Touch események kezelése
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    container.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
      },
      { passive: true }
    );

    function scrollToCard(index) {
      isScrolling = true;
     
    // Ellenőrizzük, hogy az index érvényes-e
    if (index < 0) {
        currentIndex = 0;
    } else if (index >= cards.length) {
        currentIndex = cards.length - 1;
    } else {
        currentIndex = index;
    }

      const card = cards[currentIndex];
      const containerWidth = container.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollPosition = card.offsetLeft - (containerWidth - cardWidth) / 2;

    // Scroll pozíció beállítása
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

    // Scroll befejezésének észlelése
      setTimeout(() => {
        isScrolling = false;
      }, 500);
    }
    // Resize esemény kezelése
    window.addEventListener("resize", function () {
      if (window.innerWidth <= 768) {
        // Újraszámoljuk a pozíciót átméretezéskor
        scrollToCard(currentIndex);
      }
    });

    function handleSwipe() {
      if (isScrolling) return;

      const threshold = 50; // Minimális swipe érzékeléshez
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance < 0 && currentIndex < cards.length - 1) {
          // Swipe left (next card)
          currentIndex++;
        } else if (swipeDistance > 0 && currentIndex > 0) {
          // Swipe right (previous card)
          currentIndex--;
        }
        scrollToCard(currentIndex); // Scroll to the updated card
      }
    }
  }
});

// Vissza a tetejére gomb

const backToTopBtn = document.getElementById('backToTop');
const scrollThreshold = 300; 

// Görgetés figyelése
window.addEventListener('scroll', () => {
  if (window.pageYOffset > scrollThreshold) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

// Kattintás kezelése
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Sima görgetés
  });
});

// Form submit esemény kezelése
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (event) {
      event.preventDefault(); 

      setTimeout(() => {
          successMessage.style.display = "block";

          form.reset();
      }, 500); 
  });
});


