///////// Crear Usuario

class Usuario {
    constructor(info) {
        this.usuario = info.usuario;
        this.clave = info.clave;
    };
};

let listaUsuarios = [];

function crearUsuario() {
    let usuario = prompt("Ingresa tu nombre de usuario: ");
    let clave = prompt("Ingresa tu contraseña: ");

    let nuevoUsuario = new Usuario({ usuario, clave });
    listaUsuarios.push(nuevoUsuario);

    console.log(listaUsuarios);
    sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

    alert(`Bienvenido/a ${usuario} a botillería, el mejor lugar para comprar alcohol`);
};
crearUsuario();

function validarUsuario() {
    alert("Ahora que has creado tu usuario, inicia sesión por favor:");
    let usuarioEncontrado = false;
    while (!usuarioEncontrado) {
        let usuarioInput = prompt("Ingresa tu nombre de usuario (o cancelar para salir):");
        if (usuarioInput === null) {
            alert("Has cancelado el inicio de sesión.");
            return; // Salir de la función si el usuario ha cancelado
        };
        let claveInput = prompt("Ingresa tu contraseña:");
        for (let i = 0; i < listaUsuarios.length; i++) {
            if (usuarioInput === listaUsuarios[i].usuario && claveInput === listaUsuarios[i].clave) {
                usuarioEncontrado = true;
                break;
            };
        };
        if (usuarioEncontrado) {
            alert("Tu nombre de usuario y contraseña son correctos.");
            alert("Has accedido a nuestra botillería y productos.");
        } else {
            alert("Tu nombre de usuario y contraseña son incorrectos. Por favor, inténtalo nuevamente.");
        };
    };
};

validarUsuario();


// ////////// MOSTRAR PRODUCTOS /////

// function mostrarAlcoholes() {
//         const productos = [
//             {id: 1, nombre: "Pisco", precio: 6990},
//             {id: 2, nombre: "Ron", precio: 5990},
//             {id: 3, nombre: "Vodka", precio: 4990},
//             {id: 4, nombre: "Tequila",precio: 7990},
//             {id: 5, nombre: "Cerveza", precio: 3990},
//             {id: 6, nombre: "Whisky", precio: 9990},
//             {id: 7, nombre: "Jugos", precio: 1990},
//             {id: 8,nombre: "Bebidas", precio: 1990},
//         ];

//         productos.forEach(alcohol => {
//             alert(`${alcohol.nombre} ${alcohol.precio}`);
//         });
// };

// //////// FILTER   ////////  Encontrar un alcohol
// function encontrarAlcohol() {
//     const productos = [
//         { id: 1, nombre: "Pisco Elqui", precio: "$3990" },
//         { id: 2, nombre: "Pisco Capel", precio: "$4990" },
//         { id: 3, nombre: "Pisco Mistral", precio: "$5990" },
//         { id: 4, nombre: "Pisco Alto Del Carmen", precio: "$6490" },
//         { id: 5, nombre: "Ron Dominican", precio: "$4990" },
//         { id: 6, nombre: "Ron Mitjans", precio: "$5990" },
//         { id: 7, nombre: "Ron Barcelo", precio: "$6990" },
//         { id: 8, nombre: "Ron Habana", precio: "$7990" },
//         { id: 9, nombre: "Vodka Eristoff", precio: "$5990" },
//         { id: 10, nombre: "Vodka Stolichnaya", precio: "$6490" },
//         { id: 11, nombre: "Vodka Absolut", precio: "$7490" },
//     ];

//     let nombreAlcohol = prompt("Ingrese el alcohol que está buscando (Pisco, Vodka, Ron): ").charAt(0).toUpperCase();

//     let filtroAlcohol = productos.filter(
//         item => item.nombre.includes(nombreAlcohol)
//     );

//     filtroAlcohol.forEach(item => {
//         let mensaje = `
//             Nombre: ${item.nombre}
//             Precio: ${item.precio}`;
//         alert(mensaje)
//     });
// };



