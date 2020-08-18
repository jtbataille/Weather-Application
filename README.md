# Weather Dashboard

## Table of Contents
* [Description](#description)
* [Technologies Used](#technologies-used)
* [Initial Usage](#initial-usage)
* [Continued Usage](#continued-usage)
* [Application Demo](#application-demo)
* [Deployed Application Link](#deployed-application-link)
* [Contact Me](#contact-information)

## Description

In this application, a user can search for a city (with a country tag for added specificity [IT, DE, US, etc.]) and receive the current weather for that locality. Moreover, the user will be provided with a 5-Day Forecast below the current day of upcoming weather.

## Technologies Used
* JavaScript
* HTML
* CSS
* OpenWeatherApp API

## Initial Usage
Upon opening the application, the user will see a Search Box wherein s/he will introduce the desired location to see the weather, which will bring up two things: the current day and the 5-Day Forecast.

In the current day view, the user can see his/her selected location, including City, Country, as well as the current date (dynamically updated with moment.js), and the icon portraying the weather for that day, updated based on the weather forecasted for 3 PM each day. Below this, the user will see the Temperature in Celsius, the percentage of Humidity, the current Wind Speed in meter(s) per second, and the UV Index. This UV Index is dynamically called based on the user's inputed location, and it will update its color based on the UV Index (green = good, yellow = OK, orange = be weary, red = bad, purple = stay inside).

In the 5-Day Forecast, the user will see five cards containing the day associated with that weather forecast, the icon/picture for that day's weather, the Temperature in Celsius, and the Humidity for that day.

## Continued Usage
As everything is saved to the Local Storage, the user's past search results are kept in the lefthand column under the Search Input. While each new search will re-write what the user sees to the right (the current day and the 5-Day Forecast), the user may simply click the past searches to retrieve those results and see them again instead of re-typing the search, even upon page re-load.

## Application Demo
![Weather Dashboard](https://user-images.githubusercontent.com/65187093/89108808-889ce800-d409-11ea-892d-201d936b0440.gif)

## Deployed Application Link
[Click here to discover a world of weather!](https://jtbataille.github.io/Weather-Application/)

## Contact Information
* E-mail: jtbataille@gmail.com
* Portfolio: https://jtbataille.github.io/
