// Initialize AOS
AOS.init({ duration: 800, easing: "ease-out-cubic", once: true });

// Variables
const navbar = document.getElementById("navbar");
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

// Mobile Menu Logic
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  mobileToggle.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
}

if (mobileToggle) {
  mobileToggle.addEventListener("click", toggleMobileMenu);
  mobileOverlay.addEventListener("click", toggleMobileMenu);

  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) toggleMobileMenu();
    });
  });
}

// FIXED: Themes Dropdown Logic (Desktop) - Now targets 'themesDropdown'
const themesDropdown = document.getElementById("themesDropdown");

if (themesDropdown) {
  const trigger = themesDropdown.querySelector(".dropdown-trigger");
  
  trigger?.addEventListener("click", (e) => {
    e.stopPropagation();
    themesDropdown.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!themesDropdown.contains(e.target)) {
      themesDropdown.classList.remove("active");
    }
  });
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (navbar) {
    if (scrollY > 50) {
      navbar.classList.add("nav-blur", "shadow-lg");
    } else {
      navbar.classList.remove("nav-blur", "shadow-lg");
    }
  }
});

// Lightbox Functions
function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// FIXED: Slick Slider Initialization - Selector now matches HTML ID
 $(document).ready(function () {
  if ($("#testimonialSlider").length) { 
    $("#testimonialSlider").slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true } }
      ]
    });
  }
});

// Booking Form Handler (if exists)
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Form logic here...
  });
}

// Add animation on scroll for package cards
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -20px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".package-card, .highlight-card, .service-card, .policy-item").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});