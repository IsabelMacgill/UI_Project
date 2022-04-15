$(function(){
	createQuestion(desserts, question)
});

$(document).ready(function(){
	console.log(desserts)
	console.log(question)
	console.log(user)
});

function createQuestion(desserts, question){
	console.log("called")
	let setEntry = document.createElement('div')
	setEntry.classList.add('col-12')
	let setQuestion = document.createElement('div')
	setQuestion.classList.add('row')
	setQuestion.classList.add('question')
	let setQuestionImage = document.createElement('img')
	setQuestionImage.classList.add('img-fluid')
	setQuestionImage.src = desserts[question["id"]]["image"]
	let setFirstOption = document.createElement('div')
	setFirstOption.classList.add('row')
	setFirstOption.classList.add('answer')
	let setSecondOption = document.createElement('div')
	setSecondOption.classList.add('row')
	setSecondOption.classList.add('answer')
	let setThirdOption = document.createElement('div')
	setThirdOption.classList.add('row')
	setThirdOption.classList.add('answer')
	let setFourthOption = document.createElement('div')
	setFourthOption.classList.add('row')
	setFourthOption.classList.add('answer')
	
	
	let setQuestionMap = document.createElement('img')
	setQuestionMap.classList.add('img-fluid')
	setQuestionMap.src = desserts[question["id"]]["map"]
				
	
	$(setQuestion).text(question["question"])
	$(setFirstOption).text(question["options"][0])
	$(setSecondOption).text(question["options"][1])
	$(setThirdOption).text(question["options"][2])
	$(setFourthOption).text(question["options"][3])
	
	
	setEntry.appendChild(setQuestion)
	setEntry.appendChild(setQuestionImage)
	setEntry.appendChild(setFirstOption)
	setEntry.appendChild(setSecondOption)
	setEntry.appendChild(setThirdOption)
	setEntry.appendChild(setFourthOption)
	$("#question").append(setEntry)
	$("#title").append(parseInt(user["total"]) + 1)
	$("#map").append(setQuestionMap)
}