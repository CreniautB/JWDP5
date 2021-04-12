let num = document.querySelector("#product-quantity").value

/** Changement du prix en fonction de la quantité d'article */

document.querySelector("#product-quantity").addEventListener('change', (event) => 
{
    try {
        num = document.querySelector("#product-quantity").value
        document.querySelector("#price").innerHTML = teddyPrice * num + " €"
    } catch (error)  {
        errordisplayed();
    }
})

const addCart = document.getElementById('add-cart');

/** Ajout de l'article dans le panier */

addCart.addEventListener("click", () => {
    try {
        localStorage.setItem(`getStorage`, `${storageControl()}`);
        widgetQuantities();
    } catch (error)  {
        errordisplayed();
    }
});

