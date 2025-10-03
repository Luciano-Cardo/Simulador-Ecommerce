import { agregarAlCarrito } from './carrito.js';

const productosContainer = document.getElementById("productos-container");

export async function cargarProductos() {
  try {
    const res = await fetch("../data/productos.json");
    const productos = await res.json();
    mostrarProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

function mostrarProductos(productos) {
  productosContainer.innerHTML = "";
  productos.forEach(prod => {
    const card = document.createElement("article");
    card.className = "card-auto";
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.nombre}" class="w-100"/>
      <h3 class="mt-2">${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <p>$${prod.precio.toLocaleString("es-AR")}</p>
      <button class="card-auto-btm w-100 btn-comprar">Comprar</button>
    `;
    productosContainer.appendChild(card);

    card.querySelector(".btn-comprar").addEventListener("click", () => {
      agregarAlCarrito(prod);
      Swal.fire({
        title: "¡Producto agregado!",
        text: `${prod.nombre} se añadió al carrito.`,
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    });
  });
}