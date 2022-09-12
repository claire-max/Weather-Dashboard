$(document).ready(function () {
    //Search button 
    $("#search-button").on("click", function () {
      
        var searchTerm = $("#search-value").val();

        $("#search-value").val("");
        weatherFunction(searchTerm);
        weatherFunction(searchTerm);
    });
    
})