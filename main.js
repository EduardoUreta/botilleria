// /// Class Productos

// class Productos{
//     constructor(info){
//         this.id = info.id
//         this.nombre = info.nombre,
//         this.precio = info.precio,
//         this.img = info.img
//         this.stock = 1
//     };
// };

// //// Instanciar productos

// const pisco = new Productos(1, "Pisco", 6990, "../recursos/productos/pisco_low.png");
// const Ron = new Productos(2, "Ron", 5990, "../recursos/productos/ron_low.png");
// const vodka = new Productos(3, "Vodka", 4990, "../recursos/productos/vodka_low.png");
// const tequila = new Productos(4, "Tequila", 7990, "../recursos/productos/tequila_low.png");
// const cerveza = new Productos(5, "Cervezas", 3990, "../recursos/productos/cervezas_low.png");
// const whisky = new Productos(6, "Whisky", 9990, "../recursos/productos/whisky_low.png");
// const jugo = new Productos(7, "Jugos", 1990, "../recursos/productos/jugos_low.png");
// const bebida = new Productos(8, "Bebidas", 1990, "../recursos/productos/bebidas_low.png");

// //// Lista

// const productos = [pisco, Ron, vodka, tequila, cerveza, whisky, jugo, bebida];

// ///// Carrito

// let carrito = [];

// //cargar carrito desde el localstorage

// carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : [];

// // Modificar DOM para mostrar los productos
// const contenedorProductos = document.getElementById("contenedorProductos");





////////////////
const contenidoCarrito = document.getElementById("contenidoCarrito");

const productos = [
    {
        id: 1,
        nombre: "Pisco",
        precio: 6990,
        img: "../recursos/productos/pisco_low.png",
    },
    {
        id: 2,
        nombre: "Ron",
        precio: 5990,
        img: "../recursos/productos/ron_low.png",
    },
    {
        id: 3,
        nombre: "Vodka",
        precio: 4990,
        img: "../recursos/productos/vodka_low.png",
    },
    {
        id: 4,
        nombre: "Tequila",
        precio: 7990,
        img: "../recursos/productos/tequila_low.png",
    },
    {
        id: 5,
        nombre: "Cerveza",
        precio: 3990,
        img: "../recursos/productos/cervezas_low.png",
    },
    {
        id: 6,
        nombre: "Whisky",
        precio: 9990,
        img: "../recursos/productos/whisky_low.png",
    },
    {
        id: 7,
        nombre: "Jugos",
        precio: 1990,
        img: "../recursos/productos/jugos_low.png",
    },
    {
        id: 8,
        nombre: "Bebidas",
        precio: 1990,
        img: "../recursos/productos/bebidas_low.png",
    },
];

//// Carrito 

let carrito = [];

/// Recorrer el array de productos y crear el codigo HTML con cada producto

productos.forEach((producto) => {
    let contenedor = document.createElement("div"); /// Creo el div
    contenedor.className = "border col-sm-6 col-md-4 col-lg-3";
    contenedor.innerHTML = `  
        <h1 class="text-center text-warning">${producto.nombre}</h1>
        <img class="img-fluid imgAnimado bg-light" src="${producto.img}"><img>
        <p class="text-center h3 text-warning">$${producto.precio}</p>
    ` ///Creo el HTML de cada producto
    contenidoCarrito.append(contenedor); /// en el div del HTML, pego lo creado recién

    let botonComprar = document.createElement("button"); /// Creo un boton html
    botonComprar.innerHTML = "Añadir al carrito"; /// con un texto
    contenedor.append(botonComprar); /// en el div del html, pego lo recien creado
});

