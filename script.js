// variable initialization
const cowsPrice = document.querySelector("#bid-count");
const cowsBar = document.querySelector("#cows-bar");
const cowsInformation = document.querySelector("#extensive-info");
const cowsUrl = "http://localhost:3000/cows";


// making fetch request to add cows to cows bar
fetch(cowsUrl)
    .then(response => response.json())
    .then(data => {
        let breed = cowsInformation.querySelector("#breed");
        let image = cowsInformation.querySelector("#image");
        breed.textContent = cows[0].breed;
        image.src = cows[0].image;
        cowsPrice.textContent = cows[0].price;

        cows.forEach(cows => addToCowsBar(cows));
    })
    .catch(error => console.log(error));
    