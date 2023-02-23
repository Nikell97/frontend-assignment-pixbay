//API KEY
//https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d

let form = document.querySelector('form');
let photoList = document.querySelector('#photos');

let previousPageButton = document.getElementById("previousPage");
let nextPageButton = document.getElementById("nextPage");

previousPageButton.disabled = true;
nextPageButton.disabled = true;

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

    rawInput = await form.searchTerm.value;
    input = rawInput.replace(" ", "+");
    rawColor = await form.colorList.value;
    color = rawColor.toLowerCase();

    json = await apiCall();
    numberOfPhotos = json.hits.length;

    photoPage = 1;

    updateButtons(photoPage);
    postPhotos(json);
}

async function apiCall() {
    let url = 'https://pixabay.com/api/?key=33444826-ce140ec6a98c30c48c958bb9d&q=' + input + '&colors=' + color + '&per_page=' + numberOfPhotosToPull + '&page=' + photoPage;
    
    let response = await fetch(url);
    json = await response.json();

    return json;
}

previousPageButton.addEventListener("click", async function()
{  
        //Clears the current photos.
        document.getElementById("photos").innerHTML = "";

        photoPage -= 1;
        json = await apiCall();

        postPhotos(json);

        updateButtons(photoPage);
});

nextPageButton.addEventListener("click", async function()
{    
        //Clears the current photos.
        document.getElementById("photos").innerHTML = "";

        photoPage += 1;
        json = await apiCall();

        postPhotos(json);

        updateButtons(photoPage);
});

function postPhotos(json)
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

function updateButtons(photoPage)
{
    //Limits the buttons so "pageMin" cant go below 0 and pageMax cant go beyond 50, which is the max number of pages we can fetch with the api.
    if (photoPage > 1)
    {
        previousPageButton.disabled = false;
    }
    else
    {
        previousPageButton.disabled = true;
    }
    if (photoPage >= Math.ceil(json.totalHits/10))
    {
        nextPageButton.disabled = true;
    }
    else
    {
        nextPageButton.disabled = false
    }
}