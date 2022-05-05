var answerResults;

$(function(){
	if (question["format"] === "choice"){
		createChoiceQuestion(desserts, question)
	} else{
		createDragQuestion(desserts, question)
	}
});

$(document).ready(function(){
	let clicks = 0
	let correct = -1
	
	if (question["format"] === "choice"){
		$( "#next" ).click(function(){
			if(clicks%2 == 0){
				
				$('input[name="answers"]').attr('disabled', 'disabled');
				
				if ($('input[name="answers"]:checked').length > 0){
					
					let selected = $('input[name="answers"]:checked').attr("id").match(/(\d+)/)[0]
					
					if ($('input[name="answers"]:checked').val() === question["answer"]){
						$('label[for='+ selected +']').addClass('correct')
					} else{
						for (i=0; i<question["options"].length; i++){
							if(question["options"][i] === question["answer"]){
								correct = i + 1
							}
						}
						
						$('label[for='+ selected +']').addClass('incorrect')
						$('label[for='+ correct +']').addClass('correct')
					}
					
					$('#next').text("Continue")
				} else{
					for (i=0; i<question["options"].length; i++){
						if(question["options"][i] === question["answer"]){
							correct = i + 1
						}
					}
					
					$('label[for='+ correct +']').addClass('correct')
				}
			} else{
				user["visited"].push(question_value)
				
				if ($('input[name="answers"]:checked').val() === question["answer"]){
					var updated_user = {
							"id": user["id"],
							"visited": user["visited"],
							"total": (parseFloat(user["total"]) + 1).toString(),
							"score": (parseFloat(user["score"]) + 1).toString()				
					}
				} else{
					var updated_user = {
							"id": user["id"],
							"visited": user["visited"],
							"total": (parseFloat(user["total"]) + 1).toString(),
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
	} else{
		$( "#next" ).click(function(){
			if(clicks%2 == 0){
				user["visited"].push(question_value)
				
				for (i=1; i<6; i++){
					$('#question-image' + i).draggable('disable')
				}
				
				for (i=0; i<answerResults.length; i++){
					divId = i+1
					if (answerResults[i] === true){
						$('#' + divId).addClass('correct')
					} else{
						$('#' + divId).addClass('incorrect')
					}	
				}
				
				$('#next').text("Continue")
			}else{
				let curScore = 0.0
				
				for (i=0; i<answerResults.length; i++){
					if (answerResults[i] === true){
						curScore = curScore + 0.2
					}
				}
				
				user["visited"].push(question_value)
				
				var updated_user = {
						"id": user["id"],
						"visited": user["visited"],
						"total": (parseFloat(user["total"]) + 1).toString(),
						"score": (parseFloat(user["score"]) + curScore).toString()				
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
	setQuestionImage.classList.add('choice-img')
	setQuestionImage.src = desserts[question["id"]]["image"]
	
	let setAnswerEntry = document.createElement('div')
	setAnswerEntry.classList.add('row')
	setAnswerEntry.setAttribute("id", "answers")
	
	let answerForm = document.createElement("form")

	let divGroup1 = document.createElement("div")
	divGroup1.setAttribute("class", "group");

	let firstAnswer = document.createElement("input")
	firstAnswer.type = "radio"
	firstAnswer.setAttribute("id", "option-1")
	firstAnswer.name = "answers"
	firstAnswer.value = "1"
	
	let firstAnswerLabel = document.createElement("label")
	firstAnswerLabel.setAttribute("for", "1")

	let divGroup2 = document.createElement("div")
	divGroup2.setAttribute("class", "group");
	
	let secondAnswer = document.createElement("input")
	secondAnswer.type = "radio"
	secondAnswer.setAttribute("id", "option-2")
	secondAnswer.name = "answers"
	secondAnswer.value = "2"
	
	let secondAnswerLabel = document.createElement("label")
	secondAnswerLabel.setAttribute("for", "2")

	let divGroup3 = document.createElement("div")
	divGroup3.setAttribute("class", "group");
	
	let thirdAnswer = document.createElement("input")
	thirdAnswer.type = "radio"
	thirdAnswer.setAttribute("id", "option-3")
	thirdAnswer.name = "answers"
	thirdAnswer.value = "3"
	
	let thirdAnswerLabel = document.createElement("label")
	thirdAnswerLabel.setAttribute("for", "3")

	let divGroup4 = document.createElement("div")
	divGroup4.setAttribute("class", "group");
	
	let fourthAnswer = document.createElement("input")
	fourthAnswer.type = "radio"
	fourthAnswer.setAttribute("id", "option-4")
	fourthAnswer.name = "answers"
	fourthAnswer.value = "4"
	
	let fourthAnswerLabel = document.createElement("label")
	fourthAnswerLabel.setAttribute("for", "4")

	setAnswerEntry.appendChild(answerForm)
	
	let setQuestionMap = document.createElement('img')
	setQuestionMap.classList.add('img-fluid')
	setQuestionMap.src = desserts[question["id"]]["map"]
	
	$(setQuestion).text(question["question"])
	
	setQuestionEntry.appendChild(setQuestion)
	setQuestionEntry.appendChild(setQuestionImage)
	setEntry.appendChild(setQuestionEntry)
	$("#prompt").append(setEntry)
	
	divGroup1.appendChild(firstAnswer);
	divGroup1.appendChild(firstAnswerLabel)
	answerForm.appendChild(divGroup1);

	divGroup2.appendChild(secondAnswer);
	divGroup2.appendChild(secondAnswerLabel)
	answerForm.appendChild(divGroup2);

	divGroup3.appendChild(thirdAnswer);
	divGroup3.appendChild(thirdAnswerLabel)
	answerForm.appendChild(divGroup3);

	divGroup4.appendChild(fourthAnswer);
	divGroup4.appendChild(fourthAnswerLabel)
	answerForm.appendChild(divGroup4);

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
	answerResults = [false, false, false, false, false]
	
	let setEntry = document.createElement('div')
	setEntry.classList.add('col-12')
	setEntry.setAttribute("id", "question")
	let setTitle = document.createElement('div')
	setTitle.classList.add('row')
	let setQuestion = document.createElement('div')
	setQuestion.classList.add('row')

	let setImageRow = document.createElement('div')
	setImageRow.classList.add('row')
	setImageRow.setAttribute("id", "image-row")

	let setAnswerEntry = document.createElement('div')
	setAnswerEntry.classList.add('row')
	setAnswerEntry.setAttribute("id", "answers")

	let firstAnswer = document.createElement('div')
	firstAnswer.classList.add('drop-answer')
	firstAnswer.classList.add('col-2')
	firstAnswer.setAttribute("id", "1")

	let secondAnswer = document.createElement('div')
	secondAnswer.classList.add('drop-answer')
	secondAnswer.classList.add('col-2')
	secondAnswer.setAttribute("id", "2")

	let thirdAnswer = document.createElement('div')
	thirdAnswer.classList.add('drop-answer')
	thirdAnswer.classList.add('col-2')
	thirdAnswer.setAttribute("id", "3")

	let fourthAnswer = document.createElement('div')
	fourthAnswer.classList.add('drop-answer')
	fourthAnswer.classList.add('col-2')
	fourthAnswer.setAttribute("id", "4")

	let fifthAnswer = document.createElement('div')
	fifthAnswer.classList.add('drop-answer')
	fifthAnswer.classList.add('col-2')
	fifthAnswer.setAttribute("id", "5")
	
	$(firstAnswer).text(desserts[question["options"][0]]["name"])
	$(secondAnswer).text(desserts[question["options"][1]]["name"])
	$(thirdAnswer).text(desserts[question["options"][2]]["name"])
	$(fourthAnswer).text(desserts[question["options"][3]]["name"])
	$(fifthAnswer).text(desserts[question["options"][4]]["name"])
	
	$(setQuestion).text(question["question"])
	
	$("#title").append(parseInt(user["total"])+1)
	
	setEntry.appendChild(setTitle)
	setEntry.appendChild(setQuestion)
	
	let visitedVariables = []
	
	for(let i = 1; i < 6; i++){
		let j = parseInt(Math.random() * (6 - 1) + 1)
		while (visitedVariables.includes(j)){
			j = parseInt(Math.random() * (6 - 1) + 1)
		}
		visitedVariables.push(j)
		let setImageDiv = document.createElement('div')
		setImageDiv.classList.add('col-2')
		setImageDiv.classList.add('question-img')
		setImageDiv.setAttribute("id", "question-image"+j)
		let setQuestionImage = document.createElement('img')
		setQuestionImage.src = desserts[question["options"][j-1]]["image"]
		setImageDiv.appendChild(setQuestionImage)
		setImageRow.appendChild(setImageDiv)
	}
	setEntry.appendChild(setImageRow)
	$("#prompt").append(setEntry)
	
	setAnswerEntry.appendChild(firstAnswer)
	setAnswerEntry.appendChild(secondAnswer)
	setAnswerEntry.appendChild(thirdAnswer)
	setAnswerEntry.appendChild(fourthAnswer)
	setAnswerEntry.appendChild(fifthAnswer)
	$("#prompt").append(setAnswerEntry)
	
	for(i = 1; i < 6; i++){
		$('#question-image' + i).draggable({
			classes:{
			"ui-draggable-dragging": "highlight"
			},
			revert: "invalid",
			stack: ".draggable",
			start: function(event, ui){
			}
		});
	}
	for(i = 1; i < 6; i++){
		$('#' + i).droppable({
			tolerance: 'pointer',
			accept: function(draggable){
				if(!$(this).hasClass('drop')){
					return true
				} else{
					return false
				}
			},
			activeClass: "darker",
			hoverClass: "darkest",
			drop: function(event, ui){
				$(ui.draggable).css('position', 'absolute');
				$(ui.draggable).css('top', $(this).position().top + 40);
				$(ui.draggable).css('left', $(this).position().left);
				if(ui.draggable.attr('dropped')){
					prev = ui.draggable.attr('dropped')
					$('#' + prev).removeClass('drop')
				}
				$(this).addClass('drop')
				$(this).find('img').append(ui.draggable)

				if ($(ui.draggable).attr('id').match(/(\d+)/)[0] === $(this).attr('id')){
					answerResults[$(this).attr('id')-1] = true
				} else{
					answerResults[$(this).attr('id')-1] = false
				}
				ui.draggable.attr('dropped', $(this).attr('id'))
			}
		});
	}
	
	$('#next').text("Submit")
}