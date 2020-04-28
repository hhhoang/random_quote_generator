let colors = ["#00a8cc", "#ff7c7c", "#61d4b3", "#efb1ff", "#ffa34d", "#698474", "#ffa41b", "#b590ca"];
var quoteJsonData;
// get the quote data
function getQuotesData() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("it returned data");
            //console.log(data.quotes);
            quoteJsonData = data.quotes;
            console.log(quoteJsonData);
            populateQuoteAndAuthor(data.quotes);
            changeColor();
        })
        .catch((error) => {
            console.log(error);
            populateQuoteAndAuthor([{ "quote": "Sorry, we are unable to retrieve data.", "author": "unknown" }]);
        });
}

// populateQuoteAndAuthor
function populateQuoteAndAuthor(quoteList) {
    if (quoteList != null) {
        let randomNumber = getRandomNumber(quoteList);
        let text = quoteList[randomNumber].quote;
        let author = quoteList[randomNumber].author;
        $("#text").html(text);
        $("#author").html("<span> - </span>" + author);
        shareOnSocialMedia(text, author);
    } else {
        $("#text").html("Sorry, we are unable to retrieve quotes.");
    }

}

// getRandomNumber
function getRandomNumber(arr) {
    let randomNumber = Math.floor(Math.random() * arr.length);
    return randomNumber;
}

// change colors
function changeColor() {
    let randomNumber = Math.floor(Math.random() * colors.length);
    $("#text").css("color", colors[randomNumber]);
    $("#author").css("color", colors[randomNumber]);
    $("#container").css("background-color", colors[randomNumber]);
    $(".button").css("background-color", colors[randomNumber]);
    $(".fa-twitter").css("background", colors[randomNumber]);
    $(".fa-facebook").css("background", colors[randomNumber]);

}

// TO-DO: share button
function shareOnSocialMedia(text, author) {
    let content = "https://twitter.com/intent/tweet?text="
    content += encodeURIComponent('"' + text + '" ' + author + '.');
    content += encodeURIComponent(' More on https://letsbeinspired.netlify.app/.');
    $("#tweet-quote").attr("href", content);
    $("#facebook-quote").attr("href", '//facebook.com/sharer/sharer.php?u=' + window.location.href);
}

$(document).ready(function() {
    getQuotesData();
    $("#new-quote").on("click", function(event) {
        event.preventDefault();
        populateQuoteAndAuthor(quoteJsonData);
        changeColor(colors);
    });
});