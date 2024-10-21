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

/* suppression d'une photo*/

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


async function cat (Categorie) {
    const cCategorie = await fetch("http://localhost:5678/api/categories").then(cCategorie=>cCategorie.json());
    for (let i = 0; i < cCategorie.length; i++) {
        const Choix = document.createElement("option");
        Choix.value = cCategorie[i].id;
        Choix.innerText = `${cCategorie[i].name}`;

        Categorie.appendChild(Choix);
    }
}

function modalAjoutPhoto() {
    const hki = document.querySelector (".contenuModal");

    const titreModalPhoto = document.createElement("h3");
    titreModalPhoto.innerText = `Ajout photo`;
    titreModalPhoto.classList.add("titreModal");

    const fermeCroix = document.createElement ("button");
    fermeCroix.classList.add("fermeCroix");
    fermeCroix.innerText = `X`;

    const retourArriere = document.createElement ("button");
    retourArriere.classList.add("retourArriere");
    retourArriere.innerText = `<-`;
    
    titreModalPhoto.appendChild(fermeCroix);
    titreModalPhoto.appendChild(retourArriere);

    hki.appendChild(titreModalPhoto);

    const formA = document.createElement ("section");
    formA.id = "formA";
    const contenuForm = document.createElement ("form");
    contenuForm.method = "";
    contenuForm.action = "";

    const photoPlus = document.createElement ("input");
    photoPlus.type = "file";

    const labelTitre = document.createElement ("label");
    labelTitre.for = "text";
    labelTitre.innerText = `Titre`;

    const titreForm = document.createElement ("input");
    titreForm.type = "text";
    titreForm.name = "text";
    titreForm.id = "text";

    const labelCategorie = document.createElement ("label");
    labelCategorie.for = "categorie";
    labelCategorie.innerText = `Catégorie`;

    const Categorie = document.createElement ("select");
    Categorie.name = "categorie";
    Categorie.id = "categorie";


    cat(Categorie);

    const boiteB = document.createElement("div");
    boiteB.classList.add ="boiteB";
    const buttonValider = document.createElement ("input");
    buttonValider.type = "submit";
    buttonValider.value = `Valider`;

    boiteB.appendChild(buttonValider);

    contenuForm.appendChild(photoPlus);
    labelTitre.appendChild(titreForm);
    contenuForm.appendChild(labelTitre);
    labelCategorie.appendChild(Categorie);
    contenuForm.appendChild(labelCategorie);
    contenuForm.appendChild(boiteB);
    formA.appendChild(contenuForm);

    hki.appendChild(formA);
    
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

    document.getElementById("modal").addEventListener("click",(event) => {
        if (event.target === document.getElementById("modal")){
        const mld = document.querySelector("#modal");
        mld.style.display = "none";
        gju.innerHTML ="";
        location.assign("index.html");
    }})

    document.querySelector(".ajoutPhotoModal").addEventListener("click",() => {
        gju.innerHTML = "";
        modalAjoutPhoto();

    })
}