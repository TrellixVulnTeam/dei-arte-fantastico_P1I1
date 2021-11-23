class seguro {
    constructor(marca, precio) {
        this.marca = marca
        this.precio = precio
    }
}


function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
//cotizar seguro
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35        
    */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }

    //año del auto (depende el año depende el valor)
    const diferencia = new Date().getFullYear() - this.anio;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    // segun el tipo de seguro que elija se le agrega un porcentaje al precio
    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}


function Interfaz() {}

// si falta algun dato te aparece menseje de error de lo contrario aparecera correcto con el resumen de tus gastos
Interfaz.prototype.mostarMensaje = function(mensaje, tipo) {
    const div = document.createElement("div");

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add("mensaje", "correcto");
    }

    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector(".form-group"));

    setTimeout(function() {
        document.querySelector('.mensaje').remove();
    }, 2000);
};


Interfaz.prototype.mostrarResultado = function(seguro, total) {
    const resultado = document.getElementById('resultado');
    let marca;

    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiático';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }


    const div = document.createElement('div');

    div.innerHTML = `
       <p class="header">Tu resumen:</p>
       <p>Marca: ${marca}</p>
       <p> Año: ${seguro.anio}</p>
       <p>Tipo: ${seguro.tipo}</p>
       <p>Total: $ ${total}</p>   
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';

    setTimeout(function() {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 500);

}

//datos del formulario
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;


    const anio = document.getElementById("anio");
    const anioSeleccionado = anio.options[anio.selectedIndex].value;


    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    const interfaz = new Interfaz();

    //revisar los campos
    if (marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '') {

        interfaz.mostarMensaje('Faltan Datos, revisa e intenta de nuevo', 'error');
    } else {

        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);

        const cantidad = seguro.cotizarSeguro(seguro);
        //mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostarMensaje('Cotizando', 'correcto');

    }

});




const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');

for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);

}