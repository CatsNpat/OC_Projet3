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
        creaElement.setAttribute ("data-id", affiche[i].categoryId);
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

/*boutons filtres*/

async function boutonFiltre(){
    const categorie = await fetch("http://localhost:5678/api/categories").then(categorie=>categorie.json());
    genererbtnfiltre(categorie);
    
    const choixfiltre = document.querySelectorAll(".placemenu button");
    for (let j=0; j<choixfiltre.length; j++){
        choixfiltre[j].addEventListener("click",() =>{
            const imagesProjet = document.querySelectorAll(".gallery figure");
            for (let i=0; i<imagesProjet.length; i++){
                const categorid = imagesProjet[i].getAttribute("data-id");
                if (categorid === choixfiltre[j].id || choixfiltre[j].id === "0"){
                    imagesProjet[i].style.display = "block";
                }else {
                    imagesProjet[i].style.display = "none";
                }
            }

            CouleurBouton(choixfiltre[j]) /* fonction présente dans fonctions.js, ligne 52, permet de colorer les boutons filtres en fonction du choix*/
        })
    }
}


/*Fonction bouton couleur filtre*/
function CouleurBouton (pressbouton) {
    const Boutons = document.querySelectorAll("button");
    for (let i=0; i<Boutons.length; i++){
        if (Boutons[i].innerText === pressbouton.innerText){
            Boutons[i].style.backgroundColor = "#1D6154";
            Boutons[i].style.color = "#FFFFFF";
        }else{
            Boutons[i].style.backgroundColor = "#FFFFFF";
            Boutons[i].style.color = "#1D6154";
        }
    }
}



function genererbtnfiltre(affiche) {
    document.querySelector(".placemenu").innerHTML="";
    const btnfilterT = document.createElement("button");
    btnfilterT.innerText = `Tous`;
    btnfilterT.id = 0;
    btnfilterT.style.backgroundColor = "#1D6154";
    btnfilterT.style.color = "#FFFFFF";
    document.querySelector(".placemenu").appendChild(btnfilterT);

    for (let i = 0; i < affiche.length; i++) {
        const creaElement = document.createElement("button");
        creaElement.id = affiche[i].id;
        creaElement.innerText = affiche[i].name;

        const sectionProjet = document.querySelector(".placemenu");
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
