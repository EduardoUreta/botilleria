///////// Crear Usuario

class Usuario {
    constructor(info) {
        this.usuario = info.usuario;
        this.clave = info.clave;
    };
};

let listaUsuarios = [];

function crearUsuario() {
  return new Promise((resolve) => {
    Swal.fire({
      title: 'Crea tu nombre de usuario:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (usuario) => {
        return new Promise((resolve) => {
          if (usuario) {
            resolve(usuario);
          } else {
            Swal.showValidationMessage('Debes ingresar un nombre de usuario');
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        const usuario = result.value;
        Swal.fire({
          title: 'Crea tu contraseña:',
          input: 'password',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          showLoaderOnConfirm: true,
          preConfirm: (clave) => {
            return new Promise((resolve) => {
              if (clave) {
                resolve(clave);
              } else {
                Swal.showValidationMessage('Debes ingresar una contraseña');
              }
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            const clave = result.value;

            let nuevoUsuario = { usuario, clave };
            listaUsuarios.push(nuevoUsuario);

            console.log(listaUsuarios);
            sessionStorage.setItem('usuario', JSON.stringify(nuevoUsuario));

            Swal.fire({
              title: `Bienvenido/a ${usuario} a botillería, el mejor lugar para comprar alcohol`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  });
}

function validarUsuario() {
  Swal.fire({
    title: 'Inicia sesión:',
    icon: 'info',
    confirmButtonText: 'Aceptar'
  }).then(() => {
    let usuarioEncontrado = false;
    const storedUsuario = sessionStorage.getItem('usuario');
    if (storedUsuario) {
      const { usuario, clave } = JSON.parse(storedUsuario);

      Swal.fire({
        title: 'Ingresa tu nombre de usuario:',
        inputValue: usuario,
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (usuarioInput) => {
          return new Promise((resolve) => {
            if (usuarioInput) {
              resolve(usuarioInput);
            } else {
              Swal.showValidationMessage('Debes ingresar un nombre de usuario');
            }
          });
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          const usuarioInput = result.value;
          if (usuarioInput === null) {
            Swal.fire('Has cancelado el inicio de sesión.', '', 'warning');
            return; // Salir de la función si el usuario ha cancelado
          }
          Swal.fire({
            title: 'Ingresa tu contraseña:',
            input: 'password',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: (claveInput) => {
              return new Promise((resolve) => {
                if (claveInput) {
                  resolve(claveInput);
                } else {
                  Swal.showValidationMessage('Debes ingresar una contraseña');
                }
              });
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              const claveInput = result.value;

              if (usuarioInput === usuario && claveInput === clave) {
                usuarioEncontrado = true;
              }

              if (usuarioEncontrado) {
                Swal.fire('Tu nombre de usuario y contraseña son correctos.', 'Has accedido a nuestra botillería y productos.', 'success');
              } else {
                Swal.fire('Tu nombre de usuario y contraseña son incorrectos. Por favor, inténtalo nuevamente.', '', 'error');
              }
            }
          });
        }
      });
    }
  });
}

// Lógica principal
if (sessionStorage.getItem('usuario')) {
  validarUsuario();
} else {
  crearUsuario().then(() => {
    validarUsuario();
  });
}

///// obtener contenido del catalogo
const contenidoCatalogo = document.getElementById("contenidoCatalogo");

//// obtener contenido del carrito
const contenidoCarrito = document.getElementById("contenidoCarrito");

/// boton ver carrito
const verCarrito = document.getElementById("verCarrito");

//// Vaciar carrito
const vaciarCarrito = document.getElementById("vaciarCarrito");

//// Carrito 

let carrito = [];

//// Cargar carrito desde el sessionstorage

carrito = (sessionStorage.getItem('carrito')) ? JSON.parse(sessionStorage.getItem('carrito')) : [];

/// Recorrer el array de productos y crear el codigo HTML con cada producto

const traerProductosJson = async () =>{
    try{
        const response = await fetch("../data.json")
        const data = await response.json();
        data.forEach((producto) => {
            let contenedor = document.createElement("div"); /// Creo el div
            contenedor.className = "col-sm-6 col-md-4 col-lg-3";
            contenedor.innerHTML = `  
                <h1 class="text-center text-warning">${producto.nombre}</h1>
                <img class="img-fluid imgAnimado bg-light" src="${producto.img}"><img>
                <p class="text-center h3 text-warning">$${producto.precio}</p>
                ` ///Creo el HTML de cada producto
            contenidoCatalogo.append(contenedor); /// en el div del HTML, pego lo creado recién

            let botonComprar = document.createElement("button"); /// Creo un boton html
            botonComprar.innerHTML = "Añadir al carrito"; /// con un texto
            botonComprar.className = "bg-secondary border text-light buttonAnadir"
            contenedor.append(botonComprar); /// en el div del html, pego lo recien creado

/// Escuchar evento // Cargar carrito con selección de productos

//// Si el producto ya está en carrito, agrega 1 cantidad, si no, crealo
            botonComprar.addEventListener("click", () =>{
                let productoEnCarrito = carrito.find(item => item.id === producto.id);
                if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
                }else{
                carrito.push({
                    id: producto.id,
                    img: producto.img,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: 1,
                })};
                Toastify({
                    text: `Has agregado ${producto.nombre}`,
                    duration: 3000,
                    style:{
                        background: "linear-gradient(to right, #00b09b, #96c92d)",
                    },
                    gravity: "bottom",
                    position: "right",
                }).showToast();
            });
        });
    }catch(error){
        console.log(error);
    }
};

traerProductosJson();

//// Ver productos agregados en el carrito ////

verCarrito.addEventListener("click", () =>{
    mostrarCarrito();
});

const mostrarCarrito = () => {
    contenidoCarrito.innerHTML = "";  /// Para que al apretar, se agregue solo lo nuevo
    carrito.forEach((producto) => {
        let card = document.createElement("div");
        card.classList.add("col-xs-4", "col-sm-4", "col-md-4", "col-lg-3");
        card.innerHTML = `
        <div class="card containerCarrito">
            <img class="img-fluid bg-light card-img-top" width="250px" src="${producto.img}"></img>
            <h3 class="text-center text-dark">${producto.nombre}</h3>
            <p class="h3 text-center text-dark">${producto.precio}</p>
            <h4 class="text-center text-dark">Cantidad: ${producto.cantidad}</h4>
        </div>
        <div> 
            <button class="btn btn-light botonSumRes" id="restar${producto.id}">-</button>
            <button class="btn btn-light botonSumRes" id="agregar${producto.id}">+</button>
            <button class="border btn colorBoton text-light bg-danger containerCarrito" id="eliminar${producto.id}">Eliminar</button>
        </div>
        `;
        contenidoCarrito.appendChild(card);

        //// Eliminar productos
        const botonEliminar = document.getElementById(`eliminar${producto.id}`);
        botonEliminar.addEventListener("click", () => {
          eliminar(producto.id);
          Toastify({
            text: `Has eliminado ${producto.nombre}`,
            duration: 3000,
            style:{
                background: "linear-gradient(to right, #333333, #dd1818)",
            },
            gravity: "bottom",
            position: "right",
        }).showToast();
        });

        //Restar productos
        const botonRestar = document.getElementById(`restar${producto.id}`);
        botonRestar.addEventListener("click", () => {
          restar(producto.id);
          Toastify({
            text: `Has restado 1 ${producto.nombre}`,
            duration: 3000,
            style:{
                background: "linear-gradient(to right, #f7971e, #ffd200)",
            },
            gravity: "bottom",
            position: "right",
        }).showToast();
        });

        //// Agregar productos
        const botonSumar = document.getElementById(`agregar${producto.id}`);
        botonSumar.addEventListener("click", () => {
          agregar(producto.id);
          Toastify({
            text: `Has agregado ${producto.nombre}`,
            duration: 3000,
            style:{
                background: "linear-gradient(to right, #000000, #0f9b0f)",
            },
            gravity: "bottom",
            position: "right",
        }).showToast();
        });
    
    });
    ///// Alerta de carrito actualizado o vacio
    if(carrito.length >= 1){
        Swal.fire(
            "¡Excelente!",
            "Ahora verás tu carrito de compras actualizado",
            "success",
        );
    }else{
        Swal.fire(
            "¡Aún no has agregado productos al carrito!",
            "Selecciona tu producto preferido",
            "warning",
        );
    };
    //// Mostrar total a pagar
    totalPagar();
    //sessionstorage de carrito total
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
};


//// Función agregar productos
const agregar = (id) => {
    const producto = carrito.find(producto => producto.id === id);
        if(producto.cantidad >= 1){
        producto.cantidad +=1;
        mostrarCarrito();
    //sessionstorage
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }};
  
  //// Función restar productos
  const restar = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      mostrarCarrito();
      //sessionstorage
      sessionStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
      eliminar(id);
    };
  };
  
//// Función eliminar productos
  const eliminar = (id) => {
    carrito = carrito.filter((producto) => producto.id !== id);
    mostrarCarrito();
  };


//// Función total a pagar
const totalPagar = () => {
    const total = carrito.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `<h2 class="text-center text-warning">Total a pagar: </h2> <h1 class="text-light"> ${total} CPL </h1>`
    contenidoCarrito.append(totalCompra);
};
    
//// Boton vaciar carrito

vaciarCarrito.addEventListener("click", () =>{
    carrito = [];
    contenidoCarrito.innerHTML = "";
    Swal.fire(
        "¡Has eliminado tu carrito!",
        "Selecciona nuevamente tu producto preferido",
        "info",
    );
    //sessionstorage
    sessionStorage.clear();
});

//// Boton finalizar compra

finalizarCompra.addEventListener("click", () =>{
    if(carrito.length >=1){
    Swal.fire(
        "¡Has Finalizado tu compra!",
        "Te rediccionaremos a la pasarela de pagos",
        "success",
    )}else{
        Swal.fire(
            "¡No has agregado productos a tu carrito!",
            "Favor selecciona tu producto favorito",
            "warning",
    )};
});

