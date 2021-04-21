import Cart from "./cartClass.js"

/** Affichage ou non du formulaire si panier vide  */
let totalPrice = 0

if ( localStorage.length === 0 || localStorage === 'undefined'){
    document.querySelector("main").style.display = "none";
    document.querySelector("#emptyCart").style.display = "block"
}
else{
    let inStorage = JSON.parse(localStorage.article);
    document.querySelector("main").style.display = "block"


    /** récuperation des données pour la commande */
    inStorage.forEach(element => {
  
        let quantity = element.quantity
        let teddys = []

        fetch(`http://localhost:3000/api/teddies/${element.id}`)
        .then((response) => {
            return response.json()
        })

        /** Création de la page Cart via les données ci dessus  */

        .then ((data) => {

            let price = parseInt(element.quantity) * data.price 
            totalPrice = totalPrice + price
            teddys.push(data)
            data.quantity = quantity

            let cart = new Cart(teddys)         
            cart.displayTeddy()

        })
        .then (() => {
            document.querySelector("#totalPrice").innerHTML = "Total de la commance : " + totalPrice + " €"
        })
    });

}



/** Envoie le commande au server */

const postServer = async (order) => {
    try  {
        const response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error("erorr, post server")
        }
    }
    catch (error)  {
        errordisplayed();
    }
};


/** Récupération et vérification du formulaire et envoie de commande si Ok */

document.querySelector("#formCart").addEventListener("submit", async (event) => {

    try {
        event.preventDefault();
        let contact = {
            firstName: document.querySelector("#firstName").value.trim(),
            lastName: document.querySelector("#lastName").value.trim(),
            address: document.querySelector("#adress").value.trim(),
            city: document.querySelector("#city").value.trim(),
            email: document.querySelector("#email").value.trim()
        };
        
        let productiD = []
        let id = document.querySelectorAll("article")

        id.forEach(element => {
        
            productiD.push(element.id)
        })

        const order = {};
        order.products = productiD;
        order.contact = contact;

 

        /** Vérifie le formulaire via F => checkcontact */
        if(checkContact(contact)) {
            const sendOrder = await postServer(order);
            confirmationPage(sendOrder)
        }


    } catch (error)  {
        errordisplayed();
    }
});



/** Chargement de la page de confirmation si la commande est Ok */

const confirmationPage = async (order) => {
    try {
        let urlData = 'confirmation.html?'+"id="+order.orderId+"&"+"total="+totalPrice
        window.location = urlData
        localStorage.clear()
        } catch (error)  {
        errordisplayed();
    }
}

/** F vérification des valeurs de contact via regex */

function checkContact(contact){

    const expName = /^(([a-zA-ZÀ-Ýà-ï]+)(-| )?){1,2}[a-zA-ZÀ-Ýà-ï]+$/;
    const expAdress = /^([\wÀ-Ýà-ï]+ ?)+[\wÀ-Ýà-ï]$/;
    const expEmail = /^[\w](([_\.\-]?[\w]+)*)@([\w]+)(([_\.\-]?[\w]+)*)\.([\w]{2,})$/

    if (!expName.test(contact.firstName)){
        alert("le prénom n'est pas valide")
        return false
    }
    if (!expName.test(contact.lastName)){
        alert("le nom n'est pas valide")
        return false
    }
    if(!expAdress.test(contact.address)){
        alert("l'adresse n'est pas valide")
        return false
    }
    if(!expName.test(contact.city)){
        alert("la ville n'est pas valide")
        return false
    }
    if(!expEmail.test(contact.email)){
        alert("l'email n'est pas valide")
        return false
    }
    else{
        return true
    }

}
