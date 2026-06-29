// 1. Menú Hamburguesa
const toggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 2. Modal
function abrirModal() {
    const modal = document.getElementById("modalReserva");
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    const modal = document.getElementById("modalReserva");
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}

// Cerrar modal al hacer clic fuera
document.getElementById("modalReserva").addEventListener("click", function(e) {
    if (e.target === this) cerrarModal();
});

// 3. Formulario de Reserva
document.getElementById("formReserva").addEventListener("submit", async function(e) {
    e.preventDefault();

    const mensaje = document.getElementById("mensaje");
    const btn = this.querySelector("button[type='submit']");

    mensaje.style.color = "#4A5E44";
    mensaje.textContent = "Procesando reserva...";
    btn.disabled = true;
    btn.textContent = "Enviando...";

    const formData = new FormData(this);

    try {
        const response = await fetch("../api/guardar_reserva.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            mensaje.style.color = "#4CAF50";
            mensaje.textContent = "✅ Reserva registrada correctamente";

            setTimeout(() => {
                this.reset();
                cerrarModal();
                mensaje.textContent = "";
                btn.disabled = false;
                btn.textContent = "Confirmar Reserva";
            }, 2000);

        } else {
            mensaje.style.color = "#ff4d4d";
            mensaje.textContent = data.message;
            btn.disabled = false;
            btn.textContent = "Confirmar Reserva";
        }

    } catch(error) {
        mensaje.style.color = "#ff4d4d";
        mensaje.textContent = "Error al conectar con el servidor";
        btn.disabled = false;
        btn.textContent = "Confirmar Reserva";
        console.error(error);
    }
});
