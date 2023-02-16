//API KEY
//https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d

let form = document.querySelector('form');
let photoList = document.querySelector('#photos');

let previousPageButton = document.getElementById("previousPage");
let nextPageButton = document.getElementById("nextPage");

let pageMin = 0;
let pageMax = 10;

let numberOfPhotosToPull = 50;
let numberOfPhotos = 0;

let json = null;

form.onsubmit = async event => {
    event.preventDefault();

    let rawInput = form.searchTerm.value;
    let input = rawInput.replace(" ", "+");
    let rawColor = form.colorList.value;
    let color = rawColor.toLowerCase();

    let url = 'https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d&q=' + input + '&colors=' + color + '&per_page=' + numberOfPhotosToPull;
    
    let response = await fetch(url);
    json = await response.json();

    numberOfPhotos = json.hits.length;
    //These exists so that you cant be on a page that dont exists when searching for new pictures.
    pageMin = 0;
    pageMax = 10;
    updateButtons(pageMin, pageMax, numberOfPhotos);
    getPhotos(pageMin, pageMax, json);
}

previousPageButton.addEventListener("click", function()
{    
    if (pageMin > 0)
    {
        //Clears the current photos.
        document.getElementById("photos").innerHTML = "";

        pageMin -= 10;
        pageMax -= 10;
        getPhotos(pageMin, pageMax, json);

        updateButtons(pageMin, pageMax, numberOfPhotos);
    }
});

nextPageButton.addEventListener("click", function()
{    
    if (pageMax < numberOfPhotos)
    {
        //Clears the current photos.
        document.getElementById("photos").innerHTML = "";

        pageMin += 10;
        pageMax += 10;
        getPhotos(pageMin, pageMax, json);

        updateButtons(pageMin, pageMax, numberOfPhotos);
    }
});

function getPhotos(pageMin, pageMax, json)
{
    document.getElementById("photos").innerHTML = "";
    for (let i = pageMin; i < pageMax; i++) {
        if (i < numberOfPhotos)//To keep the for loop form posting photos which dont exsists.
        {
            let photoListItem = document.createElement('img');
            photoListItem.src = json.hits[i].webformatURL;
            photoList.append(photoListItem);
        }
    }
}

function updateButtons(pageMin, pageMax, numberOfPhotos)
{
    //Limits the buttons so "pageMin" cant go below 0 and pageMax cant go beyond "numberOfPhotos".
    if (pageMin >= 10)
    {
        previousPageButton.disabled = false;
    }
    else
    {
        previousPageButton.disabled = true;
    }
    if (pageMax >= numberOfPhotos)
    {
        nextPageButton.disabled = true;
    }
    else
    {
        nextPageButton.disabled = false
    }
}