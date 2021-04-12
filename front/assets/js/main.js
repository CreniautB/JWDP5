
fetch('http://localhost:3000/api/teddies')
.then((response) => {
    return response.json()
})
.then ((data) => {

    const model = document.querySelector("#model")

    data.forEach(element => {
    
        const clone = model.cloneNode(true)
        clone.id = element._id

        document.querySelector("main").appendChild(clone)

        clone.querySelector("figcaption").innerHTML = element.name
        clone.querySelector("img").src = element.imageUrl
        clone.querySelector("span").innerHTML = element.price + "€"
        clone.querySelector("span").classList.add("price")
        clone.classList.add("card")
        

        let urlData = 'product.html?'+"id="+clone.id
        clone.href = urlData
        

        for ( let i = 0; i < element.colors.length; i++) {

            const colorsSquare = document.createElement("div")

            const colorsContainer = document.createElement("LI")

            colorsSquare.style.backgroundColor = element.colors[i]
            colorsSquare.classList.add("squares")
            
            if ( element.colors[i] === "Pale brown"){
                colorsSquare.style.backgroundColor = "burlywood"
            }
            else if ( element.colors[i] === "Dark brown"){
                colorsSquare.style.backgroundColor = "#654321"
            }
            colorsContainer.appendChild(colorsSquare)

            clone.querySelector("ul").appendChild(colorsContainer);
        };  
    });
  })