for (let i = 1; i <= 10; i++) {
    console.log(i)
}


let i = 1;
let somme = 0;

while (i <= 100) {
    somme += i;
    i++;
}

console.log("La somme de 1 à 100 est : " + somme);


let secret = Math.floor(Math.random() * 100) + 1;
let guess;

do {
    guess = parseInt(prompt("Devinez le nombre (entre 1 et 100) :"));

    if (guess > secret) {
        console.log("Trop grand !");
    } else if (guess < secret) {
        console.log("Trop petit !");
    } else {
        console.log("Bravo ! Vous avez trouvé !");
    }
    
} while (guess !== secret);



let N = parseInt(prompt("Entrez le nombre de termes à afficher :"));

let a = 0;
let b = 1;

console.log(a);
console.log(b);

for (let i = 3; i <= N; i++) {
    let c = a + b;
    console.log(c);
    a = b;
    b = c;
}

