/*Navbar*/
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');
  
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      overlay.classList.toggle('active');
  
      // Update aria-expanded for accessibility
      const expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  
    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
  

  // For course cards: add 'visible' class to trigger fade-in animation when scrolled into view
document.addEventListener('DOMContentLoaded', () => {
  const courseCards = document.querySelectorAll('.course-card');

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.9;
    courseCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
});


// FOR ACHIEVER CARDS SCROLL FADE-IN
document.addEventListener("DOMContentLoaded", () => {
  const achievers = document.querySelectorAll(".achiever-card");

  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  achievers.forEach(card => {
    observer.observe(card);
  });
});


// For STATS BAR
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");
  let triggered = false;
  const duration = 2000; // Total animation time in milliseconds
  const frameRate = 30; // Update interval in ms (lower = smoother)

  const observer = new IntersectionObserver(entries => {
    if (triggered) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggered = true;

        counters.forEach(counter => {
          const target = +counter.getAttribute("data-target");
          const steps = duration / frameRate;
          const increment = target / steps;
          let count = 0;

          const updateCount = () => {
            count += increment;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, frameRate);
            } else {
              counter.innerText = target;
            }
          };

          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

/* Info Bar */
document.addEventListener('DOMContentLoaded', () => {
  const fadeUpElements = document.querySelectorAll('.fade-up');

  function checkFadeUp() {
    const triggerBottom = window.innerHeight * 0.9; // Trigger when element is 90% in viewport from top

    fadeUpElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkFadeUp);
  checkFadeUp(); // Check once on load
});

/* Enquiry Form Submission to WhatsApp */
const enquiryForm = document.getElementById('enquiryForm');

enquiryForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get values from the form
  const name = enquiryForm.name.value.trim();
  const phone = enquiryForm.phone.value.trim();
  const message = enquiryForm.message.value.trim();
  const preferredBatch = enquiryForm.preferredBatch.value;

  // Gather selected courses into an array
  const courses = [];
  enquiryForm.querySelectorAll('input[name="course"]:checked').forEach((checkbox) => {
    courses.push(checkbox.value);
  });

  // Validate required fields
  if (!name || !phone || courses.length === 0 || !preferredBatch) {
    alert('Please fill all required fields, select at least one course, and choose a preferred batch.');
    return;
  }

  // Format message for WhatsApp
  let whatsappMessage = `Hello, I am *${name}*.\nPhone: ${phone}\nInterested in courses: ${courses.join(', ')}`;
  whatsappMessage += `\nPreferred batch: ${preferredBatch}`;
  if (message) {
    whatsappMessage += `\nMessage: ${message}`;
  }

  // Encode and send to WhatsApp
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappURL = `https://wa.me/918973120153?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank'); // Open WhatsApp in new tab
});




/**  Gallery Grid  **/
const galleryImages = document.querySelectorAll(".gallery-image");
let currentIndex = 0;
if (galleryImages.length > 0) {
  function showNextImage() {
    galleryImages.forEach((img) => img.classList.remove("active"));
    galleryImages[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % galleryImages.length;
  }
  showNextImage();
  setInterval(showNextImage, 3000);
}
