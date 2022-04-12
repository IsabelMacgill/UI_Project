

function display(data){
    $(".name").text(data["name"]);

    let image = new $("<img class=iframe src=" + data["image"] + "</img>");
    $("image").append(image);

    $.each(data["description"], function (index, t) {
        let d1 = new $("<div class='row descriptionItem'>"+ t + "</div>");
        $(".description").append(d1);
    });
}

$(document).ready(function(){
	display(data)

    $("next").click(function (event){
        event.preventDefault();
        url = "/learn/" + (id + 1);
        window.location.assign(url);
    });

    $("back").click(function (event){
        event.preventDefault();
        url = "/learn/" + (id - 1);
        window.location.assign(url);
    });
});