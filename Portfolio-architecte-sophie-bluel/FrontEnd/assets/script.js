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
    homePage();
})
