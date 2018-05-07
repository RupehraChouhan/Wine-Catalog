// wait for the document to be loaded


$(document).ready(function() {
    /* TODO: Implement solution here */

    /* Gather all the wine object from Catalog into an array */
    for (i = 0; i < all_wine_ids.length; i++) {
        id = all_wine_ids[i];
        var wine = Catalog[id];
        allWineObjects.push(wine);
    }

    //Initially display ALL the wines
    filteredWines = allWineObjects;
    searchByName();
});


function displayWines(filteredWines) {

    //Clear all the previous wines that are displaying
    document.getElementById("allCards").innerHTML = "";

    //sort the wines before displaying
    filteredWines = sortResult(filteredWines);

    //create cards to display
    for(i = 0; i < filteredWines.length; i++) {

        var wine = filteredWines[i];

        //create a new card
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("id", wine.getId());

        //create the top, middle and bottom parts of the card
        var cardTop = createCardTop(wine)
        var cardMiddle = createCardMiddle(wine);
        var cardBottom = createCardBottom(wine);

        card.appendChild(cardTop);
        card.appendChild(cardMiddle);
        card.appendChild(cardBottom);

        //append the card to DOM
        var centerPanel = document.getElementById("allCards");
        centerPanel.appendChild(card);
    }
}

function createCardTop(wine) {

    //create top portion of the card
    var cardTop = document.createElement("div");
    cardTop.setAttribute("class", "cardTop");

    //create button and pride divs
    var btnOuterDiv = createButtonDiv(wine);
    var priceDiv = createPriceDiv(wine);

    cardTop.appendChild(btnOuterDiv);
    cardTop.appendChild(priceDiv);

    return cardTop;
}

function createButtonDiv(wine) {

    //create button
    var btnOuterDiv = document.createElement("div");
    btnOuterDiv.setAttribute("class", "cardPlusButton");

    var btn = document.createElement("BUTTON");
    btn.setAttribute("onclick", "addWineToCart(this)");
    btn.setAttribute("id", wine.getId()+"btn");
    var btnText = document.createTextNode("+");
    btn.appendChild(btnText);

    btnOuterDiv.appendChild(btn);
    return btnOuterDiv;
}

function createPriceDiv(wine) {

    //create price div
    var priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "winePrice");
    var price = document.createTextNode("$"+wine.getPrice());
    priceDiv.appendChild(price);
    return priceDiv;
}
function createCardMiddle(wine) {

    var cardMiddle = document.createElement("div");
    cardMiddle.setAttribute("class", "cardMiddle");

    //create image div
    var image = document.createElement("IMG");
    image.setAttribute("class", "cardImg");
    image.setAttribute("src", "images/catalog/"+wine.getId()+".png");

    //add image to middle card
    cardMiddle.appendChild(image);
    return cardMiddle;
}

function createCardBottom(wine) {

    var cardBottom = document.createElement("div");
    cardBottom.setAttribute("class", "cardBottom");
    cardBottom.setAttribute("onmouseover","removeCardElements(this)");
    cardBottom.setAttribute("onmouseout", "addCardElements(this)");

    var cardBottomText = document.createElement("div");
    cardBottomText.setAttribute("class", "cardBottomText");

    //create all the UI divs
    cardBottomText = createNameUI(wine, cardBottomText);
    cardBottomText = createCategoryUI(wine, cardBottomText);
    cardBottomText = createVolumeUI(wine, cardBottomText);
    cardBottomText = createPriceUI(wine, cardBottomText);
    cardBottomText = createCountryUI(wine, cardBottomText);
    cardBottomText = createProducerUI(wine, cardBottomText);

    cardBottom.appendChild(cardBottomText);
    return cardBottom;
}

function createProducerUI(wine, cardBottomText) {

    var producerHeading = document.createElement("div");
    producerHeading.setAttribute("class", "heading");
    producerHeading.appendChild(document.createTextNode("Producer"));
    var producer = document.createElement("div");
    producer.appendChild(document.createTextNode(wine.getProducer()));

    cardBottomText.appendChild(producerHeading);
    cardBottomText.appendChild(producer);

    return cardBottomText;

}

function createCountryUI(wine, cardBottomText) {

    var countryHeading = document.createElement("div");
    countryHeading.setAttribute("class", "heading");
    countryHeading.appendChild(document.createTextNode("Country"));
    var country = document.createElement("div");
    country.appendChild(document.createTextNode(wine.getCountry()));

    cardBottomText.appendChild(countryHeading);
    cardBottomText.appendChild(country);
    cardBottomText.appendChild(document.createElement("br"));
    return cardBottomText;
}

function createPriceUI(wine, cardBottomText) {

    var priceHeading = document.createElement("div");
    priceHeading.setAttribute("class", "heading");
    priceHeading.appendChild(document.createTextNode("Price"));
    var price = document.createElement("div");
    price.appendChild(document.createTextNode("$"+wine.getPrice()));

    cardBottomText.appendChild(priceHeading);
    cardBottomText.appendChild(price);
    cardBottomText.appendChild(document.createElement("br"));
    return cardBottomText;
}

function createVolumeUI(wine, cardBottomText) {

    var volumeHeading = document.createElement("div");
    volumeHeading.setAttribute("class", "heading");
    volumeHeading.appendChild(document.createTextNode("Volume"));
    var volume = document.createElement("div");
    volume.appendChild(document.createTextNode(wine.getVolume()));

    cardBottomText.appendChild(volumeHeading);
    cardBottomText.appendChild(volume);
    cardBottomText.appendChild(document.createElement("br"));
    return cardBottomText;
}

function createCategoryUI(wine, cardBottomText) {

    var categoryHeading = document.createElement("div");
    categoryHeading.setAttribute("class", "heading");
    categoryHeading.appendChild(document.createTextNode("Category"));
    var category = document.createElement("div");
    category.appendChild(document.createTextNode(wine.getCategory()));

    cardBottomText.appendChild(categoryHeading);
    cardBottomText.appendChild(category);
    cardBottomText.appendChild(document.createElement("br"));
    return cardBottomText;
}

function createNameUI(wine, cardBottomText) {

    var name = document.createElement("div");
    name.setAttribute("class", "name");
    name.appendChild(document.createTextNode(wine.getName()));
    cardBottomText.appendChild(name);

    cardBottomText.appendChild(document.createElement("br"));
    cardBottomText.appendChild(document.createElement("hr"));
    return cardBottomText;
}