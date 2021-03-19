
fetch('http://localhost:3000/api/teddies')
.then((response) => {
    return response.json()
})

.then ((data) => {

    var model = document.querySelector("#model")

    data.forEach(element => {
    
        console.log(element)

        var clone = model.cloneNode(true)
        clone.id = element._id

        document.querySelector("main").appendChild(clone)

        clone.querySelector("h3").innerHTML = element.name
        clone.querySelector("img").src = element.imageUrl
        clone.querySelector("p").innerHTML = element.description
        clone.querySelector("span").innerHTML = element.price

        let urlData = 'product.html?'+"id="+clone.id
        clone.querySelector("a").href = urlData
        

        for ( let i = 0; i < element.colors.length; i++) {
            var colors = document.createElement("LI");
            colors.innerHTML = element.colors[i];    
            clone.querySelector("ul").appendChild(colors);
        };  

    });

})