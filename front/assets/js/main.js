
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
        
        element.colors.forEach(colors => {

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
    });
  }).catch((error) =>  {
      let msg = "connexion au serveur pour le fetch compromise"
    errordisplayed(msg);
});