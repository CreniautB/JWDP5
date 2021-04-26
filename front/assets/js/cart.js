import Cart from "./cartClass.js"

/** Affichage ou non du formulaire si panier vide  */

if (localStorage.article){
    let inStorage = JSON.parse(localStorage.article);
    document.querySelector("main").style.display = "block"

    /** Creation du panier via son Objet Cart */

    let cart = new Cart(inStorage)

    /** Méthodes d'affichage et de fonctionnement du panier */
    
    cart.displayTeddy()
    cart.formHandler()
}
else
{
    document.querySelector("main").style.display = "none";
    document.querySelector("#emptyCart").style.display = "block"
}
