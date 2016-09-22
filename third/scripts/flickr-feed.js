$(function () {

    //HTML objects
    var $mainContent;
    var $searchTermText;
    var $searchFlickrBtn;

    //Flickr API url
    var flickrURL = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    //init
    var init = function () {

        var setHTMLObjects = function () {
            $mainContent = $("#mainContent");
            $searchTermText = $("#searchTermText");
            $searchFlickrBtn = $("#searchFlickrBtn");
        }();

        var setEvents = function () {
            $searchFlickrBtn.on("click", function () {
                var searchTerm = $searchTermText.val();
                getAjaxFlickrFeed(flickrURL, searchTerm);
            });
        }();

    }();// end init

    //GET Ajax Flickr
    function getAjaxFlickrFeed(url, searchTerm) {

        var flickrConfig = {
            tags: searchTerm,
            tagMOde: "any",
            format: "json"
        };

        $.getJSON(url, flickrConfig)
            .done(function (result) {
                showFlickrFeed(result);
        })
            .fail(function () {
                console.log("Error");
            });
    }
    //Show flickr feed
    function showFlickrFeed(feed) {

        $mainContent.html("");

        $(feed.items).each(function(){

            var title = this.title;
            var imageUrl = this.media.m;

            var $article = $("<article>")
                .addClass("col-md-6");

            var $thumbnail = $("<div>")
                .addClass("thumbnail");

            var $caption = $("<div>")
                .addClass("caption");

            var $image = $("<img>")
                .attr({src: imageUrl, alt: title})
                .addClass("img-responsive");

            var $title = $("<h3>").html(title);

            $article
                .append(
                    $thumbnail
                        .append(
                            $image,
                            $caption
                                .append($title)
                    )
                );

            $mainContent.append($article);
        });

        $("article", $mainContent)
            .addClass("col-md-6");
    }
});