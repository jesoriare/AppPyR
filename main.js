//importar las preguntas y respuestas
import { preguntasYRespuestas } from "./preguntas-y-respuestas.js";


//Variables
let preguntasSeleccionadas = [];
let puntuacion = 0;

// seleccionar los elementos del DOM
const contenedorPregunta= document.querySelector('#contenedor-pregunta');
const contenedorOpciones= document.querySelector('#contenedor-opciones');
const contenedorResultado= document.querySelector('#contenedor-resultado');

// punto de entrada del programa
mostrarTemas()

function mostrarTemas(){
    contenedorResultado.innerHTML= '';
    contenedorPregunta.innerHTML= '<h2 class="pregunta">Selecciona el tema:</h2>'

    Object.keys(preguntasYRespuestas).forEach((opcion)=>{
        contenedorOpciones.innerHTML += `<p class="opcion">${opcion}</p>`
    })

    //Para elegir el tema por el que quieres hacer hacer las preguntas y respuestas
    const opciones = contenedorOpciones.querySelectorAll('.opcion');

    opciones.forEach((opcion)=>{
    opcion.addEventListener('click', ()=>{
            const tema = opcion.innerHTML
            seleccionarTema(tema)
    })
    })

}

// Mostrar la primera pregunta dependiendo del tema que se ha seleccionado
function seleccionarTema(tema){
    preguntasSeleccionadas = preguntasYRespuestas[tema]
    mostrarPregunta(0)
    //aqui habra que tocar para ponerla aleatoria
}

function mostrarPregunta(indice){
    if(indice>=preguntasSeleccionadas.length){
        mostrarResultado()
        return;
    }
    const {pregunta, respuestaCorrecta, respuestas} = preguntasSeleccionadas[indice];

    contenedorPregunta.innerHTML = `<h2 class="pregunta">${pregunta}</h2>`;

    mostrarOpciones(respuestas, respuestaCorrecta, indice)
}

function mostrarOpciones(respuestas, respuestaCorrecta, indice){
    contenedorOpciones.innerHTML=``;
    respuestas.forEach((respuesta)=>{
        contenedorOpciones.innerHTML += `<p class="opcion">${respuesta}</p>`
    })

    const opciones = contenedorOpciones.querySelectorAll('.opcion');
    opciones.forEach((opcion)=>{
        opcion.addEventListener('click', ()=>{
            //Comparar lo que el usuario hizo click con la respuesta correcta
            if(opcion.innerHTML === respuestaCorrecta){
                opcion.classList.add('correcta')
                puntuacion++;
            }else{
                opcion.classList.add('incorrecta')
            }

            setTimeout(() => {
                mostrarPregunta(indice+1)
            }, 500);
        } )
    })

}


function mostrarResultado(){
    contenedorPregunta.innerHTML = ``;
    contenedorOpciones.innerHTML = ``;
    contenedorResultado.innerHTML = `<h2 class="total">
    Has acertado ${puntuacion} de ${preguntasSeleccionadas.length}
    </h2>
    
    <div class="contenedor-boton">
        <button id="reiniciarBtn">Reiniciar</button>
    </div>
    
    `;

    const butonReiniciar = contenedorResultado.querySelector('#reiniciarBtn');
    butonReiniciar.addEventListener('click',()=>{
        puntuacion= 0;
        mostrarTemas()
    } )
}






