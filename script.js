// variable initialization
const cowsPrice = document.querySelector("#bid-count");
const cowsBar = document.querySelector("#cows-bar");
const cowsInformation = document.querySelector("#extensive-info");
const cowsUrl = "http://localhost:3000/cows";


// making fetch request to add cows to cows bar
fetch(cowsUrl)
    .then(response => response.json())
    .then(cows => {
        let breed = cowsInformation.querySelector("#breed");
        let image = cowsInformation.querySelector("#image");
        breed.textContent = cows[0].breed;
        image.src = cows[0].image;
        cowsPrice.textContent = cows[0].price;

        cows.forEach(cows => addToCowsBar(cows));
    })
    .catch(error => console.log(error));


// creating span element for each cow, adding it to cows bar
// using arrow function to add event listener to each cow
const addToCowsBar = (cows) => {
    const span = document.createElement("span");
    span.textContent = cows.breed;
    cowsBar.appendChild(span);

    span.addEventListener('click', (event) => {
        const breed = cowsInfo.querySelector("#breed")
        const image = cowsInfo.querySelector("#image")

        breed.textContent = cows.breed
        image.src = cows.image
    })
}


// dealing with the form
const form = document.querySelector("#bids-form");

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const currentPrice = parseInt(cowsPrice.textContent, 10);
    const addedPrice = parseInt(event.target.price.value, 10);
    cowsPrice.textContent = (currentPrice += addedPrice);
    form.reset();

    // making fetch request to add bids to database
    fetch(cowsUrl)
        .then(response => response.json())
        .then(cows => {
            const cowBreed = document.querySelector("#breed");
            const cowId = cows.find(cows => cows.breed === cowBreed.textContent).id;
            fetch(`${cowsUrl}/${cowId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    price: cowsPrice.textContent
                })
            })
                .then(response => response.json())
                .then(cows => {
                    cowsPrice.textContent = cows.price;
                    console.log(cows.price)
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
});