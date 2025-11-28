// 1. Vérification de l'âge
function programmeAge() {
    let age = prompt("Entrez votre âge :");

    if (age === null || age === "") {
        alert("Vous devez entrer un âge !");
        return;
    }

    age = Number(age);

    if (isNaN(age)) {
        alert("Veuillez entrer un nombre valide !");
        return;
    }

    if (age < 18) {
        alert("Vous êtes mineur.");
    } else {
        alert("Vous êtes majeur.");
    }
}

// 2. Pair ou impair
function pairOuImpair() {
    let nombre = prompt("Entrez un nombre :");

    if (nombre === null || nombre === "") {
        alert("Vous devez entrer un nombre !");
        return;
    }

    nombre = Number(nombre);

    if (isNaN(nombre)) {
        alert("Veuillez entrer un nombre correct !");
        return;
    }

    if (nombre % 2 === 0) {
        alert("Le nombre est pair.");
    } else {
        alert("Le nombre est impair.");
    }
}

// 3. Afficher le mois
function afficherMois() {
    let mois = Number(prompt("Entrez le numéro du mois (1 à 12) :"));

    switch (mois) {
        case 1: alert("Janvier"); break;
        case 2: alert("Février"); break;
        case 3: alert("Mars"); break;
        case 4: alert("Avril"); break;
        case 5: alert("Mai"); break;
        case 6: alert("Juin"); break;
        case 7: alert("Juillet"); break;
        case 8: alert("Août"); break;
        case 9: alert("Septembre"); break;
        case 10: alert("Octobre"); break;
        case 11: alert("Novembre"); break;
        case 12: alert("Décembre"); break;
        default: alert("Numéro invalide ! Veuillez entrer un chiffre entre 1 et 12.");
    }
}