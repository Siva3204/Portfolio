// Preloader Logic
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500); // Match CSS transition duration
  }
});

// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById("darkModeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const htmlElement = document.documentElement;

// Check for saved theme preference on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  htmlElement.classList.add("dark");
  sunIcon.classList.add("hidden");
  moonIcon.classList.remove("hidden");
} else {
  htmlElement.classList.remove("dark");
  sunIcon.classList.remove("hidden");
  moonIcon.classList.add("hidden");
}

darkModeToggle.addEventListener("click", () => {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }
});

// JavaScript for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start", // Scroll to the top of the section
      });
    }
  });
});

// Add 'active' class to navigation links based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const updateActiveNavLink = () => {
  let currentActiveSectionId = "";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    // Adjust offset for fixed header height
    const offset = 80; // Approximate header height
    if (rect.top <= offset && rect.bottom >= offset) {
      currentActiveSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.href.includes(currentActiveSectionId)) {
      link.classList.add("active");
    }
  });
};

// Listen for scroll events to update active navigation link
window.addEventListener("scroll", updateActiveNavLink);
// Also call it on load to set the initial active link
window.addEventListener("load", updateActiveNavLink);

// Trigger animations for elements as they scroll into view using Intersection Observer
const animatedElements = document.querySelectorAll(
  ".animate-fade-in, .animate-slide-up, .animate-scale-in"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove initial opacity/transform to allow animation to play
        entry.target.style.opacity = "";
        entry.target.style.transform = "";
        entry.target.classList.add("animation-triggered"); // Mark as animated
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  },
  { threshold: 0.1 }
); // Trigger when 10% of the element is visible

animatedElements.forEach((el) => {
  // Apply initial hidden state to all animated elements
  el.style.opacity = "0";
  if (el.classList.contains("animate-slide-up")) {
    el.style.transform = "translateY(20px)";
  } else if (el.classList.contains("animate-scale-in")) {
    el.style.transform = "scale(0.9)";
  }
  observer.observe(el);
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    // Show button after scrolling 300px
    backToTopBtn.classList.remove("hidden");
  } else {
    backToTopBtn.classList.add("hidden");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Simple form submission handler (client-side only)
function handleContactFormSubmit(event) {
  event.preventDefault(); // Prevent actual form submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const messageBox = document.getElementById("messageBox");

  // Basic validation
  if (!name || !email || !message) {
    messageBox.className = "msg-error";
    messageBox.textContent = "Please fill in all fields.";
    messageBox.classList.remove("hidden");
    return;
  }

  // Simulate API call or form submission success
  console.log("Form Submitted:", { name, email, message });

  messageBox.className = "msg-success";
  messageBox.textContent =
    "Thank you for your message! I will get back to you soon.";
  messageBox.classList.remove("hidden");

  // Clear the form
  event.target.reset();

  // Hide message after a few seconds
  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 5000);
}
