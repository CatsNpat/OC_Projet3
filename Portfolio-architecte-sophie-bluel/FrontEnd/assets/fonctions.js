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


/*création modale*/


async function sde () {
    const pModal = await fetch("http://localhost:5678/api/works").then(pModal=>pModal.json());
    genModal (pModal)
}

function genModal(affiche) {
    for (let i = 0; i < affiche.length; i++) {
        const imageElement = document.createElement("img");
        imageElement.src = affiche[i].imageUrl;
        imageElement.classList.add ("taillePhotoModal");

        const boiteImage = document.createElement("div");
        const lienSuppr = document.createElement("a");
        lienSuppr.href = "javaScript:void(0)";
        lienSuppr.id = "lienSupression_"+ affiche[i].id;
        lienSuppr.addEventListener("click", () => deletePhoto(affiche[i].id));

        const icontrash = document.createElement("i");
        icontrash.classList.add("fa-regular");
        icontrash.classList.add("fa-trash-can");
        icontrash.id = "iconetrash";
        lienSuppr.appendChild(icontrash);
        boiteImage.appendChild(lienSuppr);
        boiteImage.appendChild(imageElement);
       
        photosModal.appendChild(boiteImage);
    }
}

async function deletePhoto (id) {
    const thd = await fetch ("http://localhost:5678/api/works/"+ id,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Logue}`
        }
        })
    photosModal.innerHTML ="";
    sde();
    document.querySelector(".gallery").innerHTML="";
    homePage();
}


function CreaModal() {
    const gju = document.querySelector (".contenuModal");

    const titreModal = document.createElement("h2");
    titreModal.innerText = `Galerie photos`

    const fermeCroix = document.createElement ("button");
    fermeCroix.innerText = `X`;

    const photosModal = document.createElement("div");
    photosModal.id ="photosModal";

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
        location.assign("index.html");
    })
}