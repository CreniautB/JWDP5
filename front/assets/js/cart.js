const inStorage = JSON.parse(localStorage.getStorage);

let totalPrice = 0

const getServer = async function (produitId) {
    try {
        let response = await fetch(`http://localhost:3000/api/teddies/${produitId}`);
        let data = await response.json();
        return data;    
    } catch (error) {
        console.error(error.message);
    }
};


console.log(inStorage)

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
        title = document.createElement("h2")
        title.innerHTML = data.name

        img = document.createElement("img")
        img.src = data.imageUrl

        quantityDom = document.createElement("p")
        quantityDom.innerHTML = quantity
        
        delElement = document.createElement("button")
        delElement.classList.add(element.id)
        delElement.innerHTML = "Suprimer l'article du panier"

        cart.appendChild(title)
        cart.appendChild(quantityDom)
        cart.appendChild(delElement)
        cart.appendChild(img)

        delElement.addEventListener("click", () => {
            const inStorage = JSON.parse(localStorage.getStorage);
            inStorage.map(teddie => {
                if (teddie.id == delElement.classList[0]) {
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
    try {
        const response = await fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new error("problem server transmission");
        };
    } catch (error) {
        console.error(error);
    }
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
        console.log(element.id)
        productiD.push(element.id)
    })

    const order = {};
    order.products = productiD;

    order.contact = contact;

    console.log(order)

    if(checkContact(contact)) {
        
        postServer(order);
        localStorage.clear()
        
    }


    


});

