let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMaximos = 4;

condicionesIniciales();
//console.log(numeroSecreto);

function asignarTextoElemento(elemento, texto){
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return; // No es necesario, pero lo pongo para que se vea que se puede poner
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    //console.log(intentos);

    if(numeroDeUsuario===numeroSecreto){
        asignarTextoElemento('p', `Adivinaste el numero secreto en ${intentos} ${intentos===1? 'intento':'intentos'}`);
        asignarTextoElemento('h1', 'Felicidades, ganaste!');
        document.getElementById('intentar').setAttribute('disabled',true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(intentos>intentosMaximos){
            asignarTextoElemento('p', `Ya no tienes mas intentos, el numero secreto era ${numeroSecreto}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('intentar').setAttribute('disabled',true);
        }else {
            if(numeroDeUsuario>numeroSecreto){
                asignarTextoElemento('p', 'El numero secreto es menor');
            }else{
                asignarTextoElemento('p', 'El numero secreto es mayor');
            
            }
            intentos++;
            limpiarInput();
        }

    }

    
    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //console.log(numeroGenerado);
    //console.log(listaNumerosSorteados);
    //Verificar el numero de intentos

        //Si ya fueron sorteados todos los numeros
        if(listaNumerosSorteados.length == numeroMaximo){
            console.log('Se sortearon todos los numeros posibles, reinicia el juego');
            asignarTextoElemento('p', 'Se sortearon todos los numeros posibles');
        }else {
                //Si el numero generado esta incluido en la lista de numeros sorteados, se genera otro numero
            if(listaNumerosSorteados.includes(numeroGenerado)){//includes hace una busqueda en el array y devuelve true o false
                return generarNumeroSecreto();
            }else{
                listaNumerosSorteados.push(numeroGenerado);
                return numeroGenerado;
            }
        }
    

    
}

function limpiarInput() {
    // let valorInput = document.querySelector('#valorUsuario');
    // valorInput.value = '';
    document.querySelector('#valorUsuario').value = '';//otra forma de hacerlo
    return;
    
}

function reiniciarJuego() {
    //limpiar el input
    limpiarInput();
    //indicar mensaje de intervalo de numeros
    //generar un nuevo numero secreto
    //reiniciar intentos
    condicionesIniciales();
    //desabilitar el boton de reiniciar
    document.querySelector('#reiniciar').setAttribute('disabled', true);
    document.getElementById('intentar').removeAttribute('disabled');

}

function condicionesIniciales(){
    intentos = 1;
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
}
