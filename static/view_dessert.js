
function display(data){
    $("#name").text(data["name"]);
    console.log(data["name"]);

    let image = new $("<img src=" + data["image"] + "></img");
    $("#image").append(image);

    $.each(data["description"], function (index, t) {
        let d1 = new $("<div class='row descriptionItem'> <li class=descriptionBullet>"+ t + "</li></div>");
        $("#description").append(d1);
    });
    let countryName = new $("<span> &nbsp" + data["country"] + "</span>");
    $("#countryLabel").append(countryName);

    let map = new $("<img id=map src=" + data["map"] + "></img");
    $("#mapImg").append(map);
}

$(document).ready(function(){
	display(data)

    $("#next").click(function (event){
        event.preventDefault();
        if(id < 10){
            url = "/learn/" + (parseInt(id) + 1).toString();
            window.location.assign(url);
        }

        else{
            url = "/quiz";
            window.location.assign(url);
        }
    });

    $("#backButton").click(function (event){
        event.preventDefault();
        if(id > 1){
            url = "/learn/" + (parseInt(id) - 1).toString();
            window.location.assign(url);
        }
        else{
            url = "/learn";
            window.location.assign(url);
        }
    });
});