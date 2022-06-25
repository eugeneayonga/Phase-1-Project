// Variable initialization
const cowsUrl = "http://localhost:3000/cows"; // to be used for fetch() requests


const cowsBar = document.querySelector("#cow-bar");
let cowsPrices = document.querySelector("#price-count");
const cowsInfo = document.querySelector("#extensive-info");



// making fetch request to add cows to cows bar
fetch(cowsUrl)
.then(response => response.json())
.then(cows => {
    const breed = cowsInfo.querySelector("#breed");
    const image = cowsInfo.querySelector("#image");
    breed.textContent = cows[0].breed
    image.src = cows[0].image
    cowsPrices.textContent = cows[0].prices

    // iterating through the array of cows and adding them to the cows bar
    cows.forEach(cow => addTocowsBar(cow)) 
})
.catch(error => console.log(error))



// dealing with the form
const form = document.querySelector("#prices-form");

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let currentPrice = parseInt(cowsPrices.textContent, 10); // base 10
    let addedBid = parseInt(event.target.prices.value, 10);

    const valueAddedTaxFactor = 1.16; // factoring in value added tax

    // adding, assigning to and factoring in value added tax via multiplication
    cowsPrices.textContent = (currentPrice += addedBid) * valueAddedTaxFactor
    form.reset()

    fetch(cowsUrl)
    .then(response => response.json())
    .then(cows => {
        const cowBreed = document.querySelector("#breed");
        const cowID = cows.find(cow => cow.breed === cowBreed.textContent);
        fetch(`${cowsUrl}/${cowID.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                prices : cowsPrices.textContent
            })
        })
        .then(response => response.json())
        .then(cows => {
            cowsPrices.textContent = cows.prices
            console.log(cows.prices)
       }) .catch(error => console.log(error))
    }) .catch(error => console.log(error))
})



// creating span element for each cow, adding it to cows bar
// using arrow function to add event listener to each cow
const addTocowsBar = (cow) => {
    const span = document.createElement("span");
    span.textContent = cow.breed
    cowsBar.appendChild(span)

    span.addEventListener("click", (event) => {
        
        const cowBreed = cowsInfo.querySelector("#breed");
        const image = cowsInfo.querySelector("#image");

        breed.textContent = cow.breed
        image.src = cow.image
    })     

}



// dealing with the reset-button and the form to revert Selling Price to 0
const resetButton = document.querySelector("#reset-button");

resetButton.addEventListener("click", (event) => {

    fetch(cowsUrl)
    .then(res => res.json())
    .then(cows => {
        const cowBreed = document.querySelector("#breed");
        const cowID = cows.find(cow => cow.breed === cowBreed.textContent)
        fetch(`${cowsUrl}/${cowID.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                prices : 0
            })
        })
        .then(res => res.json())
        .then(data => cowsPrices.textContent = data.prices)
        .catch(error => console.log(error))
    }) .catch(error => console.log(error))

})



// adding DOMContentLoaded 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
