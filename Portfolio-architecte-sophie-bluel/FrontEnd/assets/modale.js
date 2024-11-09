/*création de la galerie photo de la modale*/


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
              rgu.innerText = `Erreur: ${reponse.status}`;
            }
          });
    photosModal.removeChild(document.getElementById("boiteImage_"+ id));
    document.querySelector(".gallery").removeChild(document.getElementById("creaElement_"+ id));

}

/*création de la partie Ajout photo de la modale*/

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
    fermeCroix.classList.add("fa-solid");
    fermeCroix.classList.add("fa-xmark");

    const retourArriere = document.createElement ("button");
    retourArriere.classList.add("retourArriere");
    retourArriere.classList.add("fa-solid");
    retourArriere.classList.add("fa-arrow-left");
    
    titreModalPhoto.appendChild(fermeCroix);
    titreModalPhoto.appendChild(retourArriere);

    hki.appendChild(titreModalPhoto);

    const formA = document.createElement ("section");
    formA.id = "formA";
    const contenuForm = document.createElement ("form");
    contenuForm.action = "javaScript:void(0)";

    const boitePhotoPlus = document.createElement("div");
    boitePhotoPlus.classList.add("boitePhotoPlus");

   const iconeBoitePhotoPlus = document.createElement("i");
   iconeBoitePhotoPlus.classList.add("fa-regular");
   iconeBoitePhotoPlus.classList.add("fa-image");
   iconeBoitePhotoPlus.id = "iconeBoitePhotoPlus";

   const labelPhotoPlus = document.createElement ("label");
   labelPhotoPlus.for = "photoPlus";
   labelPhotoPlus.innerText = `+ Ajouter photo`;
   labelPhotoPlus.id = "labelPhotoPlus";

    const photoPlus = document.createElement ("input");
    photoPlus.type = "file";
    photoPlus.id = "photoPlus";
    photoPlus.innerText = ``;
    photoPlus.accept = "image/png, image/jpeg";

    const plouet = document.createElement("img");
    plouet.classList.add("plouet");
    plouet.style.display ="none";
    boitePhotoPlus.appendChild(plouet);

    const Precision = document.createElement("p");
    Precision.innerText = `jpg, png : 4mo max.`;
    Precision.classList.add("Precision");
    
    labelPhotoPlus.appendChild(photoPlus);
    boitePhotoPlus.appendChild(iconeBoitePhotoPlus);
    boitePhotoPlus.appendChild(labelPhotoPlus);
    boitePhotoPlus.appendChild(Precision);

    const labelTitre = document.createElement ("label");
    labelTitre.for = "text";
    labelTitre.innerText = `Titre`;
    labelTitre.classList.add("pouet");

    const titreForm = document.createElement ("input");
    titreForm.type = "text";
    titreForm.name = "text";
    titreForm.id = "text";
    titreForm.classList.add("pouetD");

    const labelCategorie = document.createElement ("label");
    labelCategorie.for = "categorie";
    labelCategorie.innerText = `Catégorie`;
    labelCategorie.classList.add("pouet");

    const Categorie = document.createElement ("select");
    Categorie.name = "categorie";
    Categorie.id = "categorie";
    Categorie.classList.add("pouetD");

    const CategorieUne = document.createElement ("option");
    CategorieUne.innerText = "";
    CategorieUne.classList.add("pouetD");
    CategorieUne.attributes = "selected";


    cat(Categorie);

    const boiteB = document.createElement("div");
    boiteB.classList.add("boiteB");
    const buttonValider = document.createElement ("input");
    buttonValider.type = "submit";
    buttonValider.value = `Valider`;
    buttonValider.id = "buttonValider";

    boiteB.appendChild(buttonValider);

    contenuForm.appendChild(boitePhotoPlus);
    labelTitre.appendChild(titreForm);
    contenuForm.appendChild(labelTitre);
    Categorie.appendChild(CategorieUne);
    labelCategorie.appendChild(Categorie);
    contenuForm.appendChild(labelCategorie);
    contenuForm.appendChild(boiteB);
    formA.appendChild(contenuForm);

    hki.appendChild(formA);

    const messFaux = document.createElement("p");
    messFaux.id = "messFaux";
    hki.appendChild(messFaux);

    photoPlus.addEventListener("change", () =>{
        plouet.src = URL.createObjectURL(photoPlus.files[0]);
        plouet.style.display ="flex";
        iconeBoitePhotoPlus.style.display = "none";
        labelPhotoPlus.style.display = "none";
        Precision.style.display = "none";
        buttonValider.style.backgroundColor = "#1D6154";


    })


    const ajout = document.getElementById("buttonValider");
    ajout.addEventListener("click",async (event) => {
        event.preventDefault();
        const moi = document.getElementById("messFaux");
            moi.innerText = "";
            moi.classList.add("messgConnecter");
        const imagePlus = document.getElementById("photoPlus");
        const imageTitre = document.getElementById("text").value;
        const imageCategorie = document.getElementById("categorie").value;

        const formData = new FormData ();
        formData.append("image",imagePlus.files[0]);
        formData.append("title", imageTitre);
        formData.append("category", imageCategorie);

        if ((imagePlus.files[0].type !== "image/jpeg" && imagePlus.files[0].type !== "image/png") || imagePlus.files[0].size > 4000000) {
            moi.innerText = `Erreur : format d'image invalide / la taille de l'image est supérieure à 4Mo`;
        }else{
            if(!titreForm.value){
                moi.innerText = `Erreur : il manque un titre`;
            }else{
                if(CategorieUne.selected){
                    moi.innerText = `Erreur : il faut choisir une catégorie`; 
                }else{
                    const reponse = await fetch ("http://localhost:5678/api/works",{
                        method:"POST",
                        headers:{"Authorization": `Bearer ${Logue}`},
                        body: formData
                        }).then( async function(repRep){
                            if(!repRep.ok){
                                switch (repRep.status) {
                                    case 400:
                                        moi.innerText = `Erreur : un des champs est manquant ou invalide`;
                                        break;
                                    case 401:
                                        moi.innerText = `Erreur : utilisateur non autorisé`;
                                        break;
                                    case 500:
                                        moi.innerText = `Erreur innatendue`;
                                        break;
                                    default :
                                        moi.innerText = `Erreur inconnue`;
                                        break;
                                }
                                
                            }else{
                                const mld = document.querySelector("#modal");
                                mld.style.display = "none";
                                hki.innerHTML ="";
                                const photoJson = await repRep.json();
                                const creaElement = document.createElement("figure");
                                creaElement.id = "creaElement_"+ photoJson.id;
                                const imageElement = document.createElement("img");
                                imageElement.src = photoJson.imageUrl;
                                const titreElement = document.createElement("figcaption");
                                titreElement.innerText = photoJson.title;
                    
                                creaElement.appendChild(imageElement);
                                creaElement.appendChild(titreElement);
                    
                                document.querySelector(".gallery").appendChild(creaElement);
                            }
                        });
                }
            }
        }

    });


    fermeCroix.addEventListener("click",() => {
        const mld = document.querySelector("#modal");
        mld.style.display = "none";
        hki.innerHTML ="";
    })
    
    retourArriere.addEventListener("click", () =>{
        hki.innerHTML="";
        CreaModal()
    })


}

/*création de la modale*/

function CreaModal() {
    const gju = document.querySelector (".contenuModal");

    const titreModal = document.createElement("h3");
    titreModal.innerText = `Galerie photos`;
    titreModal.classList.add("titreModal");

    const fermeCroix = document.createElement ("button");
    fermeCroix.classList.add("fermeCroix");
    fermeCroix.classList.add("fa-solid");
    fermeCroix.classList.add("fa-xmark");

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
    })

    document.getElementById("modal").addEventListener("click",(event) => {
        if (event.target === document.getElementById("modal")){
        const mld = document.querySelector("#modal");
        mld.style.display = "none";
        gju.innerHTML ="";
    }})

    document.querySelector(".ajoutPhotoModal").addEventListener("click",() => {
        gju.innerHTML = "";
        modalAjoutPhoto();

    })
}