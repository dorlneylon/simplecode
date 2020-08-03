$.getJSON('https://api.ipify.org?format=jsonp&callback=?', function(data) {
  console.log(data["ip"]);
});