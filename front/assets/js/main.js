
fetch('http://localhost:3000/api/teddies')
.then((response) => {
    return response.json()
})
.then ((data) => {

    const model = document.querySelector("#model")

    data.forEach(element => {
    
        var clone = model.cloneNode(true)
        clone.id = element._id

        document.querySelector("main").appendChild(clone)

        clone.querySelector("figcaption").innerHTML = element.name
        clone.querySelector("img").src = element.imageUrl
        clone.querySelector("p").innerHTML = element.description
        clone.querySelector("span").innerHTML = element.price + " €"
        clone.querySelector("span").classList.add("price")
        clone.querySelector("#cartSide").classList.add("cartSide")
        clone.querySelector("#imgColor").classList.add("imgColor")
        

        let urlData = 'product.html?'+"id="+clone.id
        clone.querySelector("a").href = urlData
        

        for ( let i = 0; i < element.colors.length; i++) {
            var colorsName = document.createElement("div");
            var colorsSquare = document.createElement("div")

            var colorsContainer = document.createElement("LI")

            colorsSquare.style.backgroundColor = element.colors[i]
            colorsSquare.classList.add("squares")
            colorsName.innerHTML = element.colors[i];    
            
            if ( element.colors[i] === "Pale brown"){
                colorsSquare.style.backgroundColor = "burlywood"
            }
            else if ( element.colors[i] === "Dark brown"){
                colorsSquare.style.backgroundColor = "#654321"
            }

            colorsContainer.appendChild(colorsSquare)
            colorsContainer.appendChild(colorsName)

            clone.querySelector("ul").appendChild(colorsContainer);
        };  
    });
  }).catch((error) => {
    errordisplayed();
  });