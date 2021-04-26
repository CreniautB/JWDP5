import Cart from "./cartClass.js"

/** Affichage ou non du formulaire si panier vide  */

if (localStorage.article){
    let inStorage = JSON.parse(localStorage.article);
    document.querySelector("main").style.display = "block"

    /** Creation du panier via son Objet Cart */

    let cart = new Cart(inStorage)
    cart.init()

    // affichage du résumer des produits
    cart.displayTeddy()

    // Gestion du formulaire et de l'envoi des données au server
    cart.formHandler()
}
else
{
    document.querySelector("main").style.display = "none";
    document.querySelector("#emptyCart").style.display = "block"
}
