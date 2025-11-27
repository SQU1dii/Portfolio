// ---------------------
// ACTIVE NAVBAR LINK ON SCROLL & SCROLL FIX
// ---------------------
const HEADER_OFFSET = 85; // Adjusted offset for fixed header height
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".navbar a");

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        // Use a consistent offset to correctly determine active section
        let offset = sec.offsetTop - HEADER_OFFSET; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector('.navbar a[href="#' + id + '"]').classList.add("active");
            });
        }
    });
    // Trigger skill bar animation on scroll
    animateSkillBarsOnScroll(); 
};

// ---------------------
// SMOOTH SCROLLING FIX
// ---------------------
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.getAttribute("href").startsWith("#")) {
            e.preventDefault();

            let target = document.querySelector(this.getAttribute("href"));
            window.scrollTo({
                // Adjusted offset for smooth scrolling to clear the fixed header
                top: target.offsetTop - (HEADER_OFFSET - 5), 
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
window.addEventListener("load", revealOnScroll);


/* -------------------------------
   FIX 3: SKILL BAR ANIMATION TRIGGER
--------------------------------*/
const skillSection = document.querySelector(".skills");
// Select all span elements inside .bar with a data-percent attribute
const skillBars = document.querySelectorAll(".progress .bar span[data-percent]"); 

let skillsAnimated = false;

function animateSkillBarsOnScroll() {
    if (!skillSection) return;

    const sectionTop = skillSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    // Check if skill section is visible and hasn't been animated yet
    if (sectionTop < screenHeight - 200 && !skillsAnimated) {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute("data-percent");
            // Set the width, triggering the CSS transition effect
            bar.style.width = percent + "%"; 
        });
        skillsAnimated = true;
    }
}
// Run on load in case the user starts scrolled down
window.addEventListener("load", animateSkillBarsOnScroll);


/* -------------------------------
   FIX 4: CLEAR CONTACT FORM AFTER SUBMIT
--------------------------------*/
const contactForm = document.querySelector("#contact-form");
const messageStatus = document.querySelector("#contact-form-message"); 

if (contactForm && messageStatus) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault(); // stop page from reloading
        
        messageStatus.textContent = "Sending message...";
        messageStatus.style.color = '#0ef';

        // Simulate network call delay
        setTimeout(() => {
            // FIX: Clear input fields using .reset()
            contactForm.reset(); 
            
            // Show success message
            messageStatus.textContent = "Thank you! Your message has been sent successfully.";
            messageStatus.style.color = '#4CAF50'; // Green for success

        }, 1500); // Wait 1.5 seconds

    });
}

/*-----------------------------------
     FOOTER YEAR
------------------------------------*/
document.getElementById("year").textContent = new Date().getFullYear();