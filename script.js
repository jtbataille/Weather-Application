$(document).ready(function() {
  $("#search-button").on("click", function() {
    var searchValue = $("#search-value").val();

    // clear input box
    $("#search-value").val("");

    searchWeather(searchValue);
  });

  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=9ad43bd7d81eeecac50dd047c44c95d9",
      dataType: "json",
      success: function(data) {
        console.log(data);
        // create history link for this search
        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));
    
          makeRow(searchValue);
        }
        
        // clear any old content
        $("#today").empty();

        // create html content for current weather
        var cardHeader = $("<div>").addClass("card-header");
        $("#today").append(cardHeader);

        var cardBodyDiv = $("<div>").addClass("card-body border");
        
        // Add current city/country, date, and icon here
        var currentPlace = $("<span>").text(data.name + ", " + data.sys.country);
        cardHeader.append(currentPlace);
        var newDate = moment().format(" DD-MM-YYYY ");
        cardHeader.append(newDate);
        var iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var icon = $("<img src='" + iconURL + "'>");
        cardHeader.append(icon);

        var temp = (data.main.temp - 273.15);
        var pTemp = $("<p>").addClass("pl-2 pt-2").text("Temperature: " + temp.toFixed(2) + "°C");
        cardBodyDiv.append(pTemp);

        var humidity = (data.main.humidity);
        var pHumidity = $("<p>").addClass("pl-2 pt-2").text("Humidity: " + humidity + "%");
        cardBodyDiv.append(pHumidity);

        var windSpeed = (data.wind.speed);
        var pWindSpeed = $("<p>").addClass("pl-2 pt-2").text("Wind Speed: " + windSpeed + " m/s");
        cardBodyDiv.append(pWindSpeed);

        // merge and add to page
        $("#today").append(cardBodyDiv);
        // call follow-up api endpoints
        getForecast(searchValue);
        getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }
  
  function getForecast(searchValue) {
    $.ajax({
      type: "",
      url: "" + searchValue + "",
      dataType: "json",
      success: function(data) {
        // overwrite any existing content with title and empty row

        // loop over all forecasts (by 3-hour increments)
        for (var i = 0; i < data.list.length; i++) {
          // only look at forecasts around 3:00pm
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            // create html elements for a bootstrap card
            var fiveDay = $("<div>").addClass("card text-white bg-primary mb-3");

            // merge together and put on page
          }
        }
      }
    });
  }

  function getUVIndex(lat, lon) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/uvi?appid=9ad43bd7d81eeecac50dd047c44c95d9&lat=" + lat + "&lon=" + lon,
      dataType: "json",
      success: function(data) {
        var uv = $("<p>").addClass("pl-2 pt-2").text("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").text(data.value);
        
        // change color depending on uv value
        if (data.value <= 2) {
          btn.css("background-color", "green");
        } else if (data.value <= 5) {
          btn.css("background-color", "yellow");
        } else if (data.value <= 7) {
          btn.css("background-color", "orange");
        } else if (data.value <= 10) {
          btn.css("background-color", "red");
        } else if (data.value <= 50) {
          btn.css("background-color", "purple");
        };
        
        $("#today .card-body").append(uv.append(btn));
      }
    });
  }

  // get current history, if any
  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  if (history.length > 0) {
    searchWeather(history[history.length-1]);
  }

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
});
