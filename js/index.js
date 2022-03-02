// Function to search phone
const searchPhone = () => {
    // Getting Input value of search field using id
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

    const phoneDetails = document.getElementById('phone-details');
    // Clearing previous search results
    searchResult.textContent = '';
    phoneDetails.textContent = '';

    // Condition for which phone is not found
    if (phones.length == 0) {
        error.innerText = 'No phone is found having the given name';
    }
    // Condition when phones are found
    else {
        error.innerText = ''; // To clear previous error text
        const slicedPhones = phones.slice(0, 20); //To show 20 results only

        // Loop to get the details of each phone
        for (const phone of slicedPhones) {

            // Creating new div with dynamic html elemnts
            const div = document.createElement('div');
            div.classList.add('col');

            // Adding html elements inside the div
            div.innerHTML = `
        <div class="card h-25 w-50 mx-auto">
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
    const phoneDetails = document.getElementById('phone-details');

    phoneDetails.innerText = '';

    // Creating div to show phone details
    const div = document.createElement('div');
    div.classList.add('card');

    // Adding html elements to div
    div.innerHTML = `
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body h-25 w-100 mx-auto">
                <h3 class="card-title">${phone.name}</h3>
                <h4>${phone.releaseDate ? phone.releaseDate : 'No release date found'}</h4>
                <h4><strong>Basic Features:</strong></h4>
                <h5><strong>Chipset:</strong> ${phone.mainFeatures.chipSet}</h5>
                <h5><strong>Memory:</strong> ${phone.mainFeatures.memory}</h5>
                <h5><strong>Storage:</strong> ${phone.mainFeatures.storage}</h5>
                <h5><strong>Display Size:</strong> ${phone.mainFeatures.displaySize}</h5>
                <h4><strong>Sensors:</strong></h4>
                <h5>${phone.mainFeatures.sensors}</h5>
                <h4><strong>Others:</strong></h4>
                <h5><strong>Bluetooth:</strong> ${phone.others ? phone.others.Bluetooth : 'Information unavilable'}</h5>
                <h5><strong>GPS:</strong> ${phone.others ? phone.others.GPS : 'Information unavilable'}</h5>
                <h5><strong>NFC:</strong> ${phone.others ? phone.others.NFC : 'Information unavilable'}</h5>
                <h5><strong>Radio:</strong> ${phone.others ? phone.others.Radio : 'Information unavilable'}</h5>
                <h5><strong>USB:</strong> ${phone.others ? phone.others.USB : 'Information unavilable'}</h5>
                <h5><strong>WLAN:</strong> ${phone.others ? phone.others.WLAN : 'Information unavilable'}</h5>
            </div>
    `;
    phoneDetails.appendChild(div);
}
