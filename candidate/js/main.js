// wait for the document to be loaded

var allWineObjects = [];
var filteredWines = []; //wines that are displayed at the moment
var shoppingCart = {};
var total = 0;

$(document).ready(function() {
    /* TODO: Implement solution here */

    /* Gather all the wine object from Catalog into an array */
    for (i = 0; i < all_wine_ids.length; i++) {
        id = all_wine_ids[i];
        var wine = Catalog[id];
        allWineObjects.push(wine);
    }

    /* Initially display ALL the wines */
    filteredWines = allWineObjects;
    searchByName();
});



function updateTotal(id) {

    total = total + shoppingCart[id].getPrice();
    console.log("total: " + total);

}

function displayWines(filteredWines) {

    /* Clear all the previous wines that are displaying */

    document.getElementById("allCards").innerHTML = "";

    console.log("filtered wines: " + filteredWines.length);

    filteredWines = sortResult(filteredWines);

    /* Create list item <li> for each wine object and add it to <ol> tag*/
    for(i = 0; i < filteredWines.length; i++) {
        var wine = filteredWines[i];

        var wineInfo = wine.getId() + " "+ wine.getCategory() + " " + wine.getName() + " " +
         wine.getVolume() + " " + wine.getCountry() + " " + wine.getProducer() + " " + wine.getPrice();

        var card = document.createElement("div");
        card.setAttribute("class", "card");
        card.setAttribute("id", wine.getId());

        //create top portion of the card
        var cardTop = document.createElement("div");
        cardTop.setAttribute("class", "cardTop");

        //create button
        var btnOuterDiv = document.createElement("div");
        btnOuterDiv.setAttribute("class", "cardPlusButton");

        var btn = document.createElement("BUTTON");
        btn.setAttribute("onclick", "addWineToCart(this)");
        btn.setAttribute("id", wine.getId()+"btn");
        var btnText = document.createTextNode("+");
        btn.appendChild(btnText);

        btnOuterDiv.appendChild(btn);

        //create price div
        var priceDiv = document.createElement("div");
        priceDiv.setAttribute("class", "winePrice");
        var price = document.createTextNode("$"+wine.getPrice());
        priceDiv.appendChild(price);

        cardTop.appendChild(btnOuterDiv);
        cardTop.appendChild(priceDiv);

        var cardMiddle = document.createElement("div");
        cardMiddle.setAttribute("class", "cardMiddle");

        //create image div
        var image = document.createElement("IMG");
        image.setAttribute("class", "cardImg");
        image.setAttribute("src", "images/catalog/"+wine.getId()+".png");

        //add image to middle card
        cardMiddle.appendChild(image);

        var cardBottom = document.createElement("div");
        cardBottom.setAttribute("class", "cardBottom");
        cardBottom.setAttribute("onmouseover","removeCardElements(this)");
        cardBottom.setAttribute("onmouseout", "addCardElements(this)");

        var cardBottomText = document.createElement("div");
        cardBottomText.setAttribute("class", "cardBottomText");

        var name = document.createElement("div");
        name.setAttribute("class", "name");
        name.appendChild(document.createTextNode(wine.getName()));

        cardBottomText.appendChild(name);

        cardBottomText.appendChild(document.createElement("br"));
        cardBottomText.appendChild(document.createElement("hr"));

        var categoryHeading = document.createElement("div");
        categoryHeading.setAttribute("class", "heading");
        categoryHeading.appendChild(document.createTextNode("Category"));
        var category = document.createElement("div");
        category.appendChild(document.createTextNode(wine.getCategory()));

        cardBottomText.appendChild(categoryHeading);
        cardBottomText.appendChild(category);
        cardBottomText.appendChild(document.createElement("br"));

        var volumeHeading = document.createElement("div");
        volumeHeading.setAttribute("class", "heading");
        volumeHeading.appendChild(document.createTextNode("Volume"));
        var volume = document.createElement("div");
        volume.appendChild(document.createTextNode(wine.getVolume()));

        cardBottomText.appendChild(volumeHeading);
        cardBottomText.appendChild(volume);
        cardBottomText.appendChild(document.createElement("br"));

        var priceHeading = document.createElement("div");
        priceHeading.setAttribute("class", "heading");
        priceHeading.appendChild(document.createTextNode("Price"));
        var price = document.createElement("div");
        price.appendChild(document.createTextNode("$"+wine.getPrice()));

        cardBottomText.appendChild(priceHeading);
        cardBottomText.appendChild(price);
        cardBottomText.appendChild(document.createElement("br"));

        var countryHeading = document.createElement("div");
        countryHeading.setAttribute("class", "heading");
        countryHeading.appendChild(document.createTextNode("Country"));
        var country = document.createElement("div");
        country.appendChild(document.createTextNode(wine.getCountry()));

        cardBottomText.appendChild(countryHeading);
        cardBottomText.appendChild(country);
        cardBottomText.appendChild(document.createElement("br"));

        var producerHeading = document.createElement("div");
        producerHeading.setAttribute("class", "heading");
        producerHeading.appendChild(document.createTextNode("Producer"));
        var producer = document.createElement("div");
        producer.appendChild(document.createTextNode(wine.getProducer()));

        cardBottomText.appendChild(producerHeading);
        cardBottomText.appendChild(producer);

        cardBottom.appendChild(cardBottomText);

        card.appendChild(cardTop);
        card.appendChild(cardMiddle);
        card.appendChild(cardBottom);


        var centerPanel = document.getElementById("allCards");
        centerPanel.appendChild(card);
    }
}


function removeCardElements(element) {
    $(element).find(".name").css("margin-bottom", "0px");
    $(element).parent().find(".cardPlusButton").css("display", "none");
    $(element).parent().find(".winePrice").css("display", "none");

}

function addCardElements(element) {
    $(element).find(".name").css("margin-bottom", "24px")
    $(element).parent().find(".cardPlusButton").css("display","block");
    $(element).parent().find(".winePrice").css("display", "block");
}

