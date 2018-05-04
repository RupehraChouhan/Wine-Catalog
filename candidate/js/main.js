// wait for the document to be loaded

var allWineObjects = [];
var filteredWines = []; //wines that are displayed at the moment

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
    displayWines();

});


function displayWines() {

    /* Clear all the previous wines that are displaying */
    document.getElementById("allWines").innerHTML = "";

    /* Create list item <li> for each wine object and add it to <ol> tag*/
    for(i = 0; i < filteredWines.length; i++) {
        var wine = filteredWines[i];
        var listItem = document.createElement("LI");
        listItem.setAttribute("id", wine.getId());
        var wineInfo = wine.getId() + " "+ wine.getCategory() + " " + wine.getName() + " " + wine.getPrice();
        wineInfo += wine.getVolume() + " " + wine.getCountry() + " " + wine.getProducer();
        var node = document.createTextNode(wineInfo);
        listItem.append(node);
        document.getElementById("allWines").appendChild(listItem);
    }

}


function filterWineByCategory(wineCategory) {

    var wineCategoryValue = wineCategory.getAttribute('value');

    if (wineCategoryValue == "ALL") {
        filteredWines = allWineObjects;
    }
    else {
        /* Filter wines based on the category selected */
        filteredWines = _.filter(allWineObjects, function(wine) {
            return wine.getCategory() == wineCategoryValue;
        }) ;
    }

    displayWines();

}

function searchByName() {
    searchTextBox = document.getElementById("search");
    input = searchTextBox.value.toLowerCase();

    var filterWinesByName = _.filter(filteredWines, function(wine) {
        return wine.getName().toLowerCase().indexOf(input) != -1;
    });

    displayWinesAfterSearch(filterWinesByName);

}

function displayWinesAfterSearch(wines) {

    console.log("wines to display: " + wines.length);

    /* Clear all the previous wines that are displaying */
    document.getElementById("allWines").innerHTML = "";

    /* Create list item <li> for each wine object and add it to <ol> tag*/
    for(i = 0; i < wines.length; i++) {
        var wine = wines[i];
        var listItem = document.createElement("LI");
        listItem.setAttribute("id", wine.getId());
        var wineInfo = wine.getId() + " "+ wine.getCategory() + " " + wine.getName() + " " + wine.getPrice();
        wineInfo += wine.getVolume() + " " + wine.getCountry() + " " + wine.getProducer();
        var node = document.createTextNode(wineInfo);
        listItem.append(node);
        document.getElementById("allWines").appendChild(listItem);
    }

}