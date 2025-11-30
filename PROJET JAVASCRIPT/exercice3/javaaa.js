function estPremier(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

for (let i = 1; i <= 100; i++) {
    if (estPremier(i)) {
        console.log(i);
    }
}


let n = parseInt(prompt("Entrez un nombre :"));
console.log("Facteurs de " + n + " :");

for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
        console.log(i);
    }
}


let total = 0;
let count = 0;
let num;

do {
    num = parseFloat(prompt("Entrez un nombre positif (négatif pour arrêter) :"));
    
    if (num >= 0) {
        total += num;
        count++;
    }

} while (num >= 0);

if (count > 0) {
    console.log("La moyenne est : " + (total / count));
} else {
    console.log("Aucun nombre positif saisi.");
}

let h = parseInt(prompt("Entrez la hauteur du triangle :"));

let ligne = "";
for (let i = 1; i <= h; i++) {
    ligne += "*";
    console.log(ligne);
}