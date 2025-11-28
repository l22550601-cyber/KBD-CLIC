let premier_paragraphe = document.querySelector("#premier_paragraphe")

let premier_button = document.querySelector("#verifie")

premier_button.addEventListener("click", ()=>{
    let ageUtilisateur = prompt("veuillez saisir votre âge")

    if (ageUtilisateur == null) {
        premier_paragraphe.innerText = "vous avez annulé votre votre demande";
        premier_paragraphe.style.Color = "red";

        return
    }
    if (ageUtilisateur == "") {
        premier_paragraphe.innerText = " veuillez renseigner ce champ";
        premier_paragraphe.style.Color = "orange";
        return
    }

    if (parseInt(ageUtilisateur) < 18) {

    } else {

    }
    premier_paragraphe.innerText = V ;
    premier_paragraphe.style.Color = "orange"

})


















