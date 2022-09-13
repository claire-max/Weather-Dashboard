$(document).ready(function () {
    //Search button 
    $("#search-button").on("click", function () {
      
        var searchTerm = $("#search-value").val();

        $("#search-value").val("");
        weatherFunction(searchTerm);
        weatherForecast(searchTerm);
    });

    $("#search-button").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13) {
            weatherFunction(searchTerm);
            weatherForecast(searchTerm);
        }
    });

    //Pulling searches from LocalStorage
    var history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length > 0) {
        weatherFunction(history[history.length - 1]);
    }

    //making row for all elements in history 
    for (var i = 0; i < history.length; i++) {
        createRow(history[i]);
    }

    //list item on click function
    $(".history").on("click", "li", function () {
        weatherFunction($(this).text());
        weatherForecast($(this).text());
    })

    //Makes searched cities available to see under previous searches
    function createRow(text) {
        var listItem = $("<li>").addClass("list-group-item").text(text);
        $(".history").append(listItem);
    }
   
    function weatherFunction(searchTerm) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=31403ccb834a06595ac2a87778988d87",
        
        }).then(function (data) {
      if (history.indexOf(searchTerm) === -1) {
        //push searchvalue to history
        history.push(searchTerm);
        //Item pushed into local storage
        localStorage.setItem("history", JSON.stringify(history));
        createRow(searchTerm);
      }

      $("#today").empty();

      var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
      var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
      var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + " %");
      var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " K");
      console.log(data)
      var lon = data.coord.lon;
      var lat = data.coord.lat;


      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=31403ccb834a06595ac2a87778988d87&lat=" + lat + "&lon=" + lon,
      
    }).then(function(response) {
        console.log(response);

        vat
    })


        })
    }

})