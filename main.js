let productos = [];

const enviar = document.getElementById("enviar");
enviar.addEventListener("click",function(e){

  e.preventDefault(); 

  const nombreProducto = document.getElementById("nombre").value;
  const precioProducto = document.getElementById("precio").value;

  const producto = {
    nombre: nombreProducto,
    precio: parseFloat(precioProducto)
  };

  productos.push(producto);

  mostrarProductos();

  localStorage.setItem("productos", JSON.stringify(productos));

  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";

  
})


function mostrarProductos(){
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  productos.forEach((prod,index) => {

    const li = document.createElement("li");
    li.textContent = `${prod.nombre} - $${prod.precio}`;
    

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.addEventListener("click", () =>{
      productos.splice(index,1);
      localStorage.setItem("productos", JSON.stringify(productos));
      mostrarProductos();
      document.getElementById("total").textContent = total();
    })

    document.getElementById("total").textContent = total();

    li.appendChild(btn);  
    lista.appendChild(li)

  });
}


window.addEventListener("load", () =>{
  const guardados = JSON.parse(localStorage.getItem("productos"))
  if (guardados){
    productos = guardados;
    mostrarProductos();
  }
})

function total(){
  let total = 0;
  productos.forEach (prod =>{
    total += prod.precio;
  })
  return total;
}