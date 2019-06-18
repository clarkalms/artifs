$(document).ready(function () {




    // $('select#rating-select').on('click', function(){
    //     let rate = $('#limit-select').val();
    //     console.log(rate);
    // });
    // $('select#limit-select').on('click', function(){

    //     let limit = $("#limit-select").val();
    //     console.log(limit);
    // });

    let searchedGifs = [];
    var ratingArray = [];
    var limitArray = [];
    $("select#rating-select").change(function () {
        ratingArray.length = 0;
        let selectedRating = $(this).children("option:selected").val();
        ratingArray.push(selectedRating);
    });
    $("select#limit-select").change(function () {
        limitArray.length = 0;
        let selectedLimit = $(this).children("option:selected").val();
        limitArray.push(selectedLimit);
    });

    function displayGifs() {


        var searchTerm = $("#gif-search").val().trim();
        var rating = ratingArray.join("");
        var limitNum = limitArray.join("");
        console.log(rating, limitNum, searchedGifs);
        const queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=jZSoz3FNI4W3ORZ3SNp0p2eDIJaGo3bZ&rating=" + rating + "&limit=" + limitNum;
        console.log(queryURL);
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Creating a div to hold the movie
            var gifDiv = $("<div class='gif'>");
            var title = response.data[0].title;
            var pOne = $("<p>").text("Title: " + title);
            gifDiv.append(pOne)
            // Storing the release year
            var source = response.data[0].source_tld;

            // Creating an element to hold the release year
            var pTwo = $("<p>").text("Source: " + source);

            // Displaying the release year
            gifDiv.append(pTwo);


            // Storing the rating data
            var rating = response.data[0].rating;

            // Creating an element to have the rating displayed
            var pThree = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            gifDiv.append(pThree);

            // Retrieving the URL for the image
            var gifURL = response.data[0].images.fixed_width.url;

            // Creating an element to hold the image
            var gif = $("<img>").attr("src", gifURL);

            // Appending the image
            gifDiv.append(gif);

            // Putting the entire movie above the previous movies
            $("#gifs-view").append(gifDiv);
        });

    };

    // Function for displaying movie data
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < searchedGifs.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var newBtn = $("<button>");
            // Adding a class of movie-btn to our button
            newBtn.addClass("gif-btn");
            // Adding a data-attribute
            newBtn.attr("data-name", searchedGifs[i]);
            // Providing the initial button text
            newBtn.text(searchedGifs[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(newBtn);
        };
    };

    // This function handles events where a movie button is clicked
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gifSearch = $("#gif-search").val().trim();

        // Adding movie from the textbox to our array
        searchedGifs.push(gifSearch);

        // Calling renderButtons which handles the processing of our movie array
        
        renderButtons();
        // displayGifs();
        // ratingArray.length = 0;
        // limitArray.length = 0;
    });

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".gif-btn", displayGifs);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});