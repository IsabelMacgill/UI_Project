$(function(){
	
});

function sampleFunction(sample){
	
}


$(document).ready(function(){
	display(dessert)

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