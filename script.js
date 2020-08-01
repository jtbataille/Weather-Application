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
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=9ad43bd7d81eeecac50dd047c44c95d9",
      dataType: "json",
      success: function(data) {
        // overwrite any existing content with title and empty row
        console.log(data);
        $("day1Card").empty();
        $("day2Card").empty();
        $("day3Card").empty();
        $("day4Card").empty();
        $("day5Card").empty();
        // loop over all forecasts (by 3-hour increments)
        for (var i = 0; i < data.list.length; i++) {
          // only look at forecasts around 3:00pm
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            // create html elements for a bootstrap card
            $("#forecast").append($("<h4>").text("Five-Day Forecast:"));
            // Card Day 1
            var day1Card = $("<div>").addClass("card text-white bg-primary mb-3");
            
            var day1Time = moment().add(1, "days").format(" DD/MM/YYYY");
            var dayOne = $("<div>").addClass("card-header").text(day1Time);

            var day1IconUrl = "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
            var day1Icon = $("<img src='" + day1IconUrl + "'>").addClass("card-text").text(day1Icon);

            var day1T = (data.list[0].main.temp - 273.15);
            var day1Temp = $("<p>").addClass("card-text p-2").text("Temp: " + day1T + "°C");

            var day1H = (data.list[0].main.humidity);
            var day1Humidity = $("<p>").addClass("card-text p-2").text("Humidity: " + day1H + "%");

            day1Card.append(dayOne, day1Icon, day1Temp, day1Humidity);
            
            // Card Day 2
            var day2Card = $("<div>").addClass("card text-white bg-primary mb-3");
            
            var day2Time = moment().add(2, "days").format(" DD/MM/YYYY");
            var dayTwo = $("<div>").addClass("card-header").text(day2Time);

            var day2IconUrl = "http://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png";
            var day2Icon = $("<img src='" + day2IconUrl + "'>").addClass("card-text").text(day2Icon);

            var day2T = (data.list[1].main.temp - 273.15);
            var day2Temp = $("<p>").addClass("card-text p-2").text("Temp: " + day2T + "°C");

            var day2H = (data.list[1].main.humidity);
            var day2Humidity = $("<p>").addClass("card-text p-2").text("Humidity: " + day2H + "%");

            day2Card.append(dayTwo, day2Icon, day2Temp, day2Humidity);

            // Card Day 3
            var day3Card = $("<div>").addClass("card text-white bg-primary mb-3");
            
            var day3Time = moment().add(3, "days").format(" DD/MM/YYYY");
            var dayThree = $("<div>").addClass("card-header").text(day3Time);

            var day3IconUrl = "http://openweathermap.org/img/w/" + data.list[2].weather[0].icon + ".png";
            var day3Icon = $("<img src='" + day3IconUrl + "'>").addClass("card-text").text(day3Icon);

            var day3T = (data.list[2].main.temp - 273.15);
            var day3Temp = $("<p>").addClass("card-text p-2").text("Temp: " + day3T + "°C");

            var day3H = (data.list[2].main.humidity);
            var day3Humidity = $("<p>").addClass("card-text p-2").text("Humidity: " + day3H + "%");

            day3Card.append(dayThree, day3Icon, day3Temp, day3Humidity);

            // Card Day 4
            var day4Card = $("<div>").addClass("card text-white bg-primary mb-3");
            
            var day4Time = moment().add(4, "days").format(" DD/MM/YYYY");
            var dayFour = $("<div>").addClass("card-header").text(day4Time);

            var day4IconUrl = "http://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png";
            var day4Icon = $("<img src='" + day4IconUrl + "'>").addClass("card-text").text(day4Icon);

            var day4T = (data.list[3].main.temp - 273.15);
            var day4Temp = $("<p>").addClass("card-text p-2").text("Temp: " + day4T + "°C");

            var day4H = (data.list[3].main.humidity);
            var day4Humidity = $("<p>").addClass("card-text p-2").text("Humidity: " + day4H + "%");

            day4Card.append(dayFour, day4Icon, day4Temp, day4Humidity);

            // Card Day 5
            var day5Card = $("<div>").addClass("card text-white bg-primary mb-3");
            
            var day5Time = moment().add(5, "days").format(" DD/MM/YYYY");
            var dayFive = $("<div>").addClass("card-header").text(day5Time);

            var day5IconUrl = "http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png";
            var day5Icon = $("<img src='" + day5IconUrl + "'>").addClass("card-text").text(day5Icon);

            var day5T = (data.list[4].main.temp - 273.15);
            var day5Temp = $("<p>").addClass("card-text p-2").text("Temp: " + day5T + "°C");

            var day5H = (data.list[4].main.humidity);
            var day5Humidity = $("<p>").addClass("card-text p-2").text("Humidity: " + day5H + "%");

            day5Card.append(dayFive, day5Icon, day5Temp, day5Humidity);
            // merge together and put on page
            $("#forecast").append(day1Card, day2Card, day3Card, day4Card, day5Card);
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
