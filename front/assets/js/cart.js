const inStorage = JSON.parse(localStorage.getStorage);

if ( inStorage.length === 0 || inStorage === 'undefined')
{
    document.querySelector("main").style.display = "none";
    document.querySelector("#emptyCart").style.display = "block"
}
else
{
    document.querySelector("main").style.display = "block"
}

let totalPrice = 0
let order_id



inStorage.forEach(element => {

    let quantity = element.quantity
    let getPrice

    fetch(`http://localhost:3000/api/teddies/${element.id}`)
    .then((response) => {
        return response.json()
    })
    
    .then ((data) => {

        /** Calcul et Affichage du prix total */
        getPrice = data.price * quantity
        totalPrice += getPrice

        document.querySelector("#totalPrice").innerHTML = totalPrice + " €"

        /** Récap Panier */

        cart = document.createElement("article")
        cart.id = element.id



        img = document.createElement("img")
        img.src = data.imageUrl


        titleContainer = document.createElement("h2")
        titleContainer.innerHTML = quantity + " x " + data.name
        
        delElement = document.createElement("button")
        delElement.innerHTML = "Suprimer l'article du panier"


        cart.appendChild(titleContainer)
        cart.appendChild(img)
        cart.appendChild(delElement)

        delElement.addEventListener("click", () => {
            const inStorage = JSON.parse(localStorage.getStorage);
            inStorage.map(teddie => {
                parent = delElement.parentElement
                if (teddie.id == parent.id) {
                    const index = inStorage.indexOf(teddie);
                    if (index > -1) {
                        inStorage.splice(index, 1);
                        let newDataStorage = JSON.stringify(inStorage);
                        localStorage.setItem(`getStorage`, `${newDataStorage}`);
                        location.reload()
                    }
                }
            });
        })
        document.querySelector("#cartContent").appendChild(cart)
    })
});

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

const postServer = async (order) => {

        const response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();


        if (response.ok) {
            return data;
          
        } else {
            console.error("probelem")
        };
};


document.querySelector("#formCart").addEventListener("submit", async (event) => {

    event.preventDefault();
    let contact = {
        firstName: document.querySelector("#firstName").value.trim(),
        lastName: document.querySelector("#lastName").value.trim(),
        address: document.querySelector("#adress").value.trim(),
        city: document.querySelector("#city").value.trim(),
        email: document.querySelector("#email").value.trim()
    };
    
    let productiD = []
    id = document.querySelectorAll("article")

    id.forEach(element => {
      
        productiD.push(element.id)
    })

    const order = {};
    order.products = productiD;

    order.contact = contact;




    if(checkContact(contact)) {
        
        const sendOrder = await postServer(order);
        confirmationPage(sendOrder)

    }

});

const confirmationPage = async (order) => {


    let urlData = 'confirmation.html?'+"id="+order.orderId+"&"+"total="+totalPrice
    window.location = urlData
    localStorage.clear()
}