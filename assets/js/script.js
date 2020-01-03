// Variable array that will store searched cities
var searchedCity = [];
console.log(searchedCity);

// init();

// function init() {
//   // Parsing the JSON string to an object
//   var storedCities = JSON.parse(localStorage.getItem("cities"));

//   // If todos were retrieved from localStorage, update the todos array to it
//   if (storedCities !== null) {
//     currentCity = storedCities;
//   }

//   // Render todos to the DOM
//   renderCities();
// }

// Listener for search click and function to get the city from user input and push it to the [0] position in the searchedCity array, also calls the next functions to be executed
$(".search").on("click", function(e) {
  e.preventDefault();
  // Setting the value of city to equal the input value
  var city = $("#city")
    .val()
    .trim();
  // Push the city to the [0] position of the searchedCity array
  searchedCity.unshift(city);
  // Call the next functions
  storeCities();
  renderCities();
  diplayCurrent();
  displayFiveDay();
});
// Save the city that was searched to local storage
function storeCities() {
  localStorage.setItem("cities", JSON.stringify(searchedCity));
}
// Display any saved cities to the search sidebar
function renderCities() {}
// Get the current weather and diplay the returned information
function diplayCurrent() {
  // Variable to get the city to be searched from the searchedCity array
  var city = searchedCity[0];
  // URL to be used when making our API call
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&APPID=7a467ef5535c9765c6faa560b6033702";
  // Performing the AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Append the city name that is returned from the API call
    $(".curr-city").text(response.name + " ");
    // Append the current date using moment
    $(".curr-date").text("(" + moment().format("L") + ")" + " ");
    // Append the weather representation icon that is returned from the API call
    $(".curr-icon").attr(
      "src",
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );
    // Append the temperature that is returned from the API call
    $(".curr-temp").text(
      "Temperature: " +
        response.main.temp +
        " " +
        String.fromCharCode(176) +
        "F"
    );
    // Append the humidity that is returned from the API call
    $(".curr-humid").text("Humidity: " + response.main.humidity + "%");
    // Append the wind speed that is returned from the API call
    $(".curr-speed").text("Wind Speed: " + response.wind.speed + " MPH");
    // API call to get the UV index using the Lat & Lon that were returned from the original API call
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/uvi?appid=7a467ef5535c9765c6faa560b6033702&lat=" +
        response.coord.lat +
        "&lon=" +
        response.coord.lon,
      method: "GET"
    }).then(function(response) {
      // Removing the hide class from the UV index html framework
      $(".uv-index").removeClass("hide");
      // Adding a text value to the html framework
      $(".curr-index").text("UV Index: ");
      // Append the UV index that is returned from the second API call
      $(".uv-index").text(response.value);
    });
  });
}
// Get the five-day forecast and diplay the returned information
function displayFiveDay() {
  // Variable to get the city to be searched from the searchedCity array
  var city = searchedCity[0];
  // URL to be used when making our API call
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&APPID=7a467ef5535c9765c6faa560b6033702";
  // Performing the AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Variable to reference the first day forecasted in the html framework
    var dayOne = $(".day1");
    // Creating a p tag and appending it's text to be the date returned from the API call
    dayOne.append($("<p>").text(response.list[0].dt_txt.substring(0, 10)));
    // Creating an img tag and appending it's attribute to be an href pointing to icon data returned from the API call
    dayOne.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[0].weather[0].icon +
          ".png"
      )
    );
    // Creating a p tag and appending it's text to be the temperature returned from the API call
    dayOne.append(
      $("<p>").text(
        "Temp: " +
          response.list[0].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );
    // Creating a p tag and appending it's text to be the humidity returned from the API call
    dayOne.append(
      $("<p>").text("Humidity: " + response.list[0].main.humidity + "%")
    );
    // Variable to reference the second day forecasted in the html framework
    var dayTwo = $(".day2");
    // Creating a p tag and appending it's text to be the date returned from the API call
    dayTwo.append($("<p>").text(response.list[8].dt_txt.substring(0, 10)));
    // Creating an img tag and appending it's attribute to be an href pointing to icon data returned from the API call
    dayTwo.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[8].weather[0].icon +
          ".png"
      )
    );
    // Creating a p tag and appending it's text to be the temperature returned from the API call
    dayTwo.append(
      $("<p>").text(
        "Temp: " +
          response.list[8].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );
    // Creating a p tag and appending it's text to be the humidity returned from the API call
    dayTwo.append(
      $("<p>").text("Humidity: " + response.list[8].main.humidity + "%")
    );
    // Variable to reference the third day forecasted in the html framework
    var dayThree = $(".day3");
    // Creating a p tag and appending it's text to be the date returned from the API call
    dayThree.append($("<p>").text(response.list[16].dt_txt.substring(0, 10)));
    // Creating an img tag and appending it's attribute to be an href pointing to icon data returned from the API call
    dayThree.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[16].weather[0].icon +
          ".png"
      )
    );
    // Creating a p tag and appending it's text to be the temperature returned from the API call
    dayThree.append(
      $("<p>").text(
        "Temp: " +
          response.list[16].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );
    // Creating a p tag and appending it's text to be the humidity returned from the API call
    dayThree.append(
      $("<p>").text("Humidity: " + response.list[16].main.humidity + "%")
    );
    // Variable to reference the fourth day forecasted in the html framework
    var dayFour = $(".day4");
    // Creating a p tag and appending it's text to be the date returned from the API call
    dayFour.append($("<p>").text(response.list[24].dt_txt.substring(0, 10)));
    // Creating an img tag and appending it's attribute to be an href pointing to icon data returned from the API call
    dayFour.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[24].weather[0].icon +
          ".png"
      )
    );
    // Creating a p tag and appending it's text to be the temperature returned from the API call
    dayFour.append(
      $("<p>").text(
        "Temp: " +
          response.list[24].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );
    // Creating a p tag and appending it's text to be the humidity returned from the API call
    dayFour.append(
      $("<p>").text("Humidity: " + response.list[24].main.humidity + "%")
    );
    // Variable to reference the fifth day forecasted in the html framework
    var dayFive = $(".day5");
    // Creating a p tag and appending it's text to be the date returned from the API call
    dayFive.append($("<p>").text(response.list[32].dt_txt.substring(0, 10)));
    // Creating an img tag and appending it's attribute to be an href pointing to icon data returned from the API call
    dayFive.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[32].weather[0].icon +
          ".png"
      )
    );
    // Creating a p tag and appending it's text to be the temperature returned from the API call
    dayFive.append(
      $("<p>").text(
        "Temp: " +
          response.list[32].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );
    // Creating a p tag and appending it's text to be the humidity returned from the API call
    dayFive.append(
      $("<p>").text("Humidity: " + response.list[32].main.humidity + "%")
    );
  });
}
