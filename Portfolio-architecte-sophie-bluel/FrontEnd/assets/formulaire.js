

const connexion = document.getElementById("connexion");
connexion.addEventListener("click", async () =>{
    const email = document.getElementById("email").value;
    const mdp = document.getElementById("mdp").value;
    const messageC = document.querySelector(".messgConnecter");
    
    if (!email.trim()){
        messageC.innerText = `Veuillez renseigner un email`;
    
    }else{
        if(!mdp){
            messageC.innerText = `Veuillez saisir un mot de passe`;
        }else{
            const reponse = await fetch("http://localhost:5678/api/users/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:`{"email": "${email}","password": "${mdp}"}`
                }).then(async function(repo){
                        messageC.innerText =``;
                        if(!repo.ok){
                            switch (repo.status) {
                                case 401:
                                    messageC.innerText =`Il y a une erreur : identifiant ou mot de passe incorrect`;
                                    break;
                                case 404:
                                    messageC.innerText =`Il y a une erreur : identifiant ou mot de passe incorrect`;
                                    break;
                                default :
                                    messageC.innerText = `Erreur inconnue`;
                                    break;
                            }
                        }else {
                            repo = await repo.json();
                            window.sessionStorage.setItem("token",`${repo.token}`); /* permet de stocker la clé dans le sessionStorage*/
                            location.assign("index.html")
                        }
                    });
        }
    }

})

/*modifs une fois connectée, script.js, ligne 69.*/

