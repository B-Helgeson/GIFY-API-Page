$(document).ready(function(){

// Populate the page "starwars buttons" (Array) with some starting predefined values

var starwarsButtons = [
                        "darth vader",
                        "yoda",
                        "boba fett",
                        "r2-d2",
                        "leia",
                        "darth maul"
                    ]

console.log(starwarsButtons)

//paint the initial array onto the page, into the "starwarsButtons" div
function refreshButtons(){
for (var i = 0; i < starwarsButtons.length; i++) {
    var starwarsBtn = $("<button class = 'btn btn-info'>");
    $(starwarsBtn).attr("data-character", starwarsButtons[i]);
    $(starwarsBtn).text(starwarsButtons[i]);
    $(starwarsBtn).appendTo("#starwarsButtons");
  };}

  //create a function which can be called to update the page, after a user enters a new value in the form
  refreshButtons();


//---------------------------------------------------------------------------------------------------------------

//enable user input "submit" to populate a new starwars button, trim and append to "starwars buttons"

$("#addCharacter").on("click", function() {
    var newCharacter = $("#character-input").val().trim();
    starwarsButtons.push(newCharacter);
    console.log(starwarsButtons)
    alert("you pushed the button!")
    refreshButtons()})
            //above function doesn't seem to be pushing to the array and updating the list... not sure why. 
            //the alert at the end of the function works, there is no error console-logged.


//-------------------------------------------------------------------------------------------------
//When a button is clicked "this", search in GIFY, return top 10 results for button

$("button").on("click", function() {
    // Clear out existing DIV
    $("#characters").empty();

    var char = $(this).attr("data-character");

    // Initialize API with Key and using char variable in the call. 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + char + "&api_key=dc6zaTOxFJmzC&rating=pg&limit=10"; 
    // limiting the response to 10 results and ensuring the results are all "PG"
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var characterDiv = $("<div>");
          characterDiv.addClass("swGif"); // adding a class to style the Gif 
          var swImage = $("<img>");
          swImage.attr("src", results[i].images.fixed_height.url);
          swImage.attr("data-state", "still"); // This should be making the data-state "still" to pause the gifs... Not working
          characterDiv.append(swImage);
          $("#characters").prepend(characterDiv);
        }
      });
  });


//-----------------------------------------------------------------------------------------------------------------
//enable a gif to animate only when clicked (should be still otherwise)

$(".gif").on("click", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


    
})