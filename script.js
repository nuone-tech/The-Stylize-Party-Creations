// Initialize AOS
// 1. Initialize AOS immediately (fixes the loading delay)
document.addEventListener("DOMContentLoaded", function () {
  // Init AOS with refreshed view
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50, // Trigger animations a bit earlier
    delay: 0,
  });
});

// Variables
const navbar = document.getElementById("navbar");
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const partnerDropdown = document.getElementById("partnerDropdown");

// Mobile Menu Logic
function toggleMobileMenu() {
  // Toggle classes
  mobileMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");

  // Toggle Hamburger Animation
  mobileToggle.classList.toggle("active");

  // Prevent body scroll
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

mobileToggle.addEventListener("click", toggleMobileMenu);
mobileOverlay.addEventListener("click", toggleMobileMenu);

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) toggleMobileMenu();
  });
});

// Partner Hotels Dropdown Logic (Desktop)
partnerDropdown
  .querySelector(".dropdown-trigger")
  .addEventListener("click", (e) => {
    e.stopPropagation();
    partnerDropdown.classList.toggle("active");
  });

document.addEventListener("click", (e) => {
  if (!partnerDropdown.contains(e.target)) {
    partnerDropdown.classList.remove("active");
  }
});

// Mobile Partner Hotels Accordion Logic
const mobilePartnerBtn = document.getElementById("mobilePartnerBtn");
const mobilePartnerContent = document.getElementById("mobilePartnerContent");
const mobilePartnerArrow = document.getElementById("mobilePartnerArrow");

mobilePartnerBtn.addEventListener("click", () => {
  mobilePartnerContent.classList.toggle("active");
  mobilePartnerArrow.classList.toggle("rotate-180");
});

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    navbar.classList.add("nav-blur", "shadow-lg");
  } else {
    navbar.classList.remove("nav-blur", "shadow-lg");
  }
});

//     <!-- JS for Lightbox (Ensure this is in your script tag) -->
function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

//  Slick Slider JS Initialization
$(document).ready(function () {
  $("#testimonial-slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    // Using Font Awesome classes for icons
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile
          dots: true,
        },
      },
    ],
  });
});

//  Simple Form JS Logic
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert(
    "Thank you for your request! We will contact you shortly to confirm your booking.",
  );
  this.reset();
});

// Set minimum dates for check-in/out
// const today = new Date().toISOString().split("T")[0];
// document.getElementById("checkin").setAttribute("min", today);
// document.getElementById("checkout").setAttribute("min", today);

// document.getElementById("checkin").addEventListener("change", function () {
//   document.getElementById("checkout").setAttribute("min", this.value);
// });

// ---------------------------------------------------
// 1. INITIALIZATION
// ---------------------------------------------------

// Set minimum dates for check-in/out
const today = new Date().toISOString().split("T")[0];
const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");

checkinInput.setAttribute("min", today);
checkoutInput.setAttribute("min", today);

// Update checkout min date when checkin changes
checkinInput.addEventListener("change", function () {
  checkoutInput.setAttribute("min", this.value);
  // Optional: Auto-set checkout to next day
  // if (!checkoutInput.value) checkoutInput.value = this.value;
});

// ---------------------------------------------------
// 2. FORM SUBMISSION HANDLER
// ---------------------------------------------------

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop standard page reload

  // Gather Data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    checkin: checkinInput.value,
    checkout: checkoutInput.value,
    room: document.getElementById("room").options[
      document.getElementById("room").selectedIndex
    ].text,
    guests: document.getElementById("guests").value,
    message: document.getElementById("message").value,
  };

  // Basic Validation
  if (
    formData.checkin &&
    formData.checkout &&
    new Date(formData.checkout) <= new Date(formData.checkin)
  ) {
    alert("Check-out date must be after Check-in date.");
    return;
  }

  // ---------------------------------------------------
  // OPTION A: WHATSAPP REDIRECT (Active by default)
  // ---------------------------------------------------

  // Construct the WhatsApp Message
  let text = `*New Booking Request* 🏨%0A%0A`;
  text += `*Name:* ${formData.name}%0A`;
  text += `*Email:* ${formData.email}%0A`;
  text += `*Room:* ${formData.room}%0A`;
  text += `*Check-in:* ${formData.checkin}%0A`;
  text += `*Check-out:* ${formData.checkout}%0A`;
  text += `*Guests:* ${formData.guests}%0A`;
  if (formData.message) {
    text += `*Special Requests:* ${formData.message}%0A`;
  }

  // Your WhatsApp Number (Sri Lanka format without + or 0)
  const whatsappNumber = "94781154482";

  // Open WhatsApp
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;
  window.open(whatsappURL, "_blank");

  // Show success message
  alert(
    "Thank you! We are redirecting you to WhatsApp to complete your booking request.",
  );
  bookingForm.reset();

  /* ---------------------------------------------------
        // OPTION B: EMAILJS (Uncomment to use instead of WhatsApp)
        // You must include the EmailJS SDK in your <head> and get IDs from emailjs.com
        // ---------------------------------------------------
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: formData.name,
            from_email: formData.email,
            room_type: formData.room,
            check_in: formData.checkin,
            check_out: formData.checkout,
            guests: formData.guests,
            message: formData.message
        })
        .then(function() {
            alert('Booking request sent successfully! We will contact you shortly.');
            bookingForm.reset();
        }, function(error) {
            alert('Failed to send request. Please try again or call us directly.');
            console.error('EmailJS Error:', error);
        });
        */
});
