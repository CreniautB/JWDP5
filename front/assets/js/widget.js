
const widgetQuantities = async (quantities) => {
    const widget = document.getElementById("article");
    const teddies = await getQuantities();
    widget.textContent = `${teddies.reduce((total, teddie) => total + parseFloat(teddie.quantity), 0)}`;
    widget.style.display = "block";
};

const getQuantities = async () => {

    if (localStorage.article){
        inStorage = JSON.parse(localStorage.article);
        return await Promise.all(inStorage.map(produit => {
            return produit
        }));
    }
    else 
    {
        return  0
    }
    
};

if (localStorage.article) {
    widgetQuantities();
};

