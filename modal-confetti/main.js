document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let intervalId = null;
    let isModalOpen = false;
    const colors = ["#FFC107", "#FF5722", "#8BC34A", "#03A9F4", "#E91E63", "#9C27B0"];

    const modal = document.getElementById("modal");
    const showModalButton = document.getElementById("showModal");
    const closeModalButton = document.getElementById("closeModal");

    // Ajustar el tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Función para crear partículas de confetti
    function createParticles() {
        if (isModalOpen) {
            for (let i = 0; i < 3; i++) {  // Crear partículas
                particles.push({
                    x: Math.random() * canvas.width,
                    y: -10, // Iniciar por encima del canvas
                    width: Math.random() * 10 + 5,
                    height: Math.random() * 10 + 5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    velocityX: (Math.random() - 0.5) * 2,
                    velocityY: Math.random() * 3 + 2,
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 10 - 5
                });
            }
        }
    }

    // Función para actualizar las partículas de confetti
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.rotation += particle.rotationSpeed;

            if (particle.y > canvas.height) {
                particles.splice(index, 1);
            }

            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate((particle.rotation * Math.PI) / 180);
            ctx.fillStyle = particle.color;
            ctx.fillRect(0, 0, particle.width, particle.height);
            ctx.restore();
        });
    }

    // Función para ejecutar el confetti de forma continua
    function runConfetti() {
        if (!intervalId) {  // Solo iniciar si no hay un intervalo activo
            intervalId = setInterval(() => {
                createParticles();  // Crear nuevas partículas continuamente
                updateParticles();  // Actualizar las partículas
                if (particles.length === 0 && !isModalOpen) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }, 24);  // 50ms para frecuencia en la creación de partículas
        }
    }

    // Mostrar el modal y comenzar el confetti
    showModalButton.addEventListener("click", () => {
        isModalOpen = true;
        modal.style.display = "block";
        runConfetti();
    });

    // Ocultar el modal y detener la generación de nuevas partículas
    closeModalButton.addEventListener("click", () => {
        isModalOpen = false;
        modal.style.display = "none";
    });

    // Ajustar el tamaño del canvas al cambiar el tamaño de la ventana
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
