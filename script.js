```javascript
/* =========================================
   ARLI GAMES
   INTERACTIVE JAVASCRIPT
   ========================================= */


/* =========================================
   ENTER WEBSITE
   ========================================= */

const enterBtn = document.getElementById("enterBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const mainSite = document.getElementById("mainSite");

enterBtn.addEventListener("click", () => {

    enterBtn.style.transform = "scale(0.92)";

    setTimeout(() => {

        welcomeScreen.classList.add("hide");

        setTimeout(() => {

            mainSite.classList.add("show");

            revealElements();

        }, 350);

    }, 150);

});


/* =========================================
   REVEAL ELEMENTS
   ========================================= */

function revealElements() {

    const elements =
        document.querySelectorAll(".reveal");

    elements.forEach((element, index) => {

        setTimeout(() => {

            element.classList.add("active");

        }, index * 180);

    });

}


/* =========================================
   MOUSE GLOW
   ========================================= */

const mouseGlow =
    document.querySelector(".mouse-glow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});

function animateGlow() {

    glowX +=
        (mouseX - glowX) * 0.08;

    glowY +=
        (mouseY - glowY) * 0.08;

    mouseGlow.style.left =
        glowX + "px";

    mouseGlow.style.top =
        glowY + "px";

    requestAnimationFrame(animateGlow);
}

animateGlow();


/* =========================================
   3D LINK EFFECT
   ========================================= */

const links =
    document.querySelectorAll(".link");

links.forEach((link) => {

    link.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                link.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 15;

            const rotateY =
                (centerX - x) / 15;

            link.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.02)`;

        }
    );

    link.addEventListener(
        "mouseleave",
        () => {

            link.style.transform =
                "perspective(800px) rotateX(0) rotateY(0) scale(1)";

        }
    );

});


/* =========================================
   PARTICLES
   ========================================= */

const canvas =
    document.getElementById("particles");

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
    resizeCanvas
);


/* CREATE PARTICLES */

const particleCount =
    window.innerWidth < 600
        ? 35
        : 70;

for (
    let i = 0;
    i < particleCount;
    i++
) {

    particles.push({

        x:
            Math.random()
            * canvas.width,

        y:
            Math.random()
            * canvas.height,

        size:
            Math.random()
            * 2 + 0.5,

        speedX:
            (Math.random() - 0.5)
            * 0.35,

        speedY:
            (Math.random() - 0.5)
            * 0.35,

        opacity:
            Math.random()
            * 0.6 + 0.1

    });

}


/* DRAW PARTICLES */

function drawParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.x +=
            particle.speedX;

        particle.y +=
            particle.speedY;


        /* LOOP */

        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {

            particle.speedX *= -1;

        }

        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {

            particle.speedY *= -1;

        }


        /* DRAW */

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(150,220,255,${particle.opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(drawParticles);

}

drawParticles();


/* =========================================
   PARTICLE CONNECTIONS
   ========================================= */

function connectParticles() {

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

            if (distance < 110) {

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
                    `rgba(120,180,255,${(
                        1 - distance / 110
                    ) * 0.12})`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }

}

const oldDraw =
    drawParticles;

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.x +=
            particle.speedX;

        particle.y +=
            particle.speedY;

        if (
            particle.x < 0 ||
            particle.x > canvas.width
        ) {
            particle.speedX *= -1;
        }

        if (
            particle.y < 0 ||
            particle.y > canvas.height
        ) {
            particle.speedY *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(150,220,255,${particle.opacity})`;

        ctx.fill();

    });

    connectParticles();

    requestAnimationFrame(
        animateParticles
    );

}


/* Start improved animation */

cancelAnimationFrame(
    window.particleAnimation
);

animateParticles();
```
