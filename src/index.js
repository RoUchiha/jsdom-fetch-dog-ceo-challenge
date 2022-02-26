console.log('%c HI', 'color: firebrick')

let dogBreeds = [];

document.addEventListener('DOMContentLoaded', function () {
    loadPics();
    loadBreeds();
});

function loadPics() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(response => response.json())
    .then(pics => {
        pics.message.forEach(pic => addPic(pic))
    });
}

function addPic(dogPicUrl) {
    let container = document.querySelector('#dog-image-container');
    let newPicEle = document.createElement('img');
    newPicEle.src = dogPicUrl;
    container.appendChild(newPicEle);
}

function loadBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(response => response.json())
    .then(resp => {
        breeds = Object.keys(resp.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(ele) {
    let child = ele.lastElementChild;
    while (child) {
        ele.removeChild(child);
        child = ele.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDrop = document.querySelector('#breed-dropdown');
    breedDrop.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerHTML = breed;
    li.style.cursor = 'crosshair';
    ul.appendChild(li);
    li.addEventListener('click', changeColor);
}

function changeColor(event) {
    event.target.style.color = 'pink';
}