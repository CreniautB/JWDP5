function errordisplayed(msg){
    let errorContainer = document.createElement("div")
    let errorContent = document.createElement("h1")

    errorContent.innerHTML = "Une Erreur est survenu"
    errorContent.classList.add("errorContent")

    errorBtn = document.createElement("a")
    errorBtn.innerHTML = "Revenir a la page d'acceuil"
    errorBtn.href = "index.html"
    errorBtn.classList.add("errorBtn")

    errorContainer.appendChild(errorContent)
    errorContainer.appendChild(errorBtn)
    errorContainer.classList.add("errorContainer")

    document.querySelector("main").style.display = "none"
    document.querySelectorAll(".mainTitle").forEach(elem => elem.style.display = "none")

    document.querySelector("body").appendChild(errorContainer)

    console.log(msg)
};