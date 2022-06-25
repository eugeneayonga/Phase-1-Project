const cowsUrl = 'http://localhost:3000/cows'
const cowsBar = document.querySelector('#cow-bar')
const cowsInfo = document.querySelector('#extensive-info')
let cowsPrices = document.querySelector('#price-count')




fetch(cowsUrl)
.then(res => res.json())
.then(cows => {
    const breed = cowsInfo.querySelector('#breed')
    const image = cowsInfo.querySelector('#image')
    breed.textContent = cows[0].breed
    image.src = cows[0].image
    cowsPrices.textContent = cows[0].prices

    cows.forEach(cow => addTocowsBar(cow))
})
.catch(err => console.log(err))




const form = document.querySelector('#votes-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let currentVotes = parseInt(cowsPrices.textContent, 10)
    let addedVotes = parseInt(e.target.prices.value, 10)
    cowsPrices.textContent = (currentVotes += addedVotes)
    form.reset()

    fetch(cowsUrl)
    .then(res => res.json())
    .then(cows => {
        const charName = document.querySelector('#breed')
        const charID = cows.find(cow => cow.breed === charName.textContent)
        fetch(`${cowsUrl}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                prices : cowsPrices.textContent
            })
        })
        .then(res => res.json())
        .then(data => {
            cowsPrices.textContent = data.prices
            console.log(data.prices)
       })
    })
})



const addTocowsBar = (cow) => {
    const span = document.createElement('span')
    span.textContent = cow.breed
    cowsBar.append(span)

    span.addEventListener('click', (e) => {
        
        const cowBreed = cowsInfo.querySelector('#breed')
        const image = cowsInfo.querySelector('#image')

        breed.textContent = cow.breed
        image.src = cow.image
    })     

}



//reset button is a little buggy
const resetButton = document.querySelector('#reset-btn')

resetButton.addEventListener('click', (e) => {

    fetch(cowsUrl)
    .then(res => res.json())
    .then(cows => {
        const charName = document.querySelector('#breed')
        const charID = cows.find(cow => cow.breed === charName.textContent)
        fetch(`${cowsUrl}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                prices : '0'
            })
        })
        .then(res => res.json())
        .then(data => cowsPrices.textContent = data.prices)
    })

})











/*
// PROJECT
// variable initialization
const cowsPrice = document.querySelector("#bid-count");
const cowsBar = document.querySelector("#cows-bar");
const cowsInformation = document.querySelector("#extensive-info");
const cowsUrl = "http://localhost:3000/cows";



// making fetch request to add cows to cows bar
fetch(cowsUrl)
.then(response => response.json())
.then(cows => {
    const breed = cowsInformation.querySelector("#breed");
    const image = cowsInformation.querySelector("#image");
    breed.textContent = cows[0].breed;
    image.src = cows[0].image;
    cowsPrice.textContent = cows[0].price;

    cows.forEach(cows => addToCowsBar(cows));
    })
.catch(error => console.log(error));




// dealing with the form
const form = document.querySelector("#bids-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let currentPrice = parseInt(cowsPrice.textContent, 10)
    let addedPrice = parseInt(event.target.price.value, 10)
    cowsPrice.textContent = (currentPrice += addedPrice)
    form.reset()

    // making fetch request to add bids to database
    fetch(cowsUrl)
        .then(response => response.json())
        .then(cows => {
            const cowBreed = document.querySelector("#breed")
            const cowId = cows.find(cows => cows.breed === cowBreed.textContent)
            fetch(`${cowsUrl}/${cowId.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json" // consider removing this
                },
                body: JSON.stringify({
                    price: cowsPrice.textContent
                })
            })
                .then(response => response.json())
                .then(data => {
                    cowsPrice.textContent = data.price;
                    console.log(data.price)
                })
                .catch(error => console.log(error)); // consider removing this
        })
        .catch(error => console.log(error)); // consider removing this
});



// creating span element for each cow, adding it to cows bar
// using arrow function to add event listener to each cow
const addToCowsBar = (cows) => {
    const spanElement = document.createElement("span");
    spanElement.textContent = cows.breed;
    cowsBar.appendChild(spanElement); // use append only

    spanElement.addEventListener("click", (event) => {
        const cowBreed = cowsInfo.querySelector("#breed")
        const cowImage = cowsInfo.querySelector("#image")

        cowBreed.textContent = cows.breed
        cowImage.src = cows.image
    })
}



// dealing with the reset-button
const resetButton = document.querySelector("#reset-button");

resetButton.addEventListener('click', (event) => {
    fetch(cowsUrl)
        .then(response => response.json())
        .then(cows => {
            const breed = cowsInformation.querySelector("#breed");
            const id = cows.find(cows => cows.breed === breed.textContent);
            fetch(`${cowsUrl}/${id.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json" // consider removing this
                },
                body: JSON.stringify({
                    price: 0
                })
            })
                .then(response => response.json()) // check indentation
                .then(cows => cowsPrice.textContent = cows.price) // check indentation
                .catch(error => console.log(error)); // consider removing this
        })
        .catch(error => console.log(error)); // consider removing this
});
*/

