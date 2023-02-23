//API KEY
//https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d

let form = document.querySelector('form');
let photoList = document.querySelector('#photos');

let previousPageButton = document.getElementById("previousPage");
let nextPageButton = document.getElementById("nextPage");

var pageMin = 0;
var pageMax = 10;

var photoPage = 1
var numberOfPhotosToPull = 10;
var numberOfPhotos = 0;

var json = null;
var rawInput = null;
var input = null;
var rawColor = null;
var color = null;

form.onsubmit = async event => {
    event.preventDefault();

    rawInput = form.searchTerm.value;
    input = rawInput.replace(" ", "+");
    rawColor = form.colorList.value;
    color = rawColor.toLowerCase();

    json = await apiCall();
    numberOfPhotos = json.hits.length;

    updateButtons(pageMin, pageMax, numberOfPhotos);
    postPhotos(pageMin, pageMax, json);
}

async function apiCall() {
    let url = 'https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d&q=' + input + '&colors=' + color + '&per_page=' + numberOfPhotosToPull + '&page=' + photoPage;
    
    let response = await fetch(url);
    json = await response.json();

    return json;
}

previousPageButton.addEventListener("click", async function()
{    
    if (pageMin > 0)
    {
        //Clears the current photos.
        document.getElementById("photos").innerHTML = "";

        photoPage -= 1;
        json = await apiCall();

        pageMax -= 10;
        pageMin -= 10;

        postPhotos(pageMin, pageMax, json);

        updateButtons(pageMin, pageMax, numberOfPhotos);
    }
});

nextPageButton.addEventListener("click", async function()
{    
    if (pageMax < numberOfPhotos) //These two are currently the same so nothing happens!
    {
        //Clears the current photos.
        document.getElementById("photos").innerHTML = "";

        photoPage += 1;
        json = await apiCall();

        pageMax += 10;
        pageMin += 10;

        postPhotos(pageMin, pageMax, json);

        updateButtons(pageMin, pageMax, numberOfPhotos);
    }
});

function postPhotos(pageMin, pageMax, json)
{
    document.getElementById("photos").innerHTML = "";
    for (let i = 0; i < json.hits.length; i++) {
        if (i < numberOfPhotos)//To keep the for loop form posting photos which dont exsists.
        {
            let photoListItem = document.createElement('figure');
            let photoListImg = document.createElement('img');
            let photoListTags = document.createElement('figcaption');
            let photoListUser = document.createElement('figcaption')

            photoListImg.src = json.hits[i].webformatURL;
            photoListTags.textContent = "Tags: " + json.hits[i].tags;
            photoListUser.textContent = "User: " + json.hits[i].user;

            photoList.append(photoListItem);
            photoListItem.append(photoListImg);
            photoListItem.append(photoListTags);
            photoListItem.append(photoListUser);
        }
    }
}

function updateButtons(pageMin, pageMax, numberOfPhotos)
{
    //Limits the buttons so "pageMin" cant go below 0 and pageMax cant go beyond "numberOfPhotos".
    if (pageMin >= 10)
    {
        //previousPageButton.disabled = false;
    }
    else
    {
        //previousPageButton.disabled = true;
    }
    if (pageMax >= numberOfPhotos)
    {
        //nextPageButton.disabled = true;
    }
    else
    {
        //nextPageButton.disabled = false
    }
}