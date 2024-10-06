/* intégration du formulaire de connexion*/

const connexion = document.getElementById("connexion");
connexion.addEventListener("click", async () =>{
    const email = document.getElementById("email").value;
    const mdp = document.getElementById("mdp").value;
    const messageC = document.querySelector(".messgConnecter");
    const reponse = await fetch("http://localhost:5678/api/users/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:`{"email": "${email}","password": "${mdp}"}`
        }).then(reponse=>reponse.json());

    messageC.innerText =``;
    
    if (reponse.message){
        messageC.innerText =`Il y a une erreur : ${reponse.message}`;
    } else {
        window.sessionStorage.setItem("token",`${reponse.token}`);
        location.assign("index.html")
    }
})

