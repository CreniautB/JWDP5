export default class Cart {
    constructor () {

    /** Affichage du récapitulatif dans le panier */
    this.totalPrice = 0
    if (localStorage.article){
        this.article = JSON.parse(localStorage.article);
        this.quantity = 0
        this.article.forEach(produit => {
            this.quantity = parseInt(produit.quantity) + this.quantity
        })
        document.querySelector("#article").innerHTML = this.quantity
    }
    else {
        this.article = []
        this.quantity = 0
        document.querySelector("#article").innerHTML = this.quantity
    }
    
    }

    displayTeddy() {
        this.article.forEach(element => {
    
            fetch(`http://localhost:3000/api/teddies/${element.id}`)
            .then((response) => {
                return response.json()
            })
    
            /** Création de la page Cart via les données ci dessus  */
    
            .then ((data) => {
            /** Récap Panier */

            let price = data.price * element.quantity

            this.totalPrice = this.totalPrice + price

            let cart = document.createElement("article")
            cart.id = data._id

            let img = document.createElement("img")
            img.src = data.imageUrl

            let titleContainer = document.createElement("h2")
            titleContainer.innerHTML =  element.quantity + " x " + data.name
            
            let delElement = document.createElement("button")
            delElement.innerHTML = "Suprimer l'article du panier"
            delElement.classList.add("btnDel")

            delElement.addEventListener("click", () => { this.delProduit(cart.id) })

            cart.appendChild(titleContainer)
            cart.appendChild(img)
            cart.appendChild(delElement)
            document.querySelector("#cartContent").appendChild(cart)
        })
        .then (() => {
            document.querySelector("#totalPrice").innerHTML = "Total de la commance : " + this.totalPrice + " €"
    })}   
    )}

    /** Métode de supression d'un produit */

    delProduit(id_produit) {

        this.article.forEach(teddie => {

            if (teddie.id == id_produit ) {
                const index = this.article.indexOf(teddie);
                if (index > -1) {
                    this.article.splice(index, 1);
                    let newDataStorage = JSON.stringify(this.article);
                    localStorage.setItem(`article`, `${newDataStorage}`);

                    if (localStorage.article == "[]"){
                        localStorage.clear()
                    }
                    location.reload()
                }
            }
         })
         }

        /** F vérification des valeurs de contact via regex */
        checkContact(contact){

        const expName = /^(([a-zA-ZÀ-Ýà-ï]+)(-| )?){1,2}[a-zA-ZÀ-Ýà-ï]+$/;
        const expAdress = /^([\wÀ-Ýà-ï]+ ?)+[\wÀ-Ýà-ï]$/;
        const expEmail = /^[\w](([_\.\-]?[\w]+)*)@([\w]+)(([_\.\-]?[\w]+)*)\.([\w]{2,})$/
    
        if (!expName.test(contact.firstName)){
            alert("le prénom n'est pas valide")
            return false
        }
        if (!expName.test(contact.lastName)){
            alert("le nom n'est pas valide")
            return false
        }
        if(!expAdress.test(contact.address)){
            alert("l'adresse n'est pas valide")
            return false
        }
        if(!expName.test(contact.city)){
            alert("la ville n'est pas valide")
            return false
        }
        if(!expEmail.test(contact.email)){
            alert("l'email n'est pas valide")
            return false
        }
        else{
            return true
        }
    }

    /** Chargement de la page de confirmation si la commande est Ok */
    confirmationPage (order) {
        try {
            let urlData = 'confirmation.html?'+"id="+order.orderId+"&"+"total="+this.totalPrice
            window.location = urlData
            localStorage.clear()
            } catch (error)  {
            errordisplayed();
        }
    }

    /** Récupération et vérification du formulaire et envoie de commande si Ok */
    formHandler () {
        document.querySelector("#formCart").addEventListener("submit", async (event) => {

        try {
            event.preventDefault();
            let contact = {
                firstName: document.querySelector("#firstName").value.trim(),
                lastName: document.querySelector("#lastName").value.trim(),
                address: document.querySelector("#adress").value.trim(),
                city: document.querySelector("#city").value.trim(),
                email: document.querySelector("#email").value.trim()
            };
            
            let productiD = []
            let id = document.querySelectorAll("article")

            id.forEach(element => {
            
                productiD.push(element.id)
            })

            const order = {};
            order.products = productiD;
            order.contact = contact;

            /** Vérifie le formulaire via F => checkcontact */
            if(this.checkContact(contact)) {
                const sendOrder = await this.postServer(order);
                this.confirmationPage(sendOrder)
            }

        } catch (error)  {
            errordisplayed();
        }
        });
    }

    /** Envoie le commande au server */

    postServer = async (order) => {
        try  {
            const response = await fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
    
            if (response.ok) {
                return data;
            } else {
                console.error("erorr, post server")
            }
        }
        catch (error)  {
            errordisplayed();
        }
    };

    addTeddy() {
        let product_id = document.querySelector("main").id
        let quantity = document.getElementById('product-quantity').value;
        const newProduit = { id: product_id, quantity: quantity };
    
        /** controle si le panier n'est pas vide */
        if (this.article) {
            
            let existe = false;
            /** si l'article n'est pas présent dans le panier il l'ajoute */

            this.article.map(produit => {
                if (produit.id == product_id) {
                    existe = true;
                    produit.quantity = quantity;
                }
            });

            if (!existe) { 
            this.article.push(newProduit);
            }

        } else {
            this.article.push(newProduit);
        }

        localStorage.setItem('article', JSON.stringify(this.article))
        location.reload()
    }
}
