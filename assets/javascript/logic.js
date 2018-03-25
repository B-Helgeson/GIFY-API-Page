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
    $("#starwarsButtons").empty(); //clears the element, necessary for re-use of this function later. 
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

$("#addCharacter").on("click", function(event) {
    event.preventDefault();
    var newCharacter = $("#character-input").val().trim();
    console.log("new character added: " + newCharacter) // console logs the new character name
    starwarsButtons.push(newCharacter); //pushes the new character to the array
    refreshButtons();
    console.log(starwarsButtons); //console logs the new array
    alert("for some reason, adding a character breaks the GIF logic. Please refresh the page to view GIFs") //remove this line once issues is fixed. 
    })

//-------------------------------------------------------------------------------------------------
//When a button is clicked "this", search in GIFY, return top 10 results for button

$("button").on("click", function() {
    // Clear out existing DIV to remove previous set of character if applicable. 
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

              //The GIF query functionality only works before a new character is added... I'm not sure why
              //This works perfectly before new characters are added, but no longer works after. 


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