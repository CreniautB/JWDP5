const product_id = window.location.search.substr(4);

fetch(`http://localhost:3000/api/teddies/${product_id}`)
.then((response) => {
    return response.json()
})

.then ((data) => {

    /** Création de la page produit */
    document.querySelector("#teddyH1").innerHTML = data.name  
    document.querySelector("#teddyImg").src = data.imageUrl
    document.querySelector("#teddyPara").innerHTML = data.description


    /** Ratio Couleurs Produit */
    for ( let i = 0; i < data.colors.length; i++) {
        var colorsName = document.createElement("div");
        var colorsSquare = document.createElement("div")

        var colorsContainer = document.createElement("LI")

        colorsSquare.style.backgroundColor = data.colors[i]
        colorsSquare.classList.add("squares")
        colorsName.innerHTML = data.colors[i];    
        
        if ( data.colors[i] === "Pale brown"){
            colorsSquare.style.backgroundColor = "burlywood"
        }
        else if ( data.colors[i] === "Dark brown"){
            colorsSquare.style.backgroundColor = "#654321"
        }

        colorsContainer.appendChild(colorsSquare)
        colorsContainer.appendChild(colorsName)

        document.querySelector("#radioSection").appendChild(colorsContainer)
    };


    const selectColor = document.querySelector("#whichColors")

    for ( let i = 0 ; i < data.colors.length; i++){
        const option = document.createElement("option")
        option.value = data.colors[i]
        option.innerHTML = data.colors[i]


        selectColor.appendChild(option)
    }

    teddyPrice = data.price 
    document.querySelector("#price").innerHTML = teddyPrice + " €"

}).catch((error) =>  {
    errordisplayed();
});


/** Enregistrement dans le Panier */
const productQuantity = () => {
    try {
        let quantity = document.getElementById('product-quantity').value;
        return quantity;
    } catch (error)  {
        errordisplayed();
    }
};

const storageControl = () => {
    try {
        const produitLocal = { id: product_id, quantity: productQuantity() };
        let createNewStorage = [];
        let StorageLength = localStorage.length;

        /** controle si le panier n'est pas vide */
        if (StorageLength !== 0 && localStorage.getStorage) {
            let inStorage = JSON.parse(localStorage.getStorage);
            let existe = false;

            /** si l'article n'est pas présent dans le panier il l'ajoute */

            inStorage.map(produit => {
                if (produit.id == product_id) {
                    existe = true;
                    produit.quantity = productQuantity();
                }
            });

            if (existe) {
                return JSON.stringify(inStorage);
            } else {
                inStorage.push(produitLocal);
                return JSON.stringify(inStorage);
            }

        } else {
            createNewStorage.push(produitLocal);
            return JSON.stringify(createNewStorage);
        }
    } catch (error)  {
        errordisplayed();
    }

};







