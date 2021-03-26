$("header").load("header.html"); 

let product_id = window.location.search.substr(4);

fetch(`http://localhost:3000/api/teddies/${product_id}`)
.then((response) => {
    return response.json()
})

.then ((data) => {

    /** Création de la page produit */
    document.querySelector("#teddyH1").innerHTML = data.name  
    document.querySelector("#teddyImg").src = data.imageUrl


    /** Ratio Couleurs Produit */
    for ( let i = 0; i < data.colors.length; i++) {

        var radio = document.createElement("input")
        var label = document.createElement("label")
        radio.type = "radio"
        radio.name = "colors"
        radio.value = data.colors[i]
        label.for = data.colors[i]
        label.innerHTML = data.colors[i]
        var parentRadio = document.createElement("div")

        parentRadio.appendChild(radio)
        parentRadio.appendChild(label)
        document.querySelector("#radioSection").appendChild(parentRadio)
    };

})



/** Enregistrement dans le Panier */
const productQuantity = () => {
    let quantity = document.getElementById('product-quantity').value;
    return quantity;
};

const storageControl = () => {
    const produitLocal = { id: product_id, quantity: productQuantity() };
    let createNewStorage = [];
    let StorageLength = localStorage.length;

    //controle si le panier n'est pas vide
    if (StorageLength !== 0 && localStorage.getStorage) {
        let inStorage = JSON.parse(localStorage.getStorage);
        let existe = false;

        //controle si le produit est deja dans le panier
        //si oui, il update simplement la quantité
        //autrement il le rajoute au panier
        inStorage.map(produit => {
            if (produit.id == product_id) {
                existe = true;
                produit.quantity = productQuantity();
            }
        });

        if (existe) {
            return JSON.stringify(inStorage);
        } else {
            inStorage.push(produitLocal);
            return JSON.stringify(inStorage);
        }

    } else {
        createNewStorage.push(produitLocal);
        return JSON.stringify(createNewStorage);
    }

};

const addCart = document.getElementById('add-cart');

addCart.addEventListener("click", () => {
    localStorage.setItem(`getStorage`, `${storageControl()}`);
    widgetQuantities();
});




