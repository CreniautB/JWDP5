
// Récupération du prix total de la commande et de l'id de la commande
const produit = new URLSearchParams(window.location.search)

let order_id = produit.getAll("id")[0]
let price = produit.getAll("total")[0]

order_id = window.location.search.split('&')[0].substr(4)
price = window.location.search.split('&')[1].substr(6)

// Affichage des données récupérer si dessus
document.querySelector("#numCommande").innerHTML = order_id
document.querySelector("#price").innerHTML = price + " €"