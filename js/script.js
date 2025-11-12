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

  // 🔹 Contact Form Modal Handling 🔹
  const form = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal")
    ? new bootstrap.Modal(document.getElementById("successModal"))
    : null;

  if (form && successModal) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullname = form.querySelector("#fullname").value.trim();
      const email = form.querySelector("#email").value.trim();
      const subject = form.querySelector("#subject").value.trim();
      const message = form.querySelector("#message").value.trim();

      if (!fullname || !email || !subject || !message) {
        alert("Please, fill all the required fields.");
        return;
      }

      successModal.show();
      form.reset();
    });
  }
});

let currentFormData = {
    fullname: '',
    email: '',
    phone: '', 
    subject: '',
    message: ''
};

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Запазваме стойностите ВЕДНАГА когато потребителят пише
        contactForm.addEventListener('input', function(e) {
            if (e.target.name === 'fullname') currentFormData.fullname = e.target.value;
            if (e.target.name === 'email') currentFormData.email = e.target.value;
            if (e.target.name === 'phone') currentFormData.phone = e.target.value;
            if (e.target.name === 'subject') currentFormData.subject = e.target.value;
            if (e.target.name === 'message') currentFormData.message = e.target.value;
            
            console.log("Input captured:", e.target.name, "=", e.target.value);
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log("=== FINAL ATTEMPT ===");
            console.log("Current form data:", currentFormData);
            console.log("Direct element values:");
            console.log("fullname:", document.getElementById('fullname').value);
            console.log("email:", document.getElementById('email').value);
            console.log("phone:", document.getElementById('phone').value);
            console.log("subject:", document.getElementById('subject').value);
            console.log("message:", document.getElementById('message').value);

            // Използвайте запазените стойности
            const dataToSend = {
                fullname: currentFormData.fullname || document.getElementById('fullname').value || 'MISSING',
                email: currentFormData.email || document.getElementById('email').value || 'MISSING',
                phone: currentFormData.phone || document.getElementById('phone').value || 'MISSING',
                subject: currentFormData.subject || document.getElementById('subject').value || 'MISSING',
                message: currentFormData.message || document.getElementById('message').value || 'MISSING'
            };
            
            console.log("Data to send:", dataToSend);

            const submitBtn = this.querySelector('button[type="submit"]');
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
                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();
                    contactForm.reset();
                    // Нулиране на запазените данни
                    currentFormData = {fullname: '', email: '', phone: '', subject: '', message: ''};
                } else {
                    alert('Error sending message. Please try again.');
                }
            })
            .catch(error => {
                alert('Error sending message. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
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
