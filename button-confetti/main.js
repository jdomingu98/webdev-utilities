document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let intervalId = null;
    const colors = ["#FFC107", "#FF5722", "#8BC34A", "#03A9F4", "#E91E63", "#9C27B0"];

    // Ajustar el tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Función para crear partículas de confetti
    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
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

    // Función para ejecutar el confetti
    function runConfetti() {
        // Detener cualquier intervalo previo
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Crear nuevas partículas
        createParticles();

        // Iniciar un nuevo intervalo
        intervalId = setInterval(() => {
            updateParticles();
            if (particles.length === 0) {
                clearInterval(intervalId);
                intervalId = null;  // Reiniciar el ID del intervalo cuando todo termine
            }
        }, 16);
    }

    // Evento para iniciar el confetti
    document.getElementById("startConfetti").addEventListener("click", runConfetti);

    // Ajustar el tamaño del canvas al cambiar el tamaño de la ventana
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

