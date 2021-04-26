import Product from "./productClass.js"
import Cart from "./cartClass.js"

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
.then 
{
    let cart = new Cart()
    cart.init()

    /** Ajout de l'article dans le panier */
    
    document.getElementById('add-cart').addEventListener("click", () => {
    
        cart.addTeddy()
    })
    
}






