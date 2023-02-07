//API KEY
//https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d
//Detta skrivs i slutet på URL för att få bilderna med dessa taggar:
//&q=yellow+flower&impage_type=photo

let form = document.querySelector('form');
let photoList = document.querySelector('#photos')

form.onsubmit = async event => {
    event.preventDefault();

    let rawInput = form.searchTerm.value;
    let input = rawInput.replace(" ", "+");
    let color = form.colorList.value;

    let url = 'https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d&q=' + input + '&color=' + color;
    
    let response = await fetch(url);
    let json = await response.json();

    let photoListItem = document.createElement('li');
    

    for (let i = 0; i < photoListItem.Length; i++)
    {
        photoListItem.textContent = json.i.webformatURL;
        photoList.append(photoListItem[i]);
    }
}