// // FUNCION SOME ////////  Encontrar alcohol específico
// function someAlcohol() {
//     const productos = [
//         { id: 1, nombre: "Pisco Elqui", precio: "3990" },
//         { id: 2, nombre: "Pisco Capel", precio: "4990" },
//         { id: 3, nombre: "Pisco Mistral", precio: "5990" },
//         { id: 4, nombre: "Pisco Alto Del Carmen", precio: "6490" },
//         { id: 5, nombre: "Ron Dominican", precio: "4990" },
//         { id: 6, nombre: "Ron Mitjans", precio: "5990" },
//         { id: 7, nombre: "Ron Barcelo", precio: "6990" },
//         { id: 8, nombre: "Ron Habana", precio: "7990" },
//         { id: 9, nombre: "Vodka Eristoff", precio: "5990" },
//         { id: 10, nombre: "Vodka Stolichnaya", precio: "6490" },
//         { id: 11, nombre: "Vodka Absolut", precio: "7490" },
//     ];
//     let validar = "";
//     while (validar != "Fin") {
//         validar = prompt("Valida si está tu alcohol preferido (escribe 'fin' para finalizar):  ");
//         validar = validar.replace(/\b\w/g, (c) => c.toUpperCase());

//         let encontrado = productos.some(item => {
//             return item.nombre === validar;
//         });
//         if (encontrado) {
//             alert(`Si existe el/la ${validar}`);
//         } else if (validar.toLowerCase() !== "fin") {
//             alert(`No existe el/la ${validar}`);
//         };
//     };
// };


// /// FUNCION COTIZAR /////////
// function cotizarAlcohol() {
//     const productos = [
//         { id: 1, nombre: "Pisco Elqui", precio: "3990" },
//         { id: 2, nombre: "Pisco Capel", precio: "4990" },
//         { id: 3, nombre: "Pisco Mistral", precio: "5990" },
//         { id: 4, nombre: "Pisco Alto Del Carmen", precio: "6490" },
//         { id: 5, nombre: "Ron Dominican", precio: "4990" },
//         { id: 6, nombre: "Ron Mitjans", precio: "5990" },
//         { id: 7, nombre: "Ron Barcelo", precio: "6990" },
//         { id: 8, nombre: "Ron Habana", precio: "7990" },
//         { id: 9, nombre: "Vodka Eristoff", precio: "5990" },
//         { id: 10, nombre: "Vodka Stolichnaya", precio: "6490" },
//         { id: 11, nombre: "Vodka Absolut", precio: "7490" },
//     ];

//     let respuesta = parseInt(prompt("Cotiza el valor de tu compra. Ingresa que la opción de alcohol que quieres. \n1. Pisco Elqui \n2. Pisco Capel \n3. Pisco Mistral \n4. Pisco Alto del Carmen \n5. Ron Dominican \n6. Ron Mitjans \n7. Ron Barcelo \n8. Ron Habana \n9. Vodka Eristoff \n10. Vodka Stolichnaya \n11. Vodka Absolut \n Ingresa FIN para finalizar el cotizador"));
//     let cantidadAlcohol = parseInt(prompt("¿Que cantidad quieres? \nDesde 3 unidades, 10% dcto.  \nDesde 6 unidades, 20% dcto en el total de tu compra"));

//     let idAlcohol = productos.filter(
//         item => item.id === respuesta
//     );

//     idAlcohol.forEach(item => {
//         if (cantidadAlcohol <= 2) {
//             precioFinal = cantidadAlcohol * parseInt(item.precio);
//         } else if (cantidadAlcohol >= 3 && cantidadAlcohol <= 5) {
//             precioFinal = cantidadAlcohol * parseInt(item.precio * 0.9);
//         } else if (cantidadAlcohol >= 6) {
//             precioFinal = cantidadAlcohol * parseInt(item.precio * 0.8);
//         };

//         let mensaje = `
//             Nombre: ${item.nombre}
//             Precio Unitario: ${item.precio}
//             Cantidad: ${cantidadAlcohol}
//             Precio Final: $ ${precioFinal}
//             `;
//         alert(mensaje)
//     });
// };


// /////// AÑADIR AL CARRITO Y CALCULAR PRECIO TOTAL /////////

// let carritoAlcohol = [];

