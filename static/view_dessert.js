
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

function enterTime(id){
    let data_to_save = {
        id: id,
        enteredTime: Date.now().toString(),
    }
    $.ajax({
      type: "POST",
      url: "/enter_user",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data_to_save),
      success: function (result) {
        console.log(result);
      },
      error: function (request, status, error) {
        console.log("Error");
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
}

function leaveTime(id){
    let data_to_save = {
        id: id,
        leftTime: Date.now().toString()
    }
    $.ajax({
      type: "POST",
      url: "/leave_user",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data_to_save),
      success: function (result) {
        console.log(result);
      },
      error: function (request, status, error) {
        console.log("Error");
        console.log(request);
        console.log(status);
        console.log(error);
      },
    });
}

$(document).ready(function(){
	display(data)
    enterTime(id);

    $("#next").click(function (event){
        event.preventDefault();
        leaveTime(id);
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
        leaveTime(id);
        if(id > 1){
            url = "/learn/" + (parseInt(id) - 1).toString();
            window.location.assign(url);
        }
        else{
             url = "/learn";
             window.location.assign(url);
        }
    });

    $("north-america").click(function (event){
        event.preventDefault();
        leaveTime(id);
    });
    $("asia").click(function (event){
        event.preventDefault();
        leaveTime(id);
    });
    $("europe").click(function (event){
        event.preventDefault();
        leaveTime(id);
    });

});