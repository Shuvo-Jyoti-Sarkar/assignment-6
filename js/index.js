const searchPhone = () => {
    // Getting Input value using id
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';
    // Fetchig data from url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    for (const phone of phones) {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-25 w-75 mx-auto">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${phone.phone_name}</h3>
                <h4>${phone.brand}</h4>
            </div>
            <button class="btn btn-info" onclick="loadPhoneDetails(${`phone.brand`})">Show Details</button>
        </div>    
        `;
        searchResult.appendChild(div);
    }
}
const loadPhoneDetails = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
}
