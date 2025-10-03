import { cargarProductos } from './productos.js';
import { inicializarCarrito, vaciarCarrito } from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  inicializarCarrito();

  const btnVaciar = document.getElementById("vaciar-carrito");
  vaciarCarrito(btnVaciar);
});
