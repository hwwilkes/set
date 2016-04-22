//TO DO
//
//Enhancements: 
//1. Add score/scorekeeping.
//2. Add Timer
//3. Style Buttons
//4. Make is to new divs appears at the end
//5. Find Set button
//6. Cookie to keep track of user's score
//X7. See if there is a set onscreen when user clicks 'deal 3'
//8. Add instructions page
//9. Add animations
//X10. Refactor div tracking to object.
//11. Write Tutorial.

//Bugs:
//1. Validate user has chosen 3 cards when check set button is clicked
//2. Hide divs when allCards < 12	
//X3. Deal cards is including hidden divs when checking for set on the board.

$(document).ready(function() {

	var selected = document.getElementsByClassName("selected");
	var shape = ['diamond', 'ellipse', 'sshape'];
	var color = ['green', 'red', 'purple'];
	var fill = ['empty', 'striped', 'solid'];
	var number = [1, 2, 3];
	var allCards = [];
	var shapeLength = shape.length;
	var colorLength = color.length;
	var fillLength = fill.length;
	var numberLength = number.length;
	var imgHolder = document.getElementsByClassName("imgHolder");
	var imgHolderLength = imgHolder.length;
	var cardDivs = document.getElementsByClassName("card");
	var cardDivsLength = cardDivs.length;
	var dealtCards = [];

//Allows user to select up to 3 cards
	$(".card").click(function() {

		var selectedLength = selected.length;

		if (selectedLength <= 2) {

			$(this).toggleClass("selected");	

		} else if (selectedLength = 3) {

			$(this).removeClass("selected");
		}
	});


	//object constructor for cards
	function card (number, shape, color, fill) {

		this.number = number;
		this.shape = shape;
		this.color = color;
		this.fill = fill;
		this.inSet = 'n';
		this.divId = '';
		this.image = 'images/' + fill + color + shape + '.jpg';
		this.divId = "";

	}

	//Picks a card object at random from allCards (deck) and writes images to card.
	function dealCards() {

		for (var i = 0; i < cardDivs.length; i++) {

			if ((imgHolder[i].childElementCount === 0 ) && (cardDivs[i].className === "card show"))	 {

				var randomNum = Math.floor(Math.random() * allCards.length);
				shapeNumber = allCards[randomNum].number;

					//Get number property from object and write matching image to card that number of times.
					for (var j = 0; j <= shapeNumber - 1; j++) {

						var cardImage = document.createElement("img");
						cardImage.setAttribute("src", allCards[randomNum].image);
						imgHolder[i].appendChild(cardImage);
						
					}

					//Update card property with div into which it was dealt
					allCards[randomNum].divId = i;

					//Add dealt card to dealtCards array
					dealtCards.push(allCards[randomNum]);

					//Remove card now in dealtCards from allCards
					allCards.splice(randomNum, 1);

			}

		}

	}

	//compares each attribute of selected cards
	function checkSet() {

		var selectedCard = document.getElementsByClassName("selected");
		var selectedCardId1 = selectedCard[0].getAttribute("id");
		var selectedCardId2 = selectedCard[1].getAttribute("id");
		var selectedCardId3 = selectedCard[2].getAttribute("id");
		var card1;
		var card2;
		var card3;

		for (var i = 0; i < dealtCards.length; i++) {

			if (dealtCards[i].divId === parseInt(selectedCardId1)) {
				
				var card1 = i;

			} else if (dealtCards[i].divId === parseInt(selectedCardId2)) {

				var card2 = i;
			} else if (dealtCards[i].divId === parseInt(selectedCardId3)) {

				var card3 = i;
			} 
					
		}
		
		var set = compareCards(card1,card2,card3);

		if (set) {

			alert("set");

			var imgHolder1 = document.getElementById(selectedCardId1).firstElementChild;
			var imgHolder2 = document.getElementById(selectedCardId2).firstElementChild;
			var imgHolder3 = document.getElementById(selectedCardId3).firstElementChild;

			$(".selected").removeClass("selected");

			$(imgHolder1).empty();
			$(imgHolder2).empty();
			$(imgHolder3).empty();

			for (var i = dealtCards.length-1; i >= 0; i--) {

				if (dealtCards[i].divId === parseInt(selectedCardId1)) {  

					dealtCards.splice(i, 1)

				} else if (dealtCards[i].divId === parseInt(selectedCardId2)) {

					dealtCards.splice(i, 1)

				} else if (dealtCards[i].divId === parseInt(selectedCardId3)) {

					dealtCards.splice(i, 1)

				}

			}

			var showLength = document.getElementsByClassName("show").length;

			if (showLength <= 12) {

				dealCards();

			} else {

				$(cardDivs[selectedCardId1]).addClass("hidden").removeClass("show");
				$(cardDivs[selectedCardId2]).addClass("hidden").removeClass("show");
				$(cardDivs[selectedCardId3]).addClass("hidden").removeClass("show");
			}

		} else {

			alert("not a set");

			$(".selected").removeClass("selected");
		}	

	}


	function compareCards(index1,index2,index3) {

		var typeProp = ["shape", "number", "color", "fill"];
		var i = 0;
		var typePropLength = typeProp.length;

		for (var i = 0; i < typePropLength;) {

			if (
					(
						(dealtCards[index1][typeProp[i]] === dealtCards[index2][typeProp[i]])
						&&
						(dealtCards[index2][typeProp[i]] === dealtCards[index3][typeProp[i]])
					)
					||
					(
						(dealtCards[index1][typeProp[i]] != dealtCards[index2][typeProp[i]])
						&&		
						(dealtCards[index2][typeProp[i]] != dealtCards[index3][typeProp[i]])
						&&
						(dealtCards[index1][typeProp[i]] != dealtCards[index3][typeProp[i]])
					)
				) 
			{
				
				i++;

			} else {

				return false;
			}
		}
	
		return true;

	}


	//create all cards, one for each unique combination of shape, color, number and fill. 
	for (var i = 0; i < 81;) {

		for (var fillIndex = 0; fillIndex < fillLength; fillIndex++){

			for (var colorIndex = 0; colorIndex < colorLength; colorIndex++) {

				for (var shapeIndex = 0; shapeIndex < shapeLength; shapeIndex++) {

					for (var numberIndex = 0; numberIndex < numberLength; numberIndex++) {

						allCards[i] = new card (number[numberIndex], shape[shapeIndex], color[colorIndex], fill[fillIndex]);
						i++;
					}
				}
			}
		}
	}

	dealCards();	
	
	$("button[name='checkSet']").click(function() {

		checkSet();

	});

	$("button[name='deal3']").click(function() {

		var dealtCardsLength = dealtCards.length;

		//check to see if there is a set on the board before dealing more cards
		for (var i = 0; i < dealtCardsLength;i++) {

			for (var j = i+1; j < dealtCardsLength;j++) {

				for (var k = j+1; k < dealtCardsLength;k++) {

					var set = compareCards(i,j,k);

					if (set) {

						alert ("There is a set on the board.")
						console.log(dealtCards[i].divId, dealtCards[j].divId, dealtCards[k].divId)
						return;
					}

				}

			}

		}

	  $(".hidden").removeClass("hidden").addClass("show");

		dealCards();
	});


});