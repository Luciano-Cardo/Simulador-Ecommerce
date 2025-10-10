import { cargarProductos } from './productos.js';
import { inicializarCarrito, vaciarCarrito, inicializarPago } from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- 🏠 Página de inicio / productos ---
  if (document.getElementById("productos-container")) {
    cargarProductos();
  }

  // --- 🛒 Página del carrito ---
  if (document.getElementById("carrito-lista")) {
    inicializarCarrito();
    vaciarCarrito();
  }

  // --- 💳 Página de pago ---
  if (document.getElementById("form-pago")) {
    inicializarPago();
  } else {
    const btnPagar = document.getElementById("btn-pagar");
    if (btnPagar) {
      btnPagar.addEventListener("click", () => {
        window.location.href = "pago.html";
      });
    }
  }
});
