function ShoppingItem(description, price) {

    //declare these as private variables
    var quantity = 1;
    var description = description;
    var price = price;
    var amount = quantity * price;

    //simple getter methods
    this.getQuantity = function() { return quantity; }
    this.getDescription = function() { return description; }
    this.getPrice = function() { return price; }
    this.getAmount = function() { return amount; }

    //simple setter methods
    this.updateItemInfo = function() {
        quantity =  quantity + 1 ;
        amount = quantity * price;
    }






}