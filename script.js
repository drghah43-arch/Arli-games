/* =========================================
   ARLI GAMES
   FINAL JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ENTER BUTTON
       ===================================== */

    const enterBtn = document.getElementById("enterBtn");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const mainSite = document.getElementById("mainSite");

    enterBtn.addEventListener("click", function () {

        welcomeScreen.classList.add("hide");

        setTimeout(function () {

            mainSite.classList.add("show");

        }, 100);

    });


    /* =====================================
       MOUSE GLOW
       ===================================== */

    const mouseGlow = document.querySelector(".mouse-glow");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    document.addEventListener("mousemove", function (event) {

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


    /* =====================================
       3D LINKS
       ===================================== */

    const links = document.querySelectorAll(".link");

    links.forEach(function (link) {

        link.addEventListener("mousemove", function (event) {

            const rect = link.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 18;
            const rotateY = (centerX - x) / 18;

            link.style.transform =
                "perspective(800px) " +
                "rotateX(" + rotateX + "deg) " +
                "rotateY(" + rotateY + "deg) " +
                "scale(1.02)";
        });


        link.addEventListener("mouseleave", function () {

            link.style.transform =
                "perspective(800px) " +
                "rotateX(0deg) " +
                "rotateY(0deg) " +
                "scale(1)";

        });

    });


    /* =====================================
       PARTICLES
       ===================================== */

    const canvas = document.getElementById("particles");

    const ctx = canvas.getContext("2d");

    let particles = [];


    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", function () {

        resizeCanvas();

        createParticles();

    });


    function createParticles() {

        particles = [];

        const amount =
            window.innerWidth <= 600
                ? 35
                : 75;

        for (let i = 0; i < amount; i++) {

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
                    Math.random() * 0.6 + 0.1

            });

        }

    }


    createParticles();


    /* =====================================
       PARTICLE ANIMATION
       ===================================== */

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        /* MOVE */

        particles.forEach(function (particle) {

            particle.x += particle.speedX;
            particle.y += particle.speedY;


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
                "rgba(150,220,255," +
                particle.opacity +
                ")";

            ctx.fill();

        });


        /* CONNECT PARTICLES */

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

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


                if (distance < 115) {

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
                        "rgba(120,180,255," +
                        ((1 - distance / 115) * 0.13) +
                        ")";

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

});
