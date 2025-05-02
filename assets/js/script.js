const THEME_KEY = 'themePreference';
(function setThemeFromStorage() {
    const themePreference = localStorage.getItem(THEME_KEY);
    if (themePreference === 'light-mode') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
})();

(function () {
    emailjs.init('z3Mw9ttLMDeQ3VGn_');
})();

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
};

const modeToggle = document.getElementById('toggle-theme');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
    saveThemePreference(theme);
});

function saveThemePreference(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

document.addEventListener("DOMContentLoaded", function () {
    var homeLink = document.querySelector('.logo');
    homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll('.navbar .hover-link');
    var headerHeight = document.querySelector('header').offsetHeight;
    var offset = 20;

    function updateActiveLink() {
        var scrollPosition = window.scrollY;
        var isAtTop = scrollPosition === 0;
        var isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;

        if (isAtTop) {
            document.querySelector('.navbar .hover-link.active').classList.remove('active');
            document.querySelector('.home').classList.add('active');
        } else if (isAtBottom) {
            document.querySelector('.navbar .hover-link.active').classList.remove('active');
            document.querySelector('[href="#contact"]').classList.add('active');
        } else {
            links.forEach(function (link) {
                var targetId = link.getAttribute('href');
                if (targetId !== "#") {
                    var targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        var targetOffset = targetElement.offsetTop - headerHeight - offset;
                        if (scrollPosition >= targetOffset) {
                            document.querySelector('.navbar .hover-link.active').classList.remove('active');
                            link.classList.add('active');
                        }
                    }
                }
            });
        }
    }

    window.addEventListener('scroll', function () {
        updateActiveLink();
    });

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId !== "#") {
                var targetElement = document.querySelector(targetId);
                if (targetElement) {
                    var targetOffset = targetElement.offsetTop - headerHeight - offset;
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });
                }
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            document.querySelector('.navbar .hover-link.active').classList.remove('active');
            this.classList.add('active');
            document.getElementById('nav-links').classList.remove('show');
        });
    });

    updateActiveLink();
});

document.addEventListener("DOMContentLoaded", function () {
    var link = document.querySelector('.contact-button');
    var headerHeight = document.querySelector('header').offsetHeight;
    var offset = 20;

    link.addEventListener('click', function (event) {
        event.preventDefault();
        var targetId = this.getAttribute('href');
        if (targetId !== "#") {
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                var targetOffset = targetElement.offsetTop - headerHeight - offset;
                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        document.querySelector('.navbar .hover-link.active').classList.remove('active');
        document.querySelector('.contact').classList.add('active');
    });
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    $(".loader").fadeIn("slow");
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const templateParams = {
        user_name: name,
        user_email: email,
        subject: `New message from ${name}`,
        message: message,
    };

    emailjs.send('service_mm7zb53', 'template_xhdyx3v', templateParams)
        .then(function (response) {
            $(".loader").fadeOut("slow");
            console.log('Email sent successfully!', response.status, response.text);
            toastr.remove();
            toastr.success('Email sent successfully!');
            document.getElementById('contact-form').reset();
        }, function (error) {
            $(".loader").fadeOut("slow");
            console.error('Email sending failed:', error);
            toastr.remove();
            toastr.error('Email sending failed. Please try again later.');
        });
});

const toggleButton = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggleButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!navLinks.contains(event.target)) {
        navLinks.classList.toggle('show');
    }
});  

function removeNavLinksShow() {
    navLinks.classList.remove('show');
}

document.body.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (!navLinks.contains(clickedElement)) {
        removeNavLinksShow();
    }
});

window.addEventListener('scroll', () => {
    removeNavLinksShow();
});


document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.right-hero');

    const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = (x - rect.width / 2) / (rect.width / 2);
        const dy = (y - rect.height / 2) / (rect.height / 2);

        element.style.transform = `perspective(500px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
        element.style.filter = 'grayscale(100%)';
    };

    const handleMouseLeave = () => {
        element.style.transform = '';
        element.style.filter = ''; 
    };

    if (element) {
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);
    }
});



// const element = document.getElementById("watchme");
// element.addEventListener("animationstart", listener, false);
// element.addEventListener("animationend", listener, false);
// element.addEventListener("animationiteration", listener, false);

// element.className = "slidein";

// function listener(event) {
//   const l = document.createElement("li");
//   switch (event.type) {
//     case "animationstart":
//       l.textContent = `Started: elapsed time is ${event.elapsedTime}`;
//       break;
//     case "animationend":
//       l.textContent = `Ended: elapsed time is ${event.elapsedTime}`;
//       break;
//     case "animationiteration":
//       l.textContent = `New loop started at time ${event.elapsedTime}`;
//       break;
//   }
//   document.getElementById("output").appendChild(l);
// } 

document.getElementById('viewAllBtn').addEventListener('click', function () {
    const hiddenProjects = document.querySelectorAll('.project-box.hidden');
    hiddenProjects.forEach(el => el.classList.remove('hidden'));
    this.style.display = 'none'; // Hide the button
});