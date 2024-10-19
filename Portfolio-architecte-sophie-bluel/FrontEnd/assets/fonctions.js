/* affichage homepage*/
async function homePage(){
    const projet = await fetch("http://localhost:5678/api/works").then(projet=>projet.json());
    generer(projet);
}


function generer(affiche) {
    document.querySelector(".gallery").innerHTML="";
    for (let i = 0; i < affiche.length; i++) {
        const creaElement = document.createElement("figure");
        creaElement.id = "creaElement_"+ affiche[i].id;
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
       
        const btnModifier = document.createElement("a");
        btnModifier.href = "#modal";
        btnModifier.id = "btnModifier";

        const iconBtnModif = document.createElement("i");
        iconBtnModif.classList.add("fa-solid");
        iconBtnModif.classList.add("fa-pen-to-square");
        iconBtnModif.id = "iconeBtnModif";

        const nomBtnModif = document.createElement("p");
        nomBtnModif.innerHTML = `&nbsp;modifier`;
        nomBtnModif.id = "nomBtnModif";

        btnModifier.appendChild(iconBtnModif);
        btnModifier.appendChild(nomBtnModif);
        placeModif.appendChild(btnModifier);

    } else {
        try {
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
        boiteImage.id = "boiteImage_"+ affiche[i].id;
        const lienSuppr = document.createElement("button");
        lienSuppr.classList.add("boiteSuppr");
        lienSuppr.addEventListener("click", () => deletePhoto(affiche[i].id));

        const icontrash = document.createElement("i");
        icontrash.classList.add("fa-solid");
        icontrash.classList.add("fa-trash-can");
        icontrash.id = "iconetrash";
        lienSuppr.appendChild(icontrash);
        boiteImage.appendChild(lienSuppr);
        boiteImage.appendChild(imageElement);
       
        photosModal.appendChild(boiteImage);


    }
}

async function deletePhoto (id) {
    const rgu = document.getElementById("reponFaux");
    rgu.innerText = "";

    const thd = await fetch ("http://localhost:5678/api/works/"+ id,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Logue}`
        }
        }).then(function (reponse) {
            if (!reponse.ok) {
              rgu.innerText = `erreur HTTP! statut: ${reponse.status}`;
            }
          });
    photosModal.removeChild(document.getElementById("boiteImage_"+ id));
    document.querySelector(".gallery").removeChild(document.getElementById("creaElement_"+ id));

}


function CreaModal() {
    const gju = document.querySelector (".contenuModal");

    const titreModal = document.createElement("h3");
    titreModal.innerText = `Galerie photos`;
    titreModal.classList.add("titreModal");

    const fermeCroix = document.createElement ("button");
    fermeCroix.classList.add("fermeCroix");
    fermeCroix.innerText = `X`;

    const photosModal = document.createElement("div");
    photosModal.id ="photosModal";

    titreModal.appendChild(fermeCroix);

    sde()

    const boiteAjoutPhoto = document.createElement("div");
    boiteAjoutPhoto.classList.add("boiteAjoutPhoto");

    const ajoutPhoto = document.createElement("button");
    ajoutPhoto.innerText = `Ajouter une photo`;
    ajoutPhoto.classList.add("ajoutPhotoModal");

    boiteAjoutPhoto.appendChild(ajoutPhoto);

    gju.appendChild(titreModal);
    gju.appendChild(photosModal);
    gju.appendChild(boiteAjoutPhoto);

    const reponFaux = document.createElement("p");
    reponFaux.id = "reponFaux";
    gju.appendChild(reponFaux);

    fermeCroix.addEventListener("click",() => {
        const mld = document.querySelector("#modal");
        mld.style.display = "none";
        gju.innerHTML ="";
        location.assign("index.html");
    })
}