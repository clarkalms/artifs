$(document).ready(function () {
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
        var searchTerm = $("#gif-search").val().trim().replace(/\s/g, '+');
        var rating = ratingArray.join("");
        var limitNum = limitArray.join("");
        const queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=jZSoz3FNI4W3ORZ3SNp0p2eDIJaGo3bZ&rating=" + rating + "&limit=" + limitNum;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < limitNum; i++) {
                var title = response.data[i].title;
                var source = response.data[i].source_tld;
                var rating = response.data[i].rating;
                var gifURL = response.data[i].images.fixed_width.url;

                var gifDiv = $("<div class='gif col l3 s12'>");
                var pOne = $("<p>").text("Title: " + title);
                var pTwo = $("<p>").text("Source: " + source);
                var pThree = $("<p>").text("Rating: " + rating);
                var gif = $("<img>").attr("src", gifURL);

                gifDiv.append(pOne);
                gifDiv.append(pTwo);
                gifDiv.append(pThree);
                gifDiv.append(gif);
                $("#gifs-view").append(gifDiv);
            };
        });
    };
    // function createHeader() {
    //     let searchTerm = searchedGifs[searchedGifs.length-1];
    //     let limitNum = limitArray.join("");
    //     var searchedGifDiv = $("<div class='title>'");
    //     var searchedGifHead = $("<h2>").text(`Here are ${limitNum} ${searchTerm} Gifs:`);
    //     searchedGifDiv.append(searchedGifHead);
    //     $("#gifs-view").append(searchedGifDiv);
    // };

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < searchedGifs.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("gif-btn");
            newBtn.attr("data-name", searchedGifs[i]);
            newBtn.text(searchedGifs[i]);
            $("#buttons-view").append(newBtn);
        };
    };
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var gifSearch = $("#gif-search").val().trim();
        if (!gifSearch){
            alert("Please enter an artist to search for...")
        } else if (ratingArray.length == 0){
            alert("Please select a rating to filter by...")
        } else if (limitArray.length == 0){
            alert("Please select a number to limit results by...")
        } else {
        searchedGifs.push(gifSearch);
        renderButtons();
        }
    });
    $(document).on("click", ".gif-btn", displayGifs);
    renderButtons();
});