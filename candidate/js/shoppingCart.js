/* This file contains functions operating on the shopping
    cart
*/

function addWineToCart(btn) {

    //get the CatalogItem ID
    var id = btn.id.split("btn")[0];

    if (id in shoppingCart) {
        var item = shoppingCart[id];

        // update the item quantity and amount
        item.updateItemInfo();

        var row = document.getElementById("row"+id);
        $(row).find("td:nth-child(2)").html(item.getQuantity());
        $(row).find("td:nth-child(5)").html(item.getAmount().toFixed(2));

    }
    else {
        // create new shopping item and add it to the cart
        var catalogItem = Catalog[id];
        var shoppingCartItem = new ShoppingItem(
                        catalogItem.getName(), catalogItem.getPrice());

        shoppingCart[id] = shoppingCartItem;
        addItemToCartUI(id);

    }

    updateTotal(id);
    updateTotalAmountInUI();

}

function addItemToCartUI(id) {

    var cart = document.getElementById("shoppingItems");

    //create new row
    var row = document.createElement("tr");
    row.setAttribute("id", "row"+id);

    //create all the columns
    var crossCol = createCrossColumn();
    var qtyCol = createQtyColumn(id);
    var descriptionCol = createDescriptionColumn(id);
    var priceCol =  createPriceColumn(id);
    var amountCol = createAmountColumn(id);

    // add all the columns to the row
    row.appendChild(crossCol);
    row.appendChild(qtyCol);
    row.appendChild(descriptionCol);
    row.appendChild(priceCol);
    row.appendChild(amountCol);

    //add the row to the table
    cart.appendChild(row);
}

function createCrossColumn() {

    var crossCol = document.createElement("td");
    crossCol.setAttribute("class", "cross");

    var crossBtn = document.createElement("button");
    crossBtn.setAttribute("onclick","deleteItemFromCart(this)")
    crossBtn.appendChild(document.createTextNode("x"));
    crossCol.appendChild(crossBtn);

    return crossCol;

}

function createQtyColumn(id) {

    var qtyCol = document.createElement("td");
    qtyCol.setAttribute("class", "qty");
    qtyCol.appendChild(document.createTextNode(shoppingCart[id].getQuantity()));
    return qtyCol;

}

function createDescriptionColumn(id) {

    var descriptionCol = document.createElement("td");
    descriptionCol.setAttribute("class", "description");
    descriptionCol.appendChild(document.createTextNode(shoppingCart[id].getDescription()));
    return descriptionCol;

}

function createPriceColumn(id) {

    var priceCol = document.createElement("td");
    priceCol.setAttribute("class", "price");
    priceCol.appendChild(document.createTextNode(shoppingCart[id].getPrice()));
    return priceCol;
}


function createAmountColumn(id) {

    var amountCol = document.createElement("td");
    amountCol.setAttribute("class", "amount")
    amountCol.appendChild(document.createTextNode(shoppingCart[id].getAmount()));
    return amountCol;

}

function showCart(element) {

    var status = $(element).parent().find(".shoppingPanel").css("display");

    if (status == "block") {
        $(element).parent().find(".shoppingPanel").css("display", "none");
    }
    else{
        $(element).parent().find(".shoppingPanel").css("display", "block");
    }
}


function deleteItemFromCart(row) {

    var idStr  = $(row).parent().parent().attr("id");
    var rowIdArray = idStr.split("row");
    var rowId = rowIdArray[1];

    total = total - shoppingCart[rowId].getAmount();

    //delete the item from shopping cart
    shoppingCart = _.omit(shoppingCart, rowId);
    $("#"+idStr).remove();

    updateTotalAmountInUI() ;
}

function updateTotalAmountInUI() {
    $("#row .amount").html(total.toFixed(2));
}

function updateTotal(id) {
    total = total + shoppingCart[id].getPrice();
}