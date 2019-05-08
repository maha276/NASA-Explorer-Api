document.getElementById("searchButton").addEventListener("click", function(e) {
  e.preventDefault();
  fetchValue();
});

function fetchValue() {
  var input = document.getElementById("searchButton").value;
  //console.log("user input : ", input);
  fetch("/search?q=" + input)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //console.log("my data is : ", data);
      var background = document.createElement("image");
      bacground.href = data;
      background.appendChild(node);

      var element = document.getElementById("backgimg");
      element.appendChild(background);
    })
    .catch(function(error) {
      console.log(error);
    });
}
