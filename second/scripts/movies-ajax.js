/**
 * Created by alex on 15.09.16.
 */

$("document").ready(function () {

    //XML object
    var moviesXMLObject = null;

    //HTML objects
    var $titleSearchText;
    var $showSearchByTitleBtn, $showAllBtn;
    var $mainContent;

    var init = function () {

        var setHTMLObjects = function () {
            $titleSearchText = $("#titleSearchText");
            $showSearchByTitleBtn = $("#showSearchByTitleBtn");
            $showAllBtn = $("#showAllBtn");
            $mainContent = $("#mainContent");
        }();

        var setEvents = function () {
            $showAllBtn.on("click", showAll);
            $showSearchByTitleBtn.on("click", showSearchByTitle);
        }();

        var initPage = function () {
            getMoviesXML();
        }();
    }();

    function showSearchByTitle() {
        cleanUp();

        $(moviesXMLObject)
            .find("movie")
            .each(function () {
                var title = $("title", this).text();

                var searchTerm = $titleSearchText.val();

                var foundMatch = title.toLowerCase().indexOf(searchTerm);

                if (foundMatch !== -1) {
                    var description = $("description", this).text();
                    var imageSrc = $("imageSrc", this).text();

                    var $newTitle = $("<h3>").html(title);
                    var $newDescription = $("<h3>").html(description);
                    var $newImage = $("<img>").attr(
                        {
                            src: "images/" + imageSrc,
                            alt: title
                        }
                    ).addClass("img-responsive");

                    var $newArticle = $("<article>").addClass("col-md-4").append($newTitle, $newImage);

                    $mainContent.append($newArticle);
                } // end if check match
            });
    }

    function showAll() {
        cleanUp();

        $(moviesXMLObject)
            .find("movie")
            .each(function () {
                var title = $("title", this).text();
                var description = $("description", this).text();
                var imageSrc = $("imageSrc", this).text();

                var $newTitle = $("<h3>").html(title);
                var $newDescription = $("<h3>").html(description);
                var $newImage = $("<img>").attr(
                    {
                        src: "images/" + imageSrc,
                        alt: title
                    }
                ).addClass("img-responsive");

                var $newArticle = $("<article>").addClass("col-md-4").append($newTitle, $newImage);

                $mainContent.append($newArticle);
            });
    }

    function getMoviesXML() {

        $.ajax(
            {
                method: "GET",
                url: "xml/movies.xml",
                dataType: "xml",
                async: "true",


                beforeSend: function () {
                    console.log("Are going to send");
                    $mainContent.append("<div class='col-md-12'><p class='alert alert-warning'>XML file is downloading...</p></div>")
                },
                success: function (xmlResult) {
                    moviesXMLObject = xmlResult;
                    $(".alert").delay(1000).fadeOut(3000);
                },
                error: function (xhr, status, errorMsg) {
                    console.log(xhr + " " + status + " " + errorMsg)
                },
                complete: function () {
                    console.log("Complete");
                }
            }
        );

    }

    function cleanUp() {
        $mainContent.html("");
    }

});