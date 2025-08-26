const productos = [
   { id: 1, nombre: "Monitor", precio: 70000 },
   { id: 2, nombre: "Teclado", precio: 12000 },
   { id: 3, nombre: "Mouse", precio: 5000 },
   { id: 4, nombre: "CPU", precio: 120000 },
];


let vector = [];

function agregarProducto(){
    let id = parseInt(prompt("Ingrese el numero del producto para añadirlo al carrito 🛒\n(presione 0 para salir)\n 1.Monitor  $70.000\n 2.Teclado   $12.000\n 3.Mouse    $5.000\n 4.CPU        $120.000"));
    if (id === 0 ){
        alert("Ningun producto fue agregado al carrito❌");
        return;
    }
    else{
        while (id != 0){
            if (isNaN(id)){
                alert("Entrada no válida. Por favor, ingrese un número.");
            }else if (id>4 || id<0 ){
                alert("Producto no encontrado. Intente nuevamente")
            }else{
                vector.push(productos[id - 1])
                alert("Su producto " + productos[id-1].nombre + " fue agregado correctamente al carrito✅");
            }
            id = parseInt(prompt("Ingrese el numero del producto para añadirlo al carrito 🛒\n(presione 0 para salir)\n 1.Monitor  $70.000\n 2.Teclado   $12.000\n 3.Mouse    $5.000\n 4.CPU        $120.000"));
        } 
    }
}


function calcularTotal(){
    let total = 0;
    if (vector.length === 0){
        alert("Su carrito esta vacio");
    }else{
       for (let i = 0; i < vector.length; i++) {
            total += vector[i].precio;
        }
        alert("El monto total de la compra es de 💰" + total)
    }
    return total;
}


 function mostrarCarrito(){
    let resumen = "";
    for (let index = 0; index < vector.length; index++) {
        resumen += "\n" + vector[index].nombre;
    }
    alert("Su carrito tiene los siguientes productos 🛒 \n " +resumen);
    return resumen;
}



alert("Bienvenido a mi tienda virtual");
agregarProducto()
console.log(mostrarCarrito());
console.log("Total gastado: " + calcularTotal());