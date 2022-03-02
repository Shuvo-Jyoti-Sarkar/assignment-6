const searchPhone = () => {
    // Getting Input value using id
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Clear search field
    searchField.value = '';

    // Load data from url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}

// Function to display search results
const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    const error = document.getElementById('error');

    // Clearing previous search results
    searchResult.textContent = '';

    if (phones.length == 0) {
        error.innerText = 'No phone is found having the given name';
    }
    for (const phone of phones) {
        // Creating new div with dynamic html elemnts
        const div = document.createElement('div');
        div.classList.add('col');

        // Adding html elements inside the div
        div.innerHTML = `
        <div class="card h-25 w-75 mx-auto">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${phone.phone_name}</h3>
                <h4>${phone.brand}</h4>
            </div>
            <button class="btn btn-info" onclick="loadPhoneDetails('${phone.slug}')">Show Details</button>
        </div>    
        `;
        // Adding new div inside parent div
        searchResult.appendChild(div);
    }
}

// Getting details of a single phone
const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

// Function to display single phone details
const displayPhoneDetails = phone => {
    // console.log(phone);
    const phoneDetails = document.getElementById('phone-details');

    // Creating div to show phone details
    const div = document.createElement('div');
    div.classList.add('card');

    // Adding html elements to div
    div.innerHTML = `
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${phone.name}</h3>
                <h4>${phone.releaseDate}</h4>
                <h5><strong>Chipset:</strong> ${phone.mainFeatures.chipSet}</h5>
                <h5><strong>Memory:</strong> ${phone.mainFeatures.memory}</h5>
                <h5><strong>Storage:</strong> ${phone.mainFeatures.storage}</h5>
                <h5><strong>Display Size:</strong> ${phone.mainFeatures.displaySize}</h5>
            </div>
    `;
    phoneDetails.appendChild(div);
}
