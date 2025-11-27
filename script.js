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
const skillSection = document.querySelector(".skills");
const skillBars = document.querySelectorAll(".skill-fill");

let skillsAnimated = false;

function animateSkillBars() {
    skillBars.forEach(bar => {
        let percent = bar.getAttribute("data-percent");
        bar.style.width = percent + "%";
    });
}

window.addEventListener("scroll", () => {
    if (skillSection) {
        const sectionTop = skillSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight - 100 && !skillsAnimated) {
            animateSkillBars();
            skillsAnimated = true;
        }
    }
});

/* -------------------------------
   CONTACT FORM - FIXED SUBMISSION
--------------------------------*/
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                showMessage("Message sent successfully! 🎉", "success");
                
                // Clear the form
                contactForm.reset();
            } else {
                showMessage("Oops! There was a problem sending your message.", "error");
            }
        } catch (error) {
            showMessage("Oops! There was a problem sending your message.", "error");
        }
    });
}

// Function to show messages
function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideDown 0.5s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        messageDiv.style.background = '#4caf50';
        messageDiv.style.color = '#fff';
    } else {
        messageDiv.style.background = '#f44336';
        messageDiv.style.color = '#fff';
    }
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Remove after 4 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
`;
document.head.appendChild(style);

/*-----------------------------------
     FOOTER YEAR
------------------------------------*/
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Smooth scroll for footer back to top button
const footerTopBtn = document.querySelector('.footer-iconTop a');
if (footerTopBtn) {
    footerTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}