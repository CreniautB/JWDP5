export default class Cart {
    constructor (teddyInCart)
    {
        this.teddyInCart = teddyInCart
    }

    /** Affichage du récapitulatif dans le panier */

    displayTeddy() {
        this.teddyInCart.forEach(teddy => {

            /** Récap Panier */

            let cart = document.createElement("article")
            cart.id = teddy._id

            let img = document.createElement("img")
            img.src = teddy.imageUrl

            let titleContainer = document.createElement("h2")
            titleContainer.innerHTML =  teddy.quantity + " x " + teddy.name
            
            let delElement = document.createElement("button")
            delElement.innerHTML = "Suprimer l'article du panier"

            delElement.addEventListener("click", () => { this.delProduit() })

            cart.appendChild(titleContainer)
            cart.appendChild(img)
            cart.appendChild(delElement)
            document.querySelector("#cartContent").appendChild(cart)
        })
    }

    /** Métode de supression d'un produit */

    delProduit() {

         const inStorage = JSON.parse(localStorage.article);
                inStorage.forEach(teddie => {
                    
                    if (teddie.id == this.teddyInCart[0]._id) {
                        const index = inStorage.indexOf(teddie);
                        if (index > -1) {
                            inStorage.splice(index, 1);
                            let newDataStorage = JSON.stringify(inStorage);
                            localStorage.setItem(`article`, `${newDataStorage}`);

                            if (localStorage.article == "[]"){
                                localStorage.clear()
                            }
                            location.reload()
                        }
                    }
                 }
            )
         }
}
