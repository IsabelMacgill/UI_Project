$(function(){
	createQuestion(desserts, question)
	$('label[for=1]').html(question["options"][0]);
	$('#option-1').val(question["options"][0])
	$('label[for=2]').html(question["options"][1]);
	$('#option-2').val(question["options"][1])
	$('label[for=3]').html(question["options"][2]);
	$('#option-3').val(question["options"][2])
	$('label[for=4]').html(question["options"][3]);
	$('#option-4').val(question["options"][3])
	$('#next').text("Submit")
	
});

$(document).ready(function(){
	console.log(desserts)
	console.log(question)
	console.log(user)
	
	$( "#next" ).click(function(){
		if ($('input[name="answers"]:checked').val() === question["answer"]){
			var updated_user = {
					"id": user["id"],
					"visited": user["visited"],
					"total": user["total"],
					"score": (parseInt(user["score"]) + 1).toString()				
			}
		} else{
			var updated_user = {
					"id": user["id"],
					"visited": user["visited"],
					"total": user["total"],
					"score": user["score"]				
			}
		}
		if (user["total"] === "10"){
			$.ajax({
				type: "POST",
				url: "answer_question",                
				dataType : "json",
				contentType: "application/json; charset=utf-8",
				data : JSON.stringify(updated_user),
				success: function(result){
					window.location.replace("/results")
				},
				error: function(request, status, error){
					console.log("Error")
					console.log(request)
					console.log(status)
					console.log(error)
				}
			});
		} else{
			$.ajax({
				type: "POST",
				url: "answer_question",                
				dataType : "json",
				contentType: "application/json; charset=utf-8",
				data : JSON.stringify(updated_user),
				success: function(result){
					window.location.reload();
				},
				error: function(request, status, error){
					console.log("Error")
					console.log(request)
					console.log(status)
					console.log(error)
				}
			});
		}
	});
});

function createQuestion(desserts, question){
	let setEntry = document.createElement('div')
	setEntry.classList.add('col-12')
	let setQuestion = document.createElement('div')
	setQuestion.classList.add('row')
	setQuestion.classList.add('question')
	let setQuestionImage = document.createElement('img')
	setQuestionImage.classList.add('img-fluid')
	setQuestionImage.src = desserts[question["id"]]["image"]
	
	
	let setQuestionMap = document.createElement('img')
	setQuestionMap.classList.add('img-fluid')
	setQuestionMap.src = desserts[question["id"]]["map"]
				
	
	$(setQuestion).text(question["question"])
	
	
	setEntry.appendChild(setQuestion)
	setEntry.appendChild(setQuestionImage)
	$("#question").append(setEntry)
	$("#title").append(parseInt(user["total"]))
	$("#map").append(setQuestionMap)
}