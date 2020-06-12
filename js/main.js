// window.scrollBy({ 
//     top: 300, // could be negative value
//     left: 0, 
//     behavior: 'smooth' 
// });


// NAV MENU

const navIcon = document.querySelector('.nav-icon');
const navMenu = document.querySelector('.nav-menu');

navIcon.addEventListener('click', () => {
    navMenu.classList.toggle('visible');
})

navButtons = document.querySelectorAll('.nav-button');
navButtons.forEach((b) => {
    b.addEventListener('click', () => { navMenu.classList.remove('visible'); })
});


// DARK MODE

const darkModeButton = document.querySelector('#dark-mode');
const lightModeButton = document.querySelector('#light-mode');
const body = document.querySelector('#design-1');

darkModeButton.addEventListener('click', () => { body.classList.add('dark'); })
lightModeButton.addEventListener('click', () => { body.classList.remove('dark'); })

// FRONT PAGE

const img1 = document.querySelector('#img1');

const txt1 = document.querySelector('.main-title.t1');
const txt2 = document.querySelector('.main-title.t2');
const txt3 = document.querySelector('.main-title.t3');

tl = new TimelineMax();
tl.fromTo(img1, 2, {opacity: 0}, {opacity: 1}, "+=1")
    .fromTo(img1, 2, {scaleX: 0.9, scaleY: 0.9}, {scaleX: 1, scaleY: 1}, "-=2")
    .fromTo(txt1, 1, {left: "150vw"}, {left: "50vw"}, "-=2")
    .fromTo(txt2, 1, {left: "150vw"}, {left: "50vw"}, "-=1.5")
    .fromTo(txt3, 1, {left: "150vw"}, {left: "50vw"}, "-=1")
;

// Front page title txt1 has position: fixed and moves with the screen. After scrolling to 100vh the text needs to be bound to its position on the page by adding a class 'bound'

function getScroll() {
    if(typeof pageYOffset != 'undefined') {
        return pageYOffset; //Most browsers
    } else {
        var b = document.body; //IE 'quirks'
        var d = document.documentElement; //IE with doctype
        d = (d.clientHeight)? d : b;
        return d.scrollTop;
    }
}

$(window).on("scroll", () => {
    let screenH = window.innerHeight;
    getScroll() >= screenH ? txt1.classList.add('bound') : txt1.classList.remove('bound');
})


// GALLERY

const galImages = document.querySelectorAll('.gal-img');
console.log(galImages);
var active_image = 0;
function setActiveImage(ind) {
    if (ind == -1) { ind = galImages.length-1; }
    if (ind == galImages.length) { ind = 0; }
    galImages.forEach((i) => { i.classList.remove('active'); })
    galImages[ind].classList.add('active');
    active_image = ind;
}

setActiveImage(3);

prevImgButton = document.querySelector('#prev-img');
prevImgButton.addEventListener('click', () => { setActiveImage(active_image-1); });
nextImgButton = document.querySelector('#next-img');
nextImgButton.addEventListener('click', () => { setActiveImage(active_image+1); });

// leaving floating title in after scrolling under about page


// CONTACT 

const contactName = document.querySelector('#contact-name');
const contactEmail = document.querySelector('#contact-email');
const contactMessage = document.querySelector('#contact-message');
const contactButton = document.querySelector('#contact-button');
const contactErrors = document.querySelector('#contact-errors');

contactName.addEventListener('keyup', () => {
    if (contactName.value.length > 0) {
        contactName.classList.remove('error');
    } else {
        contactName.classList.add('error');
    }
});

contactEmail.addEventListener('keyup', () => {
    if (contactEmail.value.length > 0) {
        contactEmail.classList.remove('error');
    } else {
        contactEmail.classList.add('error');
    }
});

contactMessage.addEventListener('keyup', () => {
    if (contactMessage.value.length > 0) {
        contactMessage.classList.remove('error');
    } else {
        contactMessage.classList.add('error');
    }
});


contactButton.addEventListener('click', () => {
    contactErrors.textContent = '';
    contactErrors.classList.add('hidden');
    contactName.classList.remove('error');
    contactEmail.classList.remove('error');
    contactMessage.classList.remove('error');

    let err = false;
    if (contactName.value == 0) { contactName.classList.add('error'); err = true; }
    if (contactEmail.value == 0) { contactEmail.classList.add('error'); err = true; }
    if (contactMessage.value == 0) { contactMessage.classList.add('error'); err = true; }
    if(err) {
        contactErrors.classList.remove('hidden');
        contactErrors.textContent = 'Fill empty fields';
    } else {
        $.ajax({
            type: "POST",
            url: "php/send.php",
            dataType: "json",
            data: {},
            success: (feedback) => {
                if (feedback.error == "") {
                    // no error
                } else {
                    contactErrors.classList.remove('hidden');
                    contactErrors.textContent = feedback.error;
                }
            }
        })
    }

});



window.scrollTo(0, 0);


