// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log('there was an error', error))
}

Promise.all([
    fetchData('https://randomuser.me/api/?results=12')
])
.then(data => {
    //create cards 
    generateCard(data[0].results);
    generateModalClickEvent(data[0].results);
})


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/**
 * generate card based on data from randomuser.me and append to gallery div
 * @param {array} data 
 */

function generateCard(data) {
    const gallery = document.getElementById("gallery");
    
    data.forEach((element, index) => {
        cardContent =
        `
        <div id="${index}" class="card">
            <div class="card-img-container">
                <img class="card-img" src="${element.picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${element.name.first} ${element.name.last}</h3>
                <p class="card-text">${element.email}</p>
                <p class="card-text cap">${element.location.city}, ${element.location.state}</p>
            </div>
        </div>
        `
        gallery.insertAdjacentHTML('beforeend', cardContent);
    });
}

/**
 * generate card modal based on data from card clicked 
 * @param {array} data 
 * @param {number} index 
 */

function generateCardModal(data, index) {

    const body = document.querySelector('body');
    modalContent =
    `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[index].picture.thumbnail}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[index].name.first} ${data[index].name.last}</h3>
                    <p class="modal-text">${data[index].email}</p>
                    <p class="modal-text cap">${data[index].location.city}</p>
                    <hr>
                    <p class="modal-text">${data[index].phone}</p>
                    <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}, ${data[index].location.city}, ${data[index].nat} ${data[index].location.postcode}</p>
                    <p class="modal-text">Birthday: ${getBirthday(data[index].dob.date)}</p>
                </div>
            </div> 
        </div>
    `
    
    body.insertAdjacentHTML('beforeend', modalContent);

    document.getElementById("modal-close-btn").addEventListener('click', event => {
        document.querySelector(".modal-container").remove();
    });
}

/**
 * create card click event that pops open the modal
 * @param {array} data 
 */

function generateModalClickEvent(data) {
    //create card click event
    const cards = Array.from(document.querySelectorAll(".card"));

    cards.forEach(function(card) {
        card.addEventListener("click", function(e) {
            generateCardModal(data, e.target.closest(".card").getAttribute('id'));
        });
    });
}

/**
 * return birthday in MM/DD/YYYY format
 * @param {string} birthday 
 */

function getBirthday(birthday) {
    return new Date(birthday).toLocaleDateString();
}