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