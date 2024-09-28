

async function homePage() {
const projet = await fetch("http://localhost:5678/api/works").then(projet=>projet.json());
const sectionProjet = document.querySelector(".gallery");

for (let i = 0; i < projet.length; i++) {
    const creaElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = projet[i].imageUrl;
    const titreElement = document.createElement("figcaption");
    titreElement.innerText = projet[i].title;

    creaElement.appendChild(imageElement);
    creaElement.appendChild(titreElement);

    sectionProjet.appendChild(creaElement);
}}

homePage();