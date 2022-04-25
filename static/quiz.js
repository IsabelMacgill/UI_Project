$(function(){
	if (question["format"] === "choice"){
		createChoiceQuestion(desserts, question)
	} else{
		createDragQuestion(desserts, question)
	}
});

$(document).ready(function(){
	console.log(desserts)
	console.log(question)
	console.log(user)
	let clicks = 0
	let correct = -1
	
	if (question["format"] === "choice"){
		$( "#next" ).click(function(){
			if(clicks%2 == 0){
				let selected = $('input[name="answers"]:checked').attr("id").match(/(\d+)/)[0]
				if ($('input[name="answers"]:checked').val() === question["answer"]){
					$('label[for='+ selected +']').addClass('correct')
				} else{
					for (i=0; i<question["options"].length; i++){
						if(question["options"][i] === question["answer"]){
							correct = i + 1
						}
					}
					console.log(correct)
					$('label[for='+ selected +']').addClass('incorrect')
					$('label[for='+ correct +']').addClass('correct')
				}
				$('#next').text("Continue")
				
			} else{
				user["visited"].push(question_value)
				if ($('input[name="answers"]:checked').val() === question["answer"]){
					var updated_user = {
							"id": user["id"],
							"visited": user["visited"],
							"total": (parseInt(user["total"]) + 1).toString(),
							"score": (parseInt(user["score"]) + 1).toString()				
					}
				} else{
					var updated_user = {
							"id": user["id"],
							"visited": user["visited"],
							"total": (parseInt(user["total"]) + 1).toString(),
							"score": user["score"]				
					}
				}
				if (updated_user["total"] === "10"){
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
			}
			clicks = clicks + 1
		});
	}
});


function createChoiceQuestion(desserts, question){
	let setEntry = document.createElement('div')
	setEntry.classList.add('row')
	setEntry.setAttribute("id", "question")
	let setQuestionEntry = document.createElement('div')
	setEntry.classList.add('col-12')
	let setQuestion = document.createElement('div')
	setQuestion.classList.add('row')
	setQuestion.classList.add('question')
	let setQuestionImage = document.createElement('img')
	setQuestionImage.classList.add('img-fluid')
	setQuestionImage.src = desserts[question["id"]]["image"]
	
	let setAnswerEntry = document.createElement('div')
	setAnswerEntry.classList.add('row')
	setAnswerEntry.setAttribute("id", "answers")
	let answerForm = document.createElement("form")
	let firstAnswer = document.createElement("input")
	firstAnswer.type = "radio"
	firstAnswer.setAttribute("id", "option-1")
	firstAnswer.name = "answers"
	firstAnswer.value = "1"
	let firstAnswerLabel = document.createElement("label")
	firstAnswerLabel.setAttribute("for", "1")
	let secondAnswer = document.createElement("input")
	secondAnswer.type = "radio"
	secondAnswer.setAttribute("id", "option-2")
	secondAnswer.name = "answers"
	secondAnswer.value = "2"
	let secondAnswerLabel = document.createElement("label")
	secondAnswerLabel.setAttribute("for", "2")
	let thirdAnswer = document.createElement("input")
	thirdAnswer.type = "radio"
	thirdAnswer.setAttribute("id", "option-3")
	thirdAnswer.name = "answers"
	thirdAnswer.value = "3"
	let thirdAnswerLabel = document.createElement("label")
	thirdAnswerLabel.setAttribute("for", "3")
	let fourthAnswer = document.createElement("input")
	fourthAnswer.type = "radio"
	fourthAnswer.setAttribute("id", "option-4")
	fourthAnswer.name = "answers"
	fourthAnswer.value = "4"
	let fourthAnswerLabel = document.createElement("label")
	fourthAnswerLabel.setAttribute("for", "4")
	
	let setQuestionMap = document.createElement('img')
	setQuestionMap.classList.add('img-fluid')
	setQuestionMap.src = desserts[question["id"]]["map"]
	
	$(setQuestion).text(question["question"])
	
	setQuestionEntry.appendChild(setQuestion)
	setQuestionEntry.appendChild(setQuestionImage)
	setEntry.appendChild(setQuestionEntry)
	$("#prompt").append(setEntry)
	
	answerForm.appendChild(firstAnswer)
	answerForm.appendChild(firstAnswerLabel)
	answerForm.appendChild(secondAnswer)
	answerForm.appendChild(secondAnswerLabel)
	answerForm.appendChild(thirdAnswer)
	answerForm.appendChild(thirdAnswerLabel)
	answerForm.appendChild(fourthAnswer)
	answerForm.appendChild(fourthAnswerLabel)
	setAnswerEntry.appendChild(answerForm)
	$("#prompt").append(setAnswerEntry)
	
	$("#title").append(parseInt(user["total"])+1)
	$("#map").append(setQuestionMap)	
	
	$('label[for=1]').html(question["options"][0]);
	$('#option-1').val(question["options"][0])
	$('label[for=2]').html(question["options"][1]);
	$('#option-2').val(question["options"][1])
	$('label[for=3]').html(question["options"][2]);
	$('#option-3').val(question["options"][2])
	$('label[for=4]').html(question["options"][3]);
	$('#option-4').val(question["options"][3])
	$('#next').text("Submit")
}

function createDragQuestion(desserts, question){
	let setEntry = document.createElement('div')
	setEntry.classList.add('col-12')
	setEntry.setAttribute("id", "question")
	let setTitle = document.createElement('div')
	setTitle.classList.add('row')
	let setQuestion = document.createElement('div')
	setQuestion.classList.add('row')
	let setImageDiv = document.createElement('div')
	setImageDiv.classList.add('row')
	setImageDiv.setAttribute("id", "question-image")
	let setQuestionImage = document.createElement('img')
	setQuestionImage.classList.add('img-fluid')
	setQuestionImage.src = desserts[question["id"]]["image"]
	
	let setAnswerEntry = document.createElement('div')
	setAnswerEntry.classList.add('row')
	setAnswerEntry.setAttribute("id", "answers")
	let firstAnswer = document.createElement('div')
	firstAnswer.classList.add('drop-answer')
	firstAnswer.classList.add('col-3')
	firstAnswer.setAttribute("id", "1")
	let secondAnswer = document.createElement('div')
	secondAnswer.classList.add('drop-answer')
	secondAnswer.classList.add('col-3')
	secondAnswer.setAttribute("id", "2")
	let thirdAnswer = document.createElement('div')
	thirdAnswer.classList.add('drop-answer')
	thirdAnswer.classList.add('col-3')
	thirdAnswer.setAttribute("id", "3")
	let fourthAnswer = document.createElement('div')
	fourthAnswer.classList.add('drop-answer')
	fourthAnswer.classList.add('col-3')
	fourthAnswer.setAttribute("id", "4")
	
	$(firstAnswer).text(question["options"][0])
	$(secondAnswer).text(question["options"][1])
	$(thirdAnswer).text(question["options"][2])
	$(fourthAnswer).text(question["options"][3])
	
	$(setTitle).text(desserts[question["id"]]["name"])
	$(setQuestion).text(question["question"])
	
	
	let setQuestionMap = document.createElement('img')
	setQuestionMap.classList.add('img-fluid')
	setQuestionMap.src = desserts[question["id"]]["map"]
	
	$("#title").append(parseInt(user["total"])+1)
	$("#map").append(setQuestionMap)
	
	setEntry.appendChild(setTitle)
	setEntry.appendChild(setQuestion)
	setImageDiv.appendChild(setQuestionImage)
	setEntry.appendChild(setImageDiv)
	$("#prompt").append(setEntry)
	
	setAnswerEntry.appendChild(firstAnswer)
	setAnswerEntry.appendChild(secondAnswer)
	setAnswerEntry.appendChild(thirdAnswer)
	setAnswerEntry.appendChild(fourthAnswer)
	$("#prompt").append(setAnswerEntry)
	
	$('#question-image').draggable({
		classes:{
			"ui-draggable-dragging": "highlight"
		},
		revert: "invalid",
		stack: ".draggable"
	});
	for(let i = 1; i < 5; i++){
		$('#' + i).droppable({
			tolerance: 'pointer',
			accept: '#question-image',
			activeClass: "darker",
			hoverClass: "darkest",
			drop: function(event, ui){
				let droppableID = $(this).attr("id")
				user["visited"].push(question_value)
				if (question["options"][parseInt(droppableID)-1] === question["answer"]){
					var updated_user = {
							"id": user["id"],
							"visited": user["visited"],
							"total": (parseInt(user["total"]) + 1).toString(),
							"score": (parseInt(user["score"]) + 1).toString()				
					}
				} else{
					var updated_user = {
							"id": user["id"],
							"visited": user["visited"],
							"total": (parseInt(user["total"]) + 1).toString(),
							"score": user["score"]				
					}
				}
				if (updated_user["total"] === "10"){
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
			} 
		});
	}
}