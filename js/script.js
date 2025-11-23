// Smooth scroll and active state for header buttons
const headerButtons = document.querySelectorAll('.btn-header');

headerButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove and add active state
    headerButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    // Smooth scroll to section
    const section = document.querySelector(button.dataset.target);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active section on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; // adjust offset for header
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  headerButtons.forEach(button => {
    button.classList.remove('active');
    if (button.dataset.target === `#${current}`) {
      button.classList.add('active');
    }
  });
});

let countersAnimated = false; // flag to prevent multiple runs

function animateCounters() {
  const counters = document.querySelectorAll('#features .counter'); // only in features
  const speed = 80; // lower = faster

  counters.forEach(counter => {
    counter.innerText = '0'; // reset to 0 when starting
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

const featuresSection = document.querySelector('#features');

if (featuresSection) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true; // mark as done
        animateCounters();
        observer.disconnect(); // optional: disconnect to save resources
      }
    });
  }, { threshold: 0.5 });

  observer.observe(featuresSection);
}

// Testimonial carousel (Bootstrap)
const testimonialCarousel = document.querySelector('#testimonialCarousel');
if (testimonialCarousel) {
  const carousel = new bootstrap.Carousel(testimonialCarousel, {
    interval: 3000,
    ride: 'carousel',
    pause: 'hover',
    wrap: true
  });
}

// 🔹 NAVBAR TOGGLER WITH ANIMATION 🔹
document.addEventListener("DOMContentLoaded", () => {
  const toggler = document.getElementById('navbar-toggler');
  const menu = document.querySelector('.navbar-menu');
  const icon = toggler ? toggler.querySelector('span') : null;

  if (toggler && menu && icon) {
    toggler.addEventListener('click', () => {
      const isOpen = toggler.classList.toggle('active');
      menu.classList.toggle('show');
      icon.classList.toggle('bi-list', !isOpen);
      icon.classList.toggle('bi-x', isOpen);
    });
  }
});

  document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const successModalEl = document.getElementById('successModal');
  const successModal = successModalEl ? new bootstrap.Modal(successModalEl) : null;

  let currentFormData = {
    fullname: '',
    email: '',
    phone: '', 
    subject: '',
    message: ''
  };

  if (!contactForm || !successModal) return;

  // Capture input live
  contactForm.addEventListener('input', function(e) {
    const name = e.target.name;
    if (name in currentFormData) currentFormData[name] = e.target.value;
  });

  // Handle form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const dataToSend = {
      fullname: currentFormData.fullname.trim() || document.getElementById('fullname').value.trim(),
      email: currentFormData.email.trim() || document.getElementById('email').value.trim(),
      phone: currentFormData.phone.trim() || document.getElementById('phone').value.trim(),
      subject: currentFormData.subject.trim() || document.getElementById('subject').value.trim(),
      message: currentFormData.message.trim() || document.getElementById('message').value.trim()
    };

    // Check required fields
    if (!dataToSend.fullname || !dataToSend.email || !dataToSend.subject || !dataToSend.message) {
      alert('❌ Please fill all required fields!');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwN_qGwxDUANC-TV0ieiNMaTn5dGHiE3BEFO1lyg0hYf_ibTi8MHZBmPSZECB4bekty/exec';

    fetch(scriptURL, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.result === 'success') {
        // Show modal once
        successModal.show();

        // Reset form and currentFormData
        contactForm.reset();
        currentFormData = {fullname: '', email: '', phone: '', subject: '', message: ''};
      } else {
        alert('Error sending message. Please try again.');
      }
    })
    .catch(() => alert('Error sending message. Please try again.'))
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });

  // Optional: ensure modal can be closed with OK button
  const closeBtn = successModalEl.querySelector('#successModalClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => successModal.hide());
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 80; // lower = faster

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount(); // Start the counter animation
  });
});

  // Trigger only when visible on screen
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // run only once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('#stats'));
