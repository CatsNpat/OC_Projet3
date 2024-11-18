
boutonFiltre() /* fonction présente dans fonctions.js, ligne 29, permet d'afficher les boutons filtres*/
homePage() /*fonction présente dans la partie fonctions.js, permet d'afficher la page d'accueil*/


/*login-logout*/

let Logue = window.sessionStorage.getItem(`token`);

if (Logue != null){
    document.querySelector(".login").innerText = `logout`;
    document.querySelector(".placemenu").style.visibility = "hidden";
    Modifier(); /* fonction présente dans fonctions.js, ligne 29, permet d'afficher le bouton modifier*/

    document.getElementById("btnModifier").addEventListener("click", ()=> {
        const mld = document.querySelector("#modal");
        mld.style.display = null;
        CreaModal(); /* fonction présente dans modale.js, ligne 279, permet d'afficher la modale*/
     })

}

document.querySelector(".login").addEventListener("click", ()=>{
    if (Logue != null){
        window.sessionStorage.removeItem(`token`);
        Logue = null;
        location.assign("index.html");

}})
