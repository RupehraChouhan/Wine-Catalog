/**
 * This file contains globally accessible helper variables and methods.
 *
 * TODO: You are free to add any additional helper methods and properties here
 * to help in your implementation.
 */

var allWineObjects = [];
var filteredWines = []; //wines that are displayed at the moment
var shoppingCart = {};
var total = 0;


/* Some DOM manipulating functions*/

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
