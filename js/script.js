
// _____mobile navbar_____
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener("click", ()=> {
            nav.classList.toggle("show")
        })
    }
}
showMenu('nav_toggle','nav_menu');

// _____remove mobile menu_____
const navLink = document.querySelectorAll('.nav-link')

function linkAction () {
    const navMenu = document.getElementById('nav_menu')

    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// _____active scroll_____
const headerOffset = 70; 

navLink.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Remove active from all and add to clicked
    navLink.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Scroll with offset
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const elementPosition = targetSection.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Close mobile menu
    document.getElementById('nav_menu').classList.remove('show');
  });
});

// Swiper Navigation
var swiper = new Swiper(".works-content", {
    slidesPerView: 3,
    spaceBetween: 50,
    loop: false,
    autoplay: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
        delay: 4000,
        stopOnLastSlide: true,
        pauseOnMouseEnter: true,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
  });
/*

_____testimonials Carousel_____
*/
$('.testimonials-content').owlCarousel({
    loop: false,
    autoplay: true,
    autoplayTimeout: 4000,
    margin: 10,
    nav: true,
    navText: ["<i class='fa-solid fa-arrow-left'></i>", "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        },
    }
})

/* 

_____scroll reveal animation_____
*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true
});

// _____Scroll Home_____
sr.reveal('.home-title',{});
sr.reveal('.home-button1', {delay: 200}); 
sr.reveal('.home-button2', {delay: 200}); 
sr.reveal('.home-img', {delay: 300}); 
sr.reveal('.home-social-contact-icon', {interval: 100}); 

// _____Scroll About_____
sr.reveal('.about-img',{delay: 300});
sr.reveal('.about-title',{delay: 200});
sr.reveal('.about-text',{delay: 200});
sr.reveal('.fun-fact',{delay: 200});
sr.reveal('.fun-fact-social-icon', {interval: 100});
// 
// _____scroll services_____
sr.reveal('.services-container',{delay: 200});

// _____scroll help_____
sr.reveal('.help-container',{delay: 200});

// _____scroll works_____
sr.reveal('.works-container',{delay: 200});
// 
// _____scroll admin_____
sr.reveal('.admin-container',{delay: 200});

// _____scroll skills_____ 
sr.reveal('.skills-title',{delay: 200});
sr.reveal('.skills-data',{interval: 100});
sr.reveal('.skills-img',{delay: 300});
// 
// _____scroll testimonials_____
sr.reveal('.testimonials-container',{delay: 200});
// 
// scroll contacts
sr.reveal('.contacts-container',{delay: 200});
// 
// scrool footer
sr.reveal('.contacts-container',{delay: 200});

// web3form form scripts
const form = document.getElementById('form');
const result = document.getElementById('result'); 

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."
    result.className = "wait";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
        },
        body: json
    })
    .then(async (response) => {
        let json =  await response.json();
        if (response.status === 200) {
            result.innerHTML = "Thanks for your submission";
            result.className ="success";
            form.reset();
        } else {
            console.log(response);
            result.innerHTML = json.message;
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Oops! There was a problem submitting your form.";
        result.error = "error";
    })
    .then(function() {
        form.reset();
        setTimeout(() => {
            result.style.display = "none";
        }, 3000);
    });
})

// FAQ
document.querySelectorAll('.accordion').forEach(button => {
    button.addEventListener('click', function (e) {
      const currentlyActive = document.querySelector('.accordion.active');
  
      // If there's an open accordion and it's not the one clicked, close it
      if (currentlyActive && currentlyActive !== this) {
        currentlyActive.classList.remove('active');
        currentlyActive.querySelector('i')?.classList.remove('rotate');
        currentlyActive.nextElementSibling.style.maxHeight = null;
      }
  
      const panel = this.nextElementSibling;
      const icon = this.querySelector('i');
      const isActive = this.classList.contains('active');
  
      // Toggle current one
      if (isActive) {
        this.classList.remove('active');
        icon?.classList.remove('rotate');
        panel.style.maxHeight = null;
      } else {
        this.classList.add('active');
        icon?.classList.add('rotate');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

// Typewriter function
const typewriters = document.querySelectorAll('.typewriter');

// Find the longest text content (flatten inner tags too)
let maxLength = 0;
typewriters.forEach(el => {
  const text = el.textContent.trim();
  if (text.length > maxLength) {
    maxLength = text.length;
  }
});

// Apply the same width and steps to all
typewriters.forEach(el => {
  el.style.setProperty('--ch-width', `${maxLength}ch`);
  el.style.setProperty('--step-count', maxLength);
});