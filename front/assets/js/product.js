import Product from "./productClass.js"

const productId = new URLSearchParams(window.location.search)
const product_id = productId.getAll("id")[0]


fetch(`http://localhost:3000/api/teddies/${product_id}`)
.then((response) => {
    return response.json()
})

.then ((data) => {

    let teddy = new Product(data.name, data.price, data.imageUrl, data.colors, data._id, data.description)  
    let priceOneProduct = data.price  
    teddy.displayProduct()
    teddy.priceUpdate(priceOneProduct)
})



const productQuantity = () => {
    try {
        let quantity = document.getElementById('product-quantity').value;
        return quantity;
    } catch (error)  {
        errordisplayed();
    }
};

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


/** Ajout de l'article dans le panier */

document.getElementById('add-cart').addEventListener("click", () => {
    localStorage.setItem(`article`, `${storageControl()}`);
    widgetQuantities();
})




