import Cart from "./cartClass.js";
import Product from "./productClass.js"


fetch('http://localhost:3000/api/teddies')
.then((response) => {
    return response.json()
})
.then ((data) => {

    const model = document.querySelector("#model")

    data.forEach(element => {
        /** créer une objet teddy de la classe product pour chaque produit */
        let teddy = new Product(element.name, element.price, element.imageUrl, element.colors, element._id, element.description)
       
        /** Afficage des produits dans le dom */
        teddy.displayProductMain(model)
    });
  })
  .then(() => {
    let cart = new Cart()
    cart.init()

  })

