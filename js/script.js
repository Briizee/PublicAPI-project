function getdata() {
    let url = "https://randomuser.me/api/?results=12"
    fetch(url)
        //.then(response => console.log(response.json()))
        .then(response => response.json())
        .then(data => parseUsers(data))
        .catch(err => "An Error has occured: " + err)
    
}
let usersData 

function parseUsers(data) {
    
    let users = data.results
    usersData = users
    let galleryDiv = document.getElementById('gallery')
    for (i = 0; i<users.length ; i++) {
        
        let cardDiv = document.createElement('div')
        cardDiv.classList.add('card')
        let imgDiv = document.createElement('div')
        imgDiv.classList.add('card-img-container')
        imgDiv.addEventListener('click', (event) => modal(event))
        let img = document.createElement('img')
        img.classList.add('card-img')
        img.id = i
        img.alt = 'profile picture'
        img.src = users[i].picture.thumbnail

        let cardInfoDiv = document.createElement('div')
        cardInfoDiv.classList.add('card-info-container')
        let nameh3 = document.createElement('h3')
        nameh3.id = 'name'
        nameh3.classList.add('card-name', 'cap')
        nameh3.id = i
        nameh3.innerText = users[i].name.first + " " + users[i].name.last 
        nameh3.addEventListener('click', (event) => modal(event))
        let emailp = document.createElement('p')
        emailp.classList.add('card-text')
        emailp.innerText = users[i].email 
        let locationp = document.createElement('p')
        locationp.classList.add('card-text', 'cap')
        locationp.innerText = users[i].location.city + ", " + users[i].location.state 

        cardInfoDiv.appendChild(nameh3)
        cardInfoDiv.appendChild(emailp)
        cardInfoDiv.appendChild(locationp)

        imgDiv.appendChild(img)
        cardDiv.appendChild(imgDiv)
        cardDiv.appendChild(cardInfoDiv)
        galleryDiv.appendChild(cardDiv)
    }
}

function modal (event) {
    let index = event.target.id
    let user = usersData[index]
    console.log(user)
    let modalContainer = document.createElement('div')
    modalContainer.classList.add('modal-container')
    let modal = document.createElement('div')
    modal.classList.add('modal')
    let closeBtn = document.createElement('button')
    closeBtn.id = 'modal-close-btn'
    closeBtn.classList.add('modal-close-btn')
    closeBtn.type = 'button'
    closeBtn.innerHTML = '<strong>X</strong>'
    closeBtn.addEventListener('click', () => closeModal())
    let modalInfo = document.createElement('div')
    modalInfo.classList.add('modal-info-container')
    let img = document.createElement('img')
    img.classList.add('modal-img')
    img.alt = 'profile picture'
    img.src = user.picture.thumbnail
    let nameh3 = document.createElement('h3')
    nameh3.id = 'name'
    nameh3.classList.add('modal-name', 'cap')
    nameh3.innerText = user.name.first + " " + user.name.last
    let cityP = document.createElement('p')
    cityP.classList.add('modal-text')
    cityP.innerText = user.location.city
    let emailp = document.createElement('p')
    emailp.classList.add('modal-text')
    emailp.innerText = user.email 
    let phoneP = document.createElement('p')
    phoneP.classList.add('modal-text')
    phoneP.innerText = user.phone
    let locationp = document.createElement('p')
    locationp.classList.add('modal-text', 'cap')
    locationp.innerText = user.location.street.number + ", " + user.location.street.name + ", " + user.location.city + ", " + user.location.state + user.location.postcode
    let birth = document.createElement('p')
    birth.classList.add('modal-text')
    birth.innerText = "Birthday: " + new Date(user.dob.date).toISOString().slice(0, 10)

    modalInfo.appendChild(img)
    modalInfo.appendChild(nameh3)
    modalInfo.appendChild(emailp)
    modalInfo.appendChild(cityP)
    let hr = document.createElement('hr')
    modalInfo.appendChild(hr)
    modalInfo.appendChild(phoneP)
    modalInfo.appendChild(locationp)
    modalInfo.appendChild(birth)

    modal.appendChild(closeBtn)
    modal.appendChild(modalInfo)
    modalContainer.appendChild(modal)
    
    let gallery = document.getElementById('gallery')
    gallery.appendChild(modalContainer)
}

function closeModal() {
   let modal = document.getElementsByClassName('modal-container')
   modal[0].remove()
}
getdata()
   