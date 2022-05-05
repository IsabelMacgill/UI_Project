$(function(){
	$("#score").append(parseFloat(user["score"]) + " out of 10!")
	
	let improvementAreas = []
	let northAmericaScore = parseInt(user["northAmerica"][0])/parseInt(user["northAmerica"][1])
	let asiaScore = parseInt(user["asia"][0])/parseInt(user["asia"][1])
	let europeScore = parseInt(user["europe"][0])/parseInt(user["europe"][1])
	
	if (northAmericaScore < 0.6){
		improvementAreas.push(["North America", parseInt(northAmericaScore*100), "1"])
	}
	if (asiaScore < 0.6){
		improvementAreas.push(["Asia", parseInt(asiaScore*100), "5"])
	}
	if (europeScore < 0.6){
		improvementAreas.push(["Europe", parseInt(europeScore*100), "9"])
	}
	
	if (improvementAreas.length > 0){
		let setIntro = document.createElement('div')
		setIntro.classList.add('row')
		$(setIntro).text("There is room for improvement in the following areas")
		$("#improvement").append(setIntro)
		
		for (let i=0; i<improvementAreas.length; i++){
			let setRow = document.createElement('div')
			setRow.classList.add('row')
			setRow.classList.add('padding')
			
			let setName = document.createElement('div')
			setName.classList.add('col-4')
			$(setName).text(improvementAreas[i][0])
			
			let setScore = document.createElement('div')
			setScore.classList.add('col-6')
			$(setScore).text(improvementAreas[i][1] + "%")
			
			let setLinkDiv = document.createElement('div')
			setLinkDiv.classList.add('col-2')
			let setLink = document.createElement('a')
			setLink.href = '/learn/' + improvementAreas[i][2]
			let setButton = document.createElement('button')
			setButton.classList.add('go-back')
			setButton.innerHTML = "Learn"
			
			setLink.appendChild(setButton)
			setLinkDiv.appendChild(setLink)
			
			setRow.appendChild(setName)
			setRow.appendChild(setScore)
			setRow.appendChild(setLinkDiv)
			
			$("#improvement").append(setRow)
		}	
	}
});

$(document).ready(function(){
	
});

function sampleFunction(sample){
	
}