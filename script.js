$(document).ready(function () {
    // Search button 
    $("#search-button").on("click", function () {
    // Value in input search-value
      var searchTerm = $("#search-value").val();
    // Empty input 
      $("#search-value").val("");
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
    });
  
    // Search button enter key press 
    $("#search-button").keypress(function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode === 13) {
        weatherFunction(searchTerm);
        weatherForecast(searchTerm);
      }
    });
  
    // Pulling previous searches from the local storage
    var history = JSON.parse(localStorage.getItem("history")) || [];
  
    // Setting history search to correct length
    if (history.length > 0) {
      weatherFunction(history[history.length - 1]);
    }
    // SearchTerms
    for (var i = 0; i < history.length; i++) {
      createRow(history[i]);
    }
  
    // Puts previous searched cities under search bar 
    function createRow(text) {
      var listItem = $("<li>").addClass("list-group-item").text(text);
      $(".history").append(listItem);
    }
  
    // Listener for list item on click function
    $(".history").on("click", "li", function () {
      weatherFunction($(this).text());
      weatherForecast($(this).text());
    });
  
    function weatherFunction(searchTerm) {
  
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=31403ccb834a06595ac2a87778988d87",
  
  
      }).then(function (data) {
    // If search value of index does not exist
        if (history.indexOf(searchTerm) === -1) {
    // Push searchValue to history array
          history.push(searchTerm);
    // Puts items into localStorage
          localStorage.setItem("history", JSON.stringify(history));
          createRow(searchTerm);
        }
    // Empties old content
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
  
  
        }).then(function (response) {
          console.log(response);
  
          var uvColor;
          var uvResponse = response.value;
          var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
          var btn = $("<span>").addClass("btn btn-sm").text(uvResponse);
  
  
          if (uvResponse < 3) {
            btn.addClass("btn-success");
          } else if (uvResponse < 7) {
            btn.addClass("btn-warning");
          } else {
            btn.addClass("btn-danger");
          }
  
          cardBody.append(uvIndex);
          $("#today .card-body").append(uvIndex.append(btn));
  
        });
  
    // Brings together and puts on page 
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);
        console.log(data);
      });
    }
    // Function weatherForecast searchTerm 
    function weatherForecast(searchTerm) {
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=31403ccb834a06595ac2a87778988d87&units=imperial",
  
      }).then(function (data) {
        console.log(data);
        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
  
    // Looping to create a new card for 5 days pull data image 
        for (var i = 0; i < data.list.length; i++) {
  
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
  
            var titleFive = $("<h3>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
            var imgFive = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
            var colFive = $("<div>").addClass("col-md-2.5");
            var cardFive = $("<div>").addClass("card bg-primary text-white");
            var cardBodyFive = $("<div>").addClass("card-body p-2");
            var humidFive = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
            var tempFive = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp + " °F");
  
           
            colFive.append(cardFive.append(cardBodyFive.append(titleFive, imgFive, tempFive, humidFive)));
            
            $("#forecast .row").append(colFive);
          }
        }
      });
    }
  
  });