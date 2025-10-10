import { recuperar, guardar } from "./storage.js";

let carrito = recuperar("carrito");
const resumenContainer = document.getElementById("resumen-carrito");
const formPago = document.getElementById("form-pago");

export function mostrarResumen() {
  if (!resumenContainer) return; 
  resumenContainer.innerHTML = "";

  if (carrito.length === 0) {
    resumenContainer.innerHTML = `<p>No tenés productos en el carrito.</p>`;
    return;
  }

  let total = 0;
  const lista = document.createElement("ul");
  lista.className = "list-group mb-3";

  carrito.forEach((prod, index) => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";

    item.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${prod.img}" alt="${prod.nombre}" width="50" class="img-thumbnail">
        <div>
          <strong>${prod.nombre}</strong>
          <div>Precio: $${prod.precio.toLocaleString("es-AR")}</div>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-secondary btn-restar">-</button>
        <span>${prod.cantidad}</span>
        <button class="btn btn-sm btn-secondary btn-sumar">+</button>
        <button class="btn btn-sm btn-danger btn-eliminar">Quitar unidad</button>
        <span class="fw-bold">$${(prod.precio * prod.cantidad).toLocaleString("es-AR")}</span>
      </div>
    `;
    lista.appendChild(item);
    total += prod.precio * prod.cantidad;

    // Botones de cada producto
    item.querySelector(".btn-eliminar").addEventListener("click", () => {
      if (carrito[index].cantidad > 1) carrito[index].cantidad -= 1;
      else carrito.splice(index, 1);
      guardar("carrito", carrito);
      mostrarResumen();
    });

    item.querySelector(".btn-sumar").addEventListener("click", () => {
      carrito[index].cantidad += 1;
      guardar("carrito", carrito);
      mostrarResumen();
    });

    item.querySelector(".btn-restar").addEventListener("click", () => {
      if (carrito[index].cantidad > 1) carrito[index].cantidad -= 1;
      else carrito.splice(index, 1);
      guardar("carrito", carrito);
      mostrarResumen();
    });
  });

  const totalItem = document.createElement("li");
  totalItem.className = "list-group-item d-flex justify-content-between fw-bold";
  totalItem.innerHTML = `<span>Total</span><span>$${total.toLocaleString("es-AR")}</span>`;
  lista.appendChild(totalItem);

  resumenContainer.appendChild(lista);
}

// Mostrar resumen al cargar la página
mostrarResumen();

// Manejo del formulario de pago
if (formPago) {
  formPago.addEventListener("submit", (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      Swal.fire("Tu carrito está vacío", "", "info");
      return;
    }

    const numeroPedido = Math.floor(Math.random() * 1000000);

    Swal.fire({
      title: "¡Gracias por tu compra! 🎉",
      html: `Tu número de pedido es <strong>#${numeroPedido}</strong>.<br>
             Te enviamos un email con el detalle de tu compra.`,
      icon: "success",
      confirmButtonText: "Volver al inicio"
    }).then(() => {
      carrito = [];
      guardar("carrito", carrito);
      window.location.href = "../index.html";
    });
  });
}
