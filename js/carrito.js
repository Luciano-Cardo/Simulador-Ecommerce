import { guardar, recuperar } from './storage.js';

let carrito = recuperar("carrito");

const listaCarrito = document.getElementById("carrito-lista");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

export function inicializarCarrito() {
  actualizarCarrito();
}

export function agregarAlCarrito(producto) {
  const existe = carrito.find(p => p.nombre === producto.nombre);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardar("carrito", carrito);
  actualizarCarrito();
}

export function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((prod, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center align-items-stretch";
    li.innerHTML = `
      <div class="d-flex flex-column">
        <span>${prod.nombre}</span>
        <span>$${(prod.precio * prod.cantidad).toLocaleString("es-AR")}</span>
      </div>
      <div class="d-flex align-items-center gap-1">
        <button class="btn btn-sm btn-secondary btn-restar">-</button>
        <span>${prod.cantidad}</span>
        <button class="btn btn-sm btn-secondary btn-sumar">+</button>
        <button class="btn btn-sm btn-danger btn-eliminar">X</button>
      </div>
    `;
    listaCarrito.appendChild(li);
    total += prod.precio * prod.cantidad;

    // Botones
    li.querySelector(".btn-eliminar").addEventListener("click", () => { eliminarProducto(index); });
    li.querySelector(".btn-sumar").addEventListener("click", () => { sumarProducto(prod); });
    li.querySelector(".btn-restar").addEventListener("click", () => { restarProducto(prod, index); });
  });

  contadorCarrito.innerText = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  totalCarrito.innerText = `Total: $${total.toLocaleString("es-AR")}`;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardar("carrito", carrito);
  actualizarCarrito();
}

function sumarProducto(prod) {
  prod.cantidad += 1;
  guardar("carrito", carrito);
  actualizarCarrito();
}

function restarProducto(prod, index) {
  prod.cantidad -= 1;
  if (prod.cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardar("carrito", carrito);
  actualizarCarrito();
}

export function vaciarCarrito(btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire("El carrito ya está vacío", "", "info");
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        carrito.length = 0;
        guardar("carrito", carrito);
        actualizarCarrito();
        Swal.fire("¡Carrito vacío!", "", "success");
      }
    });
  });
}