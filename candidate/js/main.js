// wait for the document to be loaded
$(document).ready(function() {
    /* TODO: Implement solution here */

    for(i = 0; i < all_wine_ids.length; i++) {
    	id = all_wine_ids[i];
    	var wine = Catalog[id];
    	var listTag = document.createElement("LI");
    	var wineInfo = wine.getId() + " "+ wine.getCategory() + " " + wine.getName() + " " + wine.getPrice();
    	var node = document.createTextNode(wineInfo);
    	//document.write(wineInfo);
    	listTag.append(node);
    	document.getElementById("allWines").appendChild(listTag);
    }
 

});
