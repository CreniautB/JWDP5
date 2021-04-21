export default class Product {
    constructor (name, price, imageUrl, colors, id, para)
    {
        this.name = name,
        this.price = price,
        this.imageUrl = imageUrl,
        this.colors = colors, 
        this.id = id,
        this.para = para
    }

    /** Métode affichant les produit sur l'index */

    displayProductMain(model) {
    
        const clone = model.cloneNode(true)
        clone.id = this.id

        document.querySelector("main").appendChild(clone)

        clone.querySelector("figcaption").innerHTML = this.name
        clone.querySelector("img").src = this.imageUrl
        clone.querySelector("span").innerHTML = this.price + "€"
        clone.querySelector("span").classList.add("price")
        clone.classList.add("card")
        

        let urlData = 'product.html?'+"id="+clone.id
        clone.href = urlData
        
        this.colors.forEach(colors => {

            const colorsSquare = document.createElement("div")

            const colorsContainer = document.createElement("LI")

            colorsSquare.style.backgroundColor = colors
            colorsSquare.classList.add("squares")
            if ( colors === "Pale brown"){
                colorsSquare.style.backgroundColor = "burlywood"
            }
            else if ( colors === "Dark brown"){
                colorsSquare.style.backgroundColor = "#654321"
            }
            colorsContainer.appendChild(colorsSquare)

            clone.querySelector("ul").appendChild(colorsContainer);
        });
    }

    /** Métodes affichant les produtis page produit */

    displayProduct() {
        /** Création de la page produit */
        document.querySelector("#teddyH1").innerHTML = this.name  
        document.querySelector("#teddyImg").src = this.imageUrl
        document.querySelector("#teddyPara").innerHTML = this.para


        /** Ratio Couleurs Produit */
        this.colors.forEach(colors => {
            
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

        this.colors.forEach(colors => {
            const option = document.createElement("option")
            option.value = colors
            option.innerHTML = colors
            selectColor.appendChild(option)
        })


        let teddyPrice = this.price 
        document.querySelector("#price").innerHTML = teddyPrice + " €"
    }

    
}