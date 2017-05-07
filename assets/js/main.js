$(function() {
  const $spanTimeZone = $("#timeZone");
  const $spanDegrees = $("#spanDegrees");
  const $btnChange = $("#btnChange");
  const $footer = $("footer");
  const $body = $("body");

  var dsKey = "4fb8edf36f2f51939eb20027e369df9f",
      dsUrl = "https://api.darksky.net/forecast/" + dsKey + "/",
      currentValue = 0,
      isCelsius = false;

  const imageUrls = {
    "clear-day": "https://source.unsplash.com/WLUHO9A_xik/",
    "clear-night": "https://source.unsplash.com/ZpQC8Lb8Lg0/",
    "rain": "https://source.unsplash.com/cSe3oKQ03OQ/",
    "snow": "https://source.unsplash.com/R6ZlnE1zdS4/",
    "sleet": "https://source.unsplash.com/0QhXAI5bFVM/",
    "wind": "https://source.unsplash.com/kmF_Aq8gkp0/",
    "fog": "https://source.unsplash.com/fvp1d197Gi0/",
    "cloudy": "https://source.unsplash.com/qger6A-oNbo/",
    "partly-cloudy-day": "https://source.unsplash.com/IdMAtB9cVpg/",
    "partly-cloudy-night": "https://source.unsplash.com/aIiEOoEA5ps/",
  };

  function loadWeather(){
    $.getJSON('http://ipinfo.io', function(data){
        var loc = data.loc.split(",");

        call(loc[0], loc[1]);
    });
  }
  loadWeather();

  function call(lat, long)
  {
    var reqUrl = dsUrl + lat + "," + long,
        imgUrl;
    $.ajax({
      type: "GET",
      url: reqUrl,
      dataType: "jsonp",
      success: function(data) {
        $spanTimeZone.text(data.timezone.replace("_", " "));
        $spanDegrees.text(data.currently.temperature.toFixed(2) + (isCelsius ? " ºC" : " ºF"));
        $footer.removeClass('hidden');
        currentValue = data.currently.temperature;

        imgUrl = imageUrls[data.currently.icon] + $(window).width() + "x" + $(window).height();

        $body.css("background-image", "url(images/overlay.png), linear-gradient(60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)), url(" + imgUrl + ")");
      }
    });
  }

  $btnChange.click(function (ev) {
    ev.preventDefault();
    isCelsius = !isCelsius;

    if (isCelsius) {
      currentValue = (currentValue - 32) / 1.8;
    }
    else {
      currentValue = currentValue * 1.8 + 32;
    }

    $spanDegrees.text(currentValue.toFixed(2) + (isCelsius ? " ºC" : " ºF"));
  });

  // $(window).resize(loadWeather);
});
