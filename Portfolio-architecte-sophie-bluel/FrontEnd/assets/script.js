/* création des boutons filtres*/

const btnfilterT = document.createElement("button");
btnfilterT.innerText = `Tous`;
const btnfilterO = document.createElement("button");
btnfilterO.innerText = `Objets`;
const btnfilterA = document.createElement("button");
btnfilterA.innerText = `Appartements`;
const btnfilterH = document.createElement("button");
btnfilterH.innerText = `Hotels & restaurants`

const placeMenu = document.querySelector(".placemenu");
placeMenu.appendChild(btnfilterT);
placeMenu.appendChild(btnfilterO);
placeMenu.appendChild(btnfilterA);
placeMenu.appendChild(btnfilterH);



/* affichage homepage*/
async function homePage(){
    const projet = await fetch("http://localhost:5678/api/works").then(projet=>projet.json());
    generer(projet);
}


function generer(affiche) {
    for (let i = 0; i < affiche.length; i++) {
        const creaElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = affiche[i].imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = affiche[i].title;

        creaElement.appendChild(imageElement);
        creaElement.appendChild(titreElement);

        const sectionProjet = document.querySelector(".gallery");
        sectionProjet.appendChild(creaElement);
    }
}

homePage()

/*partie boutons filtre*/

btnfilterO.addEventListener("click", async () =>{
    const projet = await fetch("http://localhost:5678/api/works").then(projet=>projet.json());
    const objet = projet.filter(function(x){
        return x.category.id ===1;
    })

    document.querySelector(".gallery").innerHTML="";

    generer(objet)

})

btnfilterA.addEventListener("click", async () =>{
    const projet = await fetch("http://localhost:5678/api/works").then(projet=>projet.json());
    const objet = projet.filter(function(x){
        return x.category.id ===2;
    })

    document.querySelector(".gallery").innerHTML="";

    generer(objet)

})
btnfilterH.addEventListener("click", async () =>{
    const projet = await fetch("http://localhost:5678/api/works").then(projet=>projet.json());
    const objet = projet.filter(function(x){
        return x.category.id ===3;
    })

    document.querySelector(".gallery").innerHTML="";

    generer(objet)

})

btnfilterT.addEventListener("click", async () =>{
    const projet = await fetch("http://localhost:5678/api/works").then(projet=>projet.json());
   
    document.querySelector(".gallery").innerHTML="";

    generer(projet)

})


/* intégration du formulaire de connexion*/


