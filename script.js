/* =========================================
ARLI GAMES
PREMIUM GAMING JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

```
/* =====================================
   LOADER
   ===================================== */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.classList.add("loader-hide");
        }

    }, 1800);

});


/* =====================================
   ENTER BUTTON
   ===================================== */

const enterBtn = document.getElementById("enterBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const mainSite = document.getElementById("mainSite");

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        welcomeScreen.classList.add("hide");

        setTimeout(() => {
            mainSite.classList.add("show");
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 300);

    });

}


/* =====================================
   MOUSE GLOW
   ===================================== */

const mouseGlow = document.querySelector(".mouse-glow");

if (mouseGlow && window.innerWidth > 768) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });

    function updateGlow() {

        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        mouseGlow.style.left = glowX + "px";
        mouseGlow.style.top = glowY + "px";

        requestAnimationFrame(updateGlow);

    }

    updateGlow();

}


/* =====================================
   3D HOVER EFFECT
   ===================================== */

const tiltElements = document.querySelectorAll(
    ".link, .game-card, .stat-card, .info-card"
);

if (window.innerWidth > 768) {

    tiltElements.forEach((element) => {

        element.addEventListener("mousemove", (event) => {

            const rect = element.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            element.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)
                 scale(1.02)`;

        });


        element.addEventListener("mouseleave", () => {

            element.style.transform = "";

        });

    });

}


/* =====================================
   SCROLL REVEAL
   ===================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =====================================
   COUNTER ANIMATION
   ===================================== */

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target =
                Number(counter.dataset.target);

            let count = 0;

            const speed = 40;

            const updateCounter = () => {

                if (count < target) {

                    count++;

                    counter.textContent = count;

                    setTimeout(
                        updateCounter,
                        speed
                    );

                } else {

                    counter.textContent =
                        target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });


counters.forEach((counter) => {

    counterObserver.observe(counter);

});


/* =====================================
   PARTICLES CANVAS
   ===================================== */

const canvas =
    document.getElementById("particles");

if (canvas) {

    const ctx =
        canvas.getContext("2d");

    let particles = [];


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    resizeCanvas();


    window.addEventListener(
        "resize",
        () => {

            resizeCanvas();

            createParticles();

        }
    );


    /* CREATE PARTICLES */

    function createParticles() {

        particles = [];

        const amount =
            window.innerWidth <= 600
                ? 30
                : 65;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            particles.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                size:
                    Math.random() * 2 + 0.5,

                speedX:
                    (Math.random() - 0.5) *
                    0.35,

                speedY:
                    (Math.random() - 0.5) *
                    0.35,

                opacity:
                    Math.random() *
                    0.6 + 0.15

            });

        }

    }


    createParticles();


    /* PARTICLE ANIMATION */

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(
            (particle) => {

                particle.x +=
                    particle.speedX;

                particle.y +=
                    particle.speedY;


                if (
                    particle.x <= 0 ||
                    particle.x >= canvas.width
                ) {

                    particle.speedX *= -1;

                }


                if (
                    particle.y <= 0 ||
                    particle.y >= canvas.height
                ) {

                    particle.speedY *= -1;

                }


                /* DRAW PARTICLE */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(
                        120,
                        220,
                        255,
                        ${particle.opacity}
                    )`;

                ctx.fill();

            }
        );


        /* CONNECT PARTICLES */

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const dx =
                    particles[i].x -
                    particles[j].x;

                const dy =
                    particles[i].y -
                    particles[j].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (distance < 120) {

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            100,
                            180,
                            255,
                            ${(
                                1 -
                                distance / 120
                            ) * 0.12}
                        )`;

                    ctx.lineWidth = 1;

                    ctx.stroke();

                }

            }

        }


        requestAnimationFrame(
            animateParticles
        );

    }


    animateParticles();

}


/* =====================================
   NAVBAR ACTIVE LINK
   ===================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }
);


/* =====================================
   EASTER EGG
   KONAMI CODE
   ↑ ↑ ↓ ↓ ← → ← → B A
   ===================================== */

const secretCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
];

let secretIndex = 0;


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() ===
            secretCode[secretIndex].toLowerCase()
        ) {

            secretIndex++;

        } else {

            secretIndex = 0;

        }


        if (
            secretIndex ===
            secretCode.length
        ) {

            activateEasterEgg();

            secretIndex = 0;

        }

    }
);


function activateEasterEgg() {

    document.body.classList.add(
        "secret-mode"
    );


    const message =
        document.createElement("div");

    message.className =
        "secret-message";

    message.innerHTML =
        "🎮 SECRET MODE ACTIVATED! ⚡";


    document.body.appendChild(
        message
    );


    setTimeout(() => {

        message.remove();

        document.body.classList.remove(
            "secret-mode"
        );

    }, 4000);

}
```

});
