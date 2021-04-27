import Product from "./productClass.js"
import Cart from "./cartClass.js"

// Récupération de l'id du produit via l'url puis Fecth de celui ci 
const productId = new URLSearchParams(window.location.search)
const product_id = productId.getAll("id")[0]

fetch(`http://localhost:3000/api/teddiproduct_id}`)
.then((response) => {
    return response.json()
})

.then ((data) => {

    // creation du produit via la classe Product
    let teddy = new Product(data.name, data.price, data.imageUrl, data.colors, data._id, data.description)  
    let priceOneProduct = data.price
    
    // Méthode d'affichage
    teddy.displayProduct()
    // Ajout d'un event listener sur le prix affiché en rapport avec la quantité 
    teddy.priceUpdate(priceOneProduct)
})
.then (() =>{

    // creation de du cart via la classe cart
    let cart = new Cart()
    
    /** Ajout de l'article dans le panier */
    
    document.getElementById('add-cart').addEventListener("click", () => {
    
        cart.addTeddy()
    })
}).catch((error) => {
    errordisplayed(error)
})






