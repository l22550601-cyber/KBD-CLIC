let age = parseInt(prompt("Entrez votre âge :"));

if (age < 18) {
    console.log("Vous êtes mineur.");
} else {
    console.log("Vous êtes majeur.");
}


let nombre = parseInt(prompt("Entrez un nombre :"));

if (nombre % 2 === 0) {
    console.log("Le nombre est pair.");
} else {
    console.log("Le nombre est impair.");
}


let mois = parseInt(prompt("Entrez un numéro de mois (1 à 12) :"));

switch (mois) {
    case 1: console.log("Janvier"); break;
    case 2: console.log("Février"); break;
    case 3: console.log("Mars"); break;
    case 4: console.log("Avril"); break;
    case 5: console.log("Mai"); break;
    case 6: console.log("Juin"); break;
    case 7: console.log("Juillet"); break;
    case 8: console.log("Août"); break;
    case 9: console.log("Septembre"); break;
    case 10: console.log("Octobre"); break;
    case 11: console.log("Novembre"); break;
    case 12: console.log("Décembre"); break;
    default: console.log("Numéro invalide !");
}