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

function filterWineByCategory(wineCategory) {


    $(wineCategory).siblings().removeClass('active');
    $(wineCategory).addClass('active');


    var wineCategoryValue = wineCategory.getAttribute('value');

    if (wineCategoryValue == "ALL") {
        filteredWines = allWineObjects;
    }
    else {

        /* Filter wines based on the category selected */
        filteredWines = _.filter(allWineObjects, function(wine) {
            return wine.getCategory() == wineCategoryValue;
        });
    }

    searchByName();
}

function searchByName() {

    searchTextBox = document.getElementById("search");
    input = searchTextBox.value.toLowerCase();

    var filterWinesByName = _.filter(filteredWines, function(wine) {
        return wine.getName().toLowerCase().indexOf(input) != -1;
    });

    var sortedResult = sortResult(filterWinesByName);

    displayWines(sortedResult);
}

function sortResult(wines) {

    var selectBox = document.getElementById("selectBox");
    var sortOption = selectBox.options[selectBox.selectedIndex].value;

    var result = [];

    if (sortOption.indexOf("name") != -1 ) {
        result = _.sortBy(wines, function(wine) {
            return wine.getName();
        });
    }
    else if (sortOption.indexOf("category") != -1) {
        result = _.sortBy(wines, function(wine) {
            return wine.getCategory();
        });
    }
    else if (sortOption.indexOf("volume") != -1) {
        result = _.sortBy(wines, function(wine) {
            return wine.getVolume();
        });
    }
    else if (sortOption.indexOf("price") != -1) {
         result = _.sortBy(wines, function(wine) {
            return wine.getPrice();
         });
    }
    else if (sortOption.indexOf("country") != -1) {
        result = _.sortBy(wines, function(wine) {
            return wine.getCountry();
        });
    }
    else {
        result = _.sortBy(wines, function(wine) {
            return wine.getProducer();
        });
    }

    if (sortOption.indexOf("Dsc") != -1) {
        console.log("dsc: " + result.length);

        return result.reverse();
    }

    return result;
}

function addWineToCart(btn) {

    //key is the CatalogItem ID
    var id = btn.id.split("btn")[0];

    if (id in shoppingCart) {
        console.log("exists");

        var item = shoppingCart[id];
        item.updateItemInfo();

    }
    else {
        console.log("create new shopping item");

        var catalogItem = Catalog[id];
        var shoppingCartItem = new ShoppingItem(
                        catalogItem.getName(), catalogItem.getPrice());

        shoppingCart[id] = shoppingCartItem;

    }

    console.log(shoppingCart[id].getDescription() + " " + shoppingCart[id].getQuantity() +
        " " + shoppingCart[id].getPrice() + " " + shoppingCart[id].getAmount());

    updateTotal(id);

}

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

        var cardBottomName = document.createTextNode(wine.getName());
        cardBottom.appendChild(cardBottomName);


        card.appendChild(cardTop);
        card.appendChild(cardMiddle);
        card.appendChild(cardBottom);


        var centerPanel = document.getElementById("allCards");
        centerPanel.appendChild(card);
    }
}
