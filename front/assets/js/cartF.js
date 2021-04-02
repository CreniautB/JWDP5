let num = document.querySelector("#product-quantity").value

document.querySelector("#product-quantity").addEventListener('change', (event) => 
{
    num = document.querySelector("#product-quantity").value
    document.querySelector("#price").innerHTML = teddyPrice * num + " €"
})

const addCart = document.getElementById('add-cart');

addCart.addEventListener("click", () => {
    localStorage.setItem(`getStorage`, `${storageControl()}`);
    widgetQuantities();
});

