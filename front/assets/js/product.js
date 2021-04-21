import Product from "./productClass.js"

const productId = new URLSearchParams(window.location.search)
const product_id = productId.getAll("id")[0]
let priceOneProduct
let teddy

fetch(`http://localhost:3000/api/teddies/${product_id}`)
.then((response) => {
    return response.json()
})

.then ((data) => {

    teddy = new Product(data.name, data.price, data.imageUrl, data.colors, data._id, data.description)  
    priceOneProduct = data.price  
    teddy.displayProduct()
})



const storageControl = () => {
    try {
        const produitLocal = { id: product_id, quantity: productQuantity() };
        let createNewStorage = [];
        let StorageLength = localStorage.length;

        /** controle si le panier n'est pas vide */
        if (StorageLength !== 0 && localStorage.article) {
            let inStorage = JSON.parse(localStorage.article);
            let existe = false;

            /** si l'article n'est pas présent dans le panier il l'ajoute */

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
    } catch (error)  {
        errordisplayed();
    }

};

/** Enregistrement dans le Panier */
const productQuantity = () => {
    try {
        let quantity = document.getElementById('product-quantity').value;
        return quantity;
    } catch (error)  {
        let msg = "probleme de "
        errordisplayed(msg);
    }
};

/** Changement du prix en fonction de la quantité d'article */

document.querySelector("#product-quantity").addEventListener('change', (event) => 
{
    let num = document.querySelector("#product-quantity").value
    document.querySelector("#price").innerHTML = priceOneProduct * num + " €"

})

const addCart = document.getElementById('add-cart');

/** Ajout de l'article dans le panier */

addCart.addEventListener("click", () => {
    localStorage.setItem(`article`, `${storageControl()}`);
    widgetQuantities();
});

