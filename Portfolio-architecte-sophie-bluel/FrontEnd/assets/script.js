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


/*bouton modifier*/


function Modifier (){
    const placeModif = document.querySelector(".titrePortfolio");

    if (Logue != null){
        const iconBtnModif = document.createElement("i");
        iconBtnModif.classList.add("fa-solid");
        iconBtnModif.classList.add("fa-pen-to-square");
        iconBtnModif.id = "iconeBtnModif";
        placeModif.appendChild(iconBtnModif);

        const btnModifier = document.createElement("a");
        btnModifier.innerText = `Modifier`;
        btnModifier.href = "#modal";
        btnModifier.id = "btnModifier";
        placeModif.appendChild(btnModifier);
    } else {
        try {
            placeModif.removeChild(document.getElementById ("iconeBtnModif"));
            placeModif.removeChild(document.getElementById ("btnModifier"));
        } catch {}
        
    }

}

/*login-logout*/

let Logue = window.sessionStorage.getItem(`token`);

if (Logue != null){
    document.querySelector(".login").innerText = `logout`;
    document.querySelector(".placemenu").style.visibility = "hidden";
    Modifier();

    document.getElementById("btnModifier").addEventListener("click", ()=> {
        const mld = document.querySelector("#modal");
        mld.style.display = null;
        CreaModal();
     })

}
    
document.querySelector(".login").addEventListener("click", ()=>{
    window.sessionStorage.removeItem(`token`);
    Logue = null;
    document.querySelector(".login").innerHTML = `<a href="formulaire.html">login</a>`;
    document.querySelector(".placemenu").style.visibility = "visible";
    Modifier();
})


/*création modale*/


function CreaModal() {
    const gju = document.querySelector (".contenuModal");

    const titreModal = document.createElement("h2");
    titreModal.innerText = `Galerie photos`

    const fermeCroix = document.createElement ("button");
    fermeCroix.innerText = `X`;

    const photosModal = document.createElement("div");

    async function sde () {
        const pModal = await fetch("http://localhost:5678/api/works").then(pModal=>pModal.json());
        genModal (pModal)
    }
    
    function genModal(affiche) {
        for (let i = 0; i < affiche.length; i++) {
            const imageElement = document.createElement("img");
            imageElement.src = affiche[i].imageUrl;
            imageElement.classList.add ("taillePhotoModal");

            const icontrash = document.createElement("i");
            icontrash.classList.add("fa-regular");
            icontrash.classList.add("fa-trash-can");
            icontrash.id = "iconetrash";
            imageElement.appendChild(icontrash);
           
            photosModal.appendChild(imageElement);
        }
    }

    sde()

    const ajoutPhoto = document.createElement("button");
    ajoutPhoto.innerText = `Ajouter une photo`;
    ajoutPhoto.classList.add("ajoutPhotoModal");

    gju.appendChild(titreModal);
    gju.appendChild(fermeCroix);
    gju.appendChild(photosModal);
    gju.appendChild(ajoutPhoto);

    fermeCroix.addEventListener("click",() => {
        const mld = document.querySelector("#modal");
        mld.style.display = "none";
        gju.innerHTML ="";

    })

}


