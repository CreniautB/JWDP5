order_id = window.location.search.split('&')[0].substr(4)
price = window.location.search.split('&')[1].substr(6)

document.querySelector("#numCommande").innerHTML = order_id

document.querySelector("#price").innerHTML = price + " €"