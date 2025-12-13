const contacts = [
    { nom: "Bernard", prenom: "Pierre", email: "pierre.bernard@email.com", tel: "0609101112" },
    { nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com", tel: "0601020304", autres: 1 },
    { nom: "Martin", prenom: "Marie", email: "marie.martin@email.com", tel: "0605060708" },
    { nom: "SALFIOU", prenom: "AMIN", email: "-", tel: "987458547" }
];

function afficherContacts(list) {
    const tbody = document.getElementById("contactList");
    tbody.innerHTML = "";

    list.forEach(c => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${c.nom}</td>
            <td>${c.prenom}</td>
            <td>${c.email}</td>
            <td>${c.tel} ${c.autres ? <span class="tag">(+${c.autres})</span> : ""}</td>
            <td>
                <span class="tag blue">Voir</span>
                <span class="tag yellow">Modifier</span>
                <span class="tag red">Supprimer</span>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("total").textContent = list.length;
}

function searchContact(){
    const search = document.getElementById("searchInput").value.toLowerCase();
    const filtered = contacts.filter(c => 
        c.nom.toLowerCase().includes(search) ||
        c.prenom.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search)
    );
    afficherContacts(filtered);
}

// Affichage initial
afficherContacts(contacts);