// ---------------------
//  ACTIVE NAVBAR LINK ON SCROLL
// ---------------------

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".navbar a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 120;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector('.navbar a[href="#' + id + '"]').classList.add("active");
            });
        }
    });
};


// ---------------------
// SMOOTH SCROLLING
// ---------------------
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.getAttribute("href").startsWith("#")) {
            e.preventDefault();

            let target = document.querySelector(this.getAttribute("href"));
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});


// ---------------------
// SCROLL REVEAL ANIMATION
// ---------------------

const revealElements = document.querySelectorAll(
    ".home-content, .home-img, .Services-content, .Skills-column, .contact form"
);

function revealOnScroll() {
    let windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        let elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* -------------------------------
   SKILL BAR ANIMATION
--------------------------------*/
const skillSection = document.querySelector(".skills");   // change to your real section class/id
const skillBars = document.querySelectorAll(".skill-fill");

let skillsAnimated = false;

function animateSkillBars() {
    skillBars.forEach(bar => {
        let percent = bar.getAttribute("data-percent");
        bar.style.width = percent + "%";
    });
}

window.addEventListener("scroll", () => {
    const sectionTop = skillSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100 && !skillsAnimated) {
        animateSkillBars();
        skillsAnimated = true;
    }
});

/* -------------------------------
   CLEAR CONTACT FORM AFTER SUBMIT
--------------------------------*/
const contactForm = document.querySelector("#contact-form"); // use your form ID

contactForm.addEventListener("submit", function(e) {
    e.preventDefault(); // stop page from reloading

    // OPTIONAL: show success message
    alert("Message Sent Successfully!");

    // clear input fields
    contactForm.reset();
});
/*-----------------------------------
     FOOTER 
------------------------------------*/
document.getElementById("year").textContent = new Date().getFullYear();


