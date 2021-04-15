/** Changement du prix en fonction de la quantité d'article */

document.querySelector("#product-quantity").addEventListener('change', (event) => 
{
    let num = document.querySelector("#product-quantity").value
    document.querySelector("#price").innerHTML = teddyPrice * num + " €"

})

const addCart = document.getElementById('add-cart');

/** Ajout de l'article dans le panier */

addCart.addEventListener("click", () => {
    localStorage.setItem(`article`, `${storageControl()}`);
    widgetQuantities();
});

