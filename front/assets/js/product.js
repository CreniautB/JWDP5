const productId = new URLSearchParams(window.location.search)

const product_id = productId.getAll("id")[0]

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
    data.colors.forEach(colors => {
        
        const colorsName = document.createElement("div");
        const colorsSquare = document.createElement("div")

        const colorsContainer = document.createElement("LI")

        colorsSquare.style.backgroundColor = colors;
        colorsSquare.classList.add("squares")
        colorsName.innerHTML = colors; 
        
        if ( colors === "Pale brown"){
            colorsSquare.style.backgroundColor = "burlywood"
        }
        else if ( colors === "Dark brown"){
            colorsSquare.style.backgroundColor = "#654321"
        }

        colorsContainer.appendChild(colorsSquare)
        colorsContainer.appendChild(colorsName)

        document.querySelector("#radioSection").appendChild(colorsContainer)
    });


    const selectColor = document.querySelector("#whichColors")

    data.colors.forEach(colors => {
        const option = document.createElement("option")
        option.value = colors
        option.innerHTML = colors
        selectColor.appendChild(option)
    })


    teddyPrice = data.price 
    document.querySelector("#price").innerHTML = teddyPrice + " €"

}).catch((error) =>  {
    errordisplayed();
});







const storageControl = () => {
    try {
        
        const produitLocal = { id: product_id, quantity: productQuantity() };
        console.log(produitLocal)
        let createNewStorage = [];
        let StorageLength = localStorage.length;

        /** controle si le panier n'est pas vide */
        if (StorageLength !== 0 && localStorage.article) {
            let inStorage = JSON.parse(localStorage.article);
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

/** Enregistrement dans le Panier */
const productQuantity = () => {
    try {
        let quantity = document.getElementById('product-quantity').value;
        return quantity;
    } catch (error)  {
        let msg = "probleme de "
        errordisplayed(msg);
    }
};




