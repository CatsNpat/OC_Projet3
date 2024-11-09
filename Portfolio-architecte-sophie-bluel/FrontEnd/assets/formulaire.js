

const connexion = document.getElementById("connexion");
connexion.addEventListener("click", async () =>{
    const email = document.getElementById("email").value;
    const mdp = document.getElementById("mdp").value;
    const messageC = document.querySelector(".messgConnecter");
    
    const reponse = await fetch("http://localhost:5678/api/users/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:`{"email": "${email}","password": "${mdp}"}`
        }).then(async function(repo){
                messageC.innerText =``;
                if(!repo.ok){
                    switch (repo.status) {
                        case 401:
                            messageC.innerText =`Il y a une erreur : mot de passe incorrect`;
                            break;
                        case 404:
                            messageC.innerText =`Il y a une erreur : identifiant incorrect`;
                            break;
                        default :
                            messageC.innerText = `Erreur inconnue`;
                            break;
                    }
                }else {
                    repo = await repo.json();
                    window.sessionStorage.setItem("token",`${repo.token}`);
                    location.assign("index.html")
                }
            });
})