// function añadirCarrito(){
//     const productos = [
//         { id: 1, nombre: "Pisco Elqui", precio: "3990" },
//         { id: 2, nombre: "Pisco Capel", precio: "4990" },
//         { id: 3, nombre: "Pisco Mistral", precio: "5990" },
//         { id: 4, nombre: "Pisco Alto Del Carmen", precio: "6490" },
//         { id: 5, nombre: "Ron Dominican", precio: "4990" },
//         { id: 6, nombre: "Ron Mitjans", precio: "5990" },
//         { id: 7, nombre: "Ron Barcelo", precio: "6990" },
//         { id: 8, nombre: "Ron Habana", precio: "7990" },
//         { id: 9, nombre: "Vodka Eristoff", precio: "5990" },
//         { id: 10, nombre: "Vodka Stolichnaya", precio: "6490" },
//         { id: 11, nombre: "Vodka Absolut", precio: "7490" },
//     ];

//     let numero = parseInt(prompt("Elije una opcion: \n1. Pisco Elqui - $3990 \n2. Pisco Capel - $4990 \n3. Pisco Mistral - $5990 \n4. Pisco Alto del Carmen - $6490 \n5. Ron Dominican - $4990 \n6. Ron Mitjans - $5990 \n7. Ron Barcelo - $6990 \n8. Ron Habana - $7990 \n9. Vodka Eristoff - $5990 \n10. Vodka Stolichnaya - $6490 \n11. Vodka Absolut - $7490 \n0. Finalizar "));
//     while(numero !== 0){
//         let productoElegido = productos.find(alcohol =>
//             alcohol.id === numero);
//         if(productoElegido){
//             carritoAlcohol.push(productoElegido);
//             alert(`Producto agregado al carrito: ${productoElegido.nombre} = $${productoElegido.precio}`)
//         }else{
//             alert("Opción invalida. Intente nuevamente");
//         }
//         numero = parseInt(prompt("Elije una opcion: \n1. Pisco Elqui - $3990 \n2. Pisco Capel - $4990 \n3. Pisco Mistral - $5990 \n4. Pisco Alto del Carmen - $6490 \n5. Ron Dominican - $4990 \n6. Ron Mitjans - $5990 \n7. Ron Barcelo - $6990 \n8. Ron Habana - $7990 \n9. Vodka Eristoff - $5990 \n10. Vodka Stolichnaya - $6490 \n11. Vodka Absolut - $7490 \n0. Finalizar "));
//     }
//     alert("Carrito de compras: ");
//     carritoAlcohol.forEach(producto =>{
//         alert(`${producto.nombre} - Precio: $${producto.precio}`)
//     });

//     let total = carritoAlcohol.reduce((acum, producto) => acum + parseInt(producto.precio), 0);
//     alert(`El total de tu carrito es de: $${total}`);
// };

// /////// DESPEDIDA ///////

// function final() {

//     let despedida = (prompt("Por último, ¿quieres recibir información al correo?: "));
//     if (despedida.toLowerCase() == "si") {
//         alert(`Ya que tu respuesta es ${despedida}, te llegarán correos. Saludos`);
//     } else if (despedida.toLowerCase() == "no") {
//         alert(`Ya que tu respuesta es ${despedida}, no te llegarán correos. Saludos`);
//     } else {
//         alert("Respuesta mal ingresada");
//     };
// };

// /////// MENU /////

// // let opcion = parseInt(prompt("Ingresa una opción de lo que deseas hacer: \n1. Mostrar Productos \n2. Encontrar Alcohol \n3. Validar si está disponible un producto \n4. Cotizar productos \n5. COMPRAR PRODUCTOS \n6. Despedida \n7. Salir"));
// let opcion = parseInt(prompt("Ingresa una opcion: \n1. Mostrar Productos \n2. Encontrar Alcohol \n5. COMPRAR PRODUCTOS \n7. Salir"))
// while (opcion != "Salir") {
//     switch (opcion) {
//         case 1:
//             mostrarAlcoholes();
//             break;
//         case 2:
//             encontrarAlcohol();
//             break;
//         case 3:
//             someAlcohol();
//             break;
//         case 4:
//             cotizarAlcohol();
//             break;
//         case 5:
//             setTimeout( function() { window.location.href = "../pages/productos.html"; }, 1000 )
//             exit();
//             break;
//         case 6:
//             final();
//             break;
//         case 7:
//             alert("Gracias por visitarnos!")
//             exit();
//             break;
//         default:
//             alert("Opcion no valida");
//             break;
//     };
//     opcion = parseInt(prompt("Ingresa una opcion: \n1. Mostrar Productos \n2. Encontrar Alcohol \n5. COMPRAR PRODUCTOS \n7. Salir"))
// };
