
const widgetQuantities = async (quantities) => {
    const widget = document.getElementById("article");
    const teddies = await getQuantities();
    widget.textContent = `${teddies.reduce((total, teddie) => total + parseFloat(teddie.quantity), 0)}`;
    widget.style.display = "block";
    console.log(teddies)
};

const getQuantities = async () => {
    const inStorage = JSON.parse(localStorage.getStorage);
    return await Promise.all(inStorage.map(produit => {
        return produit
    }));
};

if (localStorage.getStorage) {
    widgetQuantities();
};

