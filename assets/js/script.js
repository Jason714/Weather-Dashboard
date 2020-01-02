var currentCity = [];
console.log(currentCity);
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

$(".search").on("click", function(e) {
  e.preventDefault();

  var city = $("#city")
    .val()
    .trim();

  currentCity.unshift(city);

  storeCities();
  renderCities();
  diplayCurrent();
  displayFiveDay();
});

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(currentCity));
}

function renderCities() {}

function diplayCurrent() {
  var city = currentCity[0];
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&APPID=7a467ef5535c9765c6faa560b6033702";
  // Performing the AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $(".curr-city").text(response.name + " ");

    $(".curr-date").text("(" + moment().format("L") + ")" + " ");

    $(".curr-icon").attr(
      "src",
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
    );

    $(".curr-temp").text(
      "Temperature: " +
        response.main.temp +
        " " +
        String.fromCharCode(176) +
        "F"
    );

    $(".curr-humid").text("Humidity: " + response.main.humidity + "%");
    $(".curr-speed").text("Wind Speed: " + response.wind.speed + " MPH");

    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/uvi?appid=7a467ef5535c9765c6faa560b6033702&lat=" +
        response.coord.lat +
        "&lon=" +
        response.coord.lon,
      method: "GET"
    }).then(function(response) {
      $(".uv-index").removeClass("hide");
      $(".curr-index").text("UV Index: ");

      $(".uv-index").text(response.value);
    });
  });
}

function displayFiveDay() {
  var city = currentCity[0];
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&APPID=7a467ef5535c9765c6faa560b6033702";
  // Performing the AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var dayOne = $(".day1");
    dayOne.append($("<p>").text(response.list[0].dt_txt.substring(0, 10)));

    dayOne.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[0].weather[0].icon +
          ".png"
      )
    );

    dayOne.append(
      $("<p>").text(
        "Temp: " +
          response.list[0].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );

    dayOne.append(
      $("<p>").text("Humidity: " + response.list[0].main.humidity + "%")
    );

    var dayTwo = $(".day2");

    dayTwo.append($("<p>").text(response.list[8].dt_txt.substring(0, 10)));

    dayTwo.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[8].weather[0].icon +
          ".png"
      )
    );

    dayTwo.append(
      $("<p>").text(
        "Temp: " +
          response.list[8].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );

    dayTwo.append(
      $("<p>").text("Humidity: " + response.list[8].main.humidity + "%")
    );

    var dayThree = $(".day3");

    dayThree.append($("<p>").text(response.list[16].dt_txt.substring(0, 10)));

    dayThree.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[16].weather[0].icon +
          ".png"
      )
    );

    dayThree.append(
      $("<p>").text(
        "Temp: " +
          response.list[16].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );

    dayThree.append(
      $("<p>").text("Humidity: " + response.list[16].main.humidity + "%")
    );

    var dayFour = $(".day4");

    dayFour.append($("<p>").text(response.list[24].dt_txt.substring(0, 10)));

    dayFour.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[24].weather[0].icon +
          ".png"
      )
    );

    dayFour.append(
      $("<p>").text(
        "Temp: " +
          response.list[24].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );

    dayFour.append(
      $("<p>").text("Humidity: " + response.list[24].main.humidity + "%")
    );

    var dayFive = $(".day5");

    dayFive.append($("<p>").text(response.list[32].dt_txt.substring(0, 10)));

    dayFive.append(
      $("<img class='icon'>").attr(
        "src",
        "http://openweathermap.org/img/w/" +
          response.list[32].weather[0].icon +
          ".png"
      )
    );

    dayFive.append(
      $("<p>").text(
        "Temp: " +
          response.list[32].main.temp +
          " " +
          String.fromCharCode(176) +
          "F"
      )
    );

    dayFive.append(
      $("<p>").text("Humidity: " + response.list[32].main.humidity + "%")
    );
  });
}
