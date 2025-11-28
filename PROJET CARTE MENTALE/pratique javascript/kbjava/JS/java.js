console.log("je suis un programmeur")
let hola = document.getElementById("hola")
let bonjour = document.getElementById('bonjour')

hola.addEventListener('click',function(){

    bonjour.innerText = "JE SUIS PRESENT"
})


let ampoule = document.getElementById('ampoule')

let bntallume = document.getElementById('bntallume')

let bnteteindre = document.getAnimations('bnteteindre')

bntallume.addEventListener("click", function(){

    ampoule.style.backgroundColor = "#f4f008";
})

bnteteindre.addEventListener("click", ()=>{
    ampoule.style.backgroundColor = "#dfdfd6ff";
})