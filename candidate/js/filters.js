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