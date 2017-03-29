
privatBankApp.filter("sliceArray", function(){
    return function(input, currentPage, itemsOnPage){

        if(!input){
            return;
        }

        var startIndex = (currentPage - 1) * itemsOnPage;

        var newArray = input.slice(startIndex, startIndex + itemsOnPage);

        return newArray;

    }
});
