import Cart from "./class/cartClass.js";
import Product from "./class/productClass.js"

// creaton du cart a partir du local storage
let cart = new Cart()

// On récupere les produit via l'api 
fetch('http://localhost:3000/api/teddies')
.then((response) => {
    return response.json()
})
.then ((data) => {

    const model = document.querySelector("#model")
    data.forEach(element => {
        // créer une objet teddy de la classe product pour chaque produit 
        let teddy = new Product(element.name, element.price, element.imageUrl, element.colors, element._id, element.description)
       
        // Afficage des produits sur la page 
        teddy.displayProductMain(model)
    });
  })


