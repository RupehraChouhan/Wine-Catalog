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
    searchByName();
//    displayWines(filteredWines);


});


function displayWines(filteredWines) {

    /* Clear all the previous wines that are displaying */
    document.getElementById("allWines").innerHTML = "";

    console.log("filtered wines: " + filteredWines.length);

    filteredWines = sortResult(filteredWines);


    /* Create list item <li> for each wine object and add it to <ol> tag*/
    for(i = 0; i < filteredWines.length; i++) {
        var wine = filteredWines[i];

        var wineInfo = wine.getId() + " "+ wine.getCategory() + " " + wine.getName() + " " +
         wine.getVolume() + " " + wine.getCountry() + " " + wine.getProducer() + " " + wine.getPrice();

        var listItem = document.createElement("LI");
        listItem.setAttribute("id", wine.getId());

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

    //displayWines();
    searchByName();

}

function searchByName() {
    searchTextBox = document.getElementById("search");
    input = searchTextBox.value.toLowerCase();

    console.log("input: " + input);

    var filterWinesByName = _.filter(filteredWines, function(wine) {
        return wine.getName().toLowerCase().indexOf(input) != -1;
    });

    //displayWinesAfterSearch(filterWinesByName);

    var sortedResult = sortResult(filterWinesByName)

//    displayWines(filterWinesByName);
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

    console.log("sortby: "+sortOption);

    if (sortOption.indexOf("Dsc") != -1) {
        console.log("dsc: " + result.length);

        return result.reverse();
    }
    return result;

}

