/*

_____mobile navbar_____
*/
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
/*

_____remove mobile menu_____
*/
const navLink = document.querySelectorAll('.nav-link')

function linkAction () {
    const navMenu = document.getElementById('nav_menu')

    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*

_____active scroll_____
*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav-list a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.header nav-list a [href*= '+ id +']').classList.add('active');
            })

        }

    })
}

/*

_____scroll active_____
*/
// const sections = document.querySelectorAll('section[id]')

// const scrollActive = () =>{
    // const scrollDown = window.scrollY
// 
//   sections.forEach(current => {
        // const sectionHeight = current.offsetHeight,
            //   sectionTop = current.offsetTop - 58,
            //   sectionId = current.getAttribute('id'),
            //   sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')
        // 
        // if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            // sectionsClass.classList.add('active')
        // } else {
            // sectionsClass.classList.remove('active')
        // }                                                    
    // })
// }
// window.addEventListener('scroll', scrollActive)

// Swiper Navigation
var swiper = new Swiper(".works-content", {
    slidesPerView: 3,
    spaceBetween: 25,
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