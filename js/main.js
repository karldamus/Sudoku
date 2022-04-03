let sudokuArray = [];
var difficulty;
var selectedInput = -1;
var note = false;

window.onload = function() {
	setup();
};

function setup() {
	resetHtmlContent();
	setupButtons();

	createSudokuArray();
	generateSudokuGame();
	createSudokuGrid(document.getElementById("sudoku--wrapper"));
	
	createInputWrapper(document.getElementById("input--wrapper"));
	setupInputOptions(document.getElementById("edit--wrapper"));
}

// SETUP FUNCTIONS
//

// reset specific HTML content to allow for a new game to be displayed
// see #setup
function resetHtmlContent() {
	let sudokuWrapper = document.getElementById("sudoku--wrapper");
	let inputWrapper = document.getElementById("input--wrapper");

	sudokuWrapper.innerHTML = '';
	inputWrapper.innerHTML = '';
}

// setup the interactive buttons for use by the user
function setupButtons() {
	let newGameBtn = document.getElementById("newgame");

	newGameBtn.addEventListener("click", setup);
}

// fill the sudoku array object
function createSudokuArray() {
	for (let i = 0; i < 9; i++) {
		sudokuArray[i] = new Array(9);

		// init all null values
		for (let j = 0; j < 9; j++) {
			sudokuArray[i][j] = {
				value: null,
				id: 0,
				notes: new Array(9)
			};
		}
	}
}

function createSudokuGridOld(sudokuWrapper) {
	for (let i = 0; i < 9; i++) {
		let outerBox = document.createElement("div");
		outerBox.classList.add("outerBox");
		outerBox.id = "outerBox--" + i;

		for (let j = 0; j < 9; j++) {
			// setup inner box (main number box)
			let innerBox = document.createElement("div");
			innerBox.classList.add("innerBox");
			innerBox.id = i + "--innerBox--" + j;

			// main value of inner box
			let span = document.createElement("span");

			// todo: create notes div with inner note elements
			// todo: ensure css absolute values and z-index values are appropiate
			// todo: and make individual elements visible based on each visibility requirements
			// todo: idk tbh, just follow that sudoku game on mobile
			let notesDiv = document.createElement("div");
			notesDiv.classList.add("notes--wrapper");

			// for (let k = 0; k < 9; k++) {
			// 	let span = document.createElement("span");
			// 	span.id = (i) + "-" + (j) + "-" + (k);
			// 	// span.innerHTML = k+1;
			// 	notesDiv.appendChild(span);
			// }

			// innerBox.appendChild(notesDiv);

			// fill pre-determined value
			if ((sudokuArray[i][j] != null)) {
				span.innerHTML = sudokuArray[i][j].value;
			}

			// add click event listener for adding value
			innerBox.addEventListener("click", function() {
				// check if value is not pre-determined (editable)
				if (selectedInput != -1 && sudokuArray[i][j].id == 0) {
					// if currently making notes
					// if (note == true) {
					// 	// check if selectedInput value is already in notes
					// 	if (sudokuArray[i][j].notes[selectedInput - 1] == selectedInput) {
					// 		sudokuArray[i][j].notes[selectedInput - 1] = null;
					// 	} else {
					// 		sudokuArray[i][j].notes[selectedInput - 1] = selectedInput;
					// 	}

					// 	if (sudokuArray[i][j].notes.length != 0) {
					// 		sudokuArray[i][j].value = null;
					// 		let mainValueSpan = document.getElementById(i + "--innerBox--" + j);
					// 		mainValueSpan.innerText = '';

					// 		console.log((i) + "-" + (j) + "-" + (selectedInput - 1));
					// 		let noteSpan = document.getElementById((i) + "-" + (j) + "-" + (selectedInput - 1));
					// 		noteSpan.innerText = selectedInput;
					// 	}

					// 	console.log(sudokuArray[i][j].notes);
					// }
					// check if value already in, then remove & set to null
					if (sudokuArray[i][j].value == selectedInput) {
						sudokuArray[i][j].value = null;
						span.innerHTML = '';

						// also reset notes value
						sudokuArray[i][j].notes = new Array(9);
					} 
					// else update value
					else {
						sudokuArray[i][j].value = selectedInput;
						span.innerHTML = selectedInput;
						span.classList.add("userInputtedNumber");

						// also reset notes value
						sudokuArray[i][j].notes = new Array(9);
					}
				}
			});

			innerBox.appendChild(span);
			outerBox.appendChild(innerBox);
		}

		sudokuWrapper.appendChild(outerBox);
	}
}



function createSudokuGridOld2(sudokuWrapper) {
	// create outer boxes x9
	//
	for (let i = 0; i < 9; i++) {
		let outerBox = document.createElement("div");
		outerBox.classList.add("outerBox");
		outerBox.id = "ob:" + i;

		// create inner boxes x9
		//
		for (let j = 0; j < 9; j++) {
			let innerBox = document.createElement("div");
			innerBox.classList.add("innerBox");
			innerBox.classList.add("hasNotes");
			innerBox.id = "ob:" + i + "ib:" + j;

			// create main span value
			let span = document.createElement("span");
			span.id = "ob:" + i + "ib:" + j + "--value";
			innerBox.appendChild(span);

			// create notes boxes x9
			//
			for (let k = 0; k < 9; k++) {
				let noteBox = document.createElement("div");
				noteBox.classList.add("noteBox");
				noteBox.id = "ob:" + i + "ib:" + j + "nb:" + k;

				if (k == 0)
					noteBox.innerHTML = k+1;

				// create span

				// add event listener
				innerBox.addEventListener("click", function() {

					// if currently editing the notes
					if (note) {
						// check if input has been selected
						// and if value is not pre-determined (editable)
						// updates sudokuArray notes value
						if (selectedInput != -1 && sudokuArray[i][j].id == 0) {
							if (sudokuArray[i][j].notes[selectedInput - 1] != null) {
								sudokuArray[i][j].notes[selectedInput - 1] = null;
							} else {
								sudokuArray[i][j].notes[selectedInput - 1] = selectedInput;
							}

							// update sudoku visual
							let noteDiv = document.getElementById("ob:" + i + "ib:" + j + "nb:" + (selectedInput - 1));
							noteDiv.innerHTML = sudokuArray[i][j].notes[selectedInput - 1] == null ? '' : selectedInput;

							// check length of notes array
							if (empty(sudokuArray[i][j].notes)) {
								let innerBox = document.getElementById("ob:" + i + "ib:" + j);
								innerBox.classList.remove("hasNotes");
								innerBox.classList.add("noNotes");

								// set visibility for span
								let valueSpan = document.getElementById("ob:" + i + "ib:" + j + "--value");
								valueSpan.style.display = "block";
							} else {
								let innerBox = document.getElementById("ob:" + i + "ib:" + j);
								innerBox.classList.add("hasNotes");
								innerBox.classList.remove("noNotes");

								// set visibility for span
								let valueSpan = document.getElementById("ob:" + i + "ib:" + j + "--value");
								valueSpan.style.display = "none";
							}
						}

						
					} 

					// else update main value
					else {
						// check if input has been selected
						// and if value is not pre-determined (editable)
						// updates sudokuArray main value
						if (selectedInput != -1 && sudokuArray[i][j].id == 0) {
							if (sudokuArray[i][j].value != null) {
								sudokuArray[i][j].value = null;
							} else {
								sudokuArray[i][j].value = selectedInput;
							}

							// remove all note values
							sudokuArray[i][j].notes = new Array(9);

							// update visual
							let innerBox = document.getElementById("ob:" + i + "ib:" + j);
							let valueSpan = document.getElementById("ob:" + i + "ib:" + j + "--value");
							
							valueSpan.innerHTML = sudokuArray[i][j].value == null ? '' : sudokuArray[i][j].value;
							valueSpan.style.display = "block";

							// remove any note values
							for (let l = 0; l < 9; l++) {
								let noteBox = document.getElementById("ob:" + i + "ib:" + j + "nb:" + l);
								noteBox.innerHTML = '';
							}

							// set visibility for span
							

							// update classlist
							innerBox.classList.remove("hasNotes");
							innerBox.classList.add("noNotes");
						}
					}
					
				});


				// append noteBox
				innerBox.appendChild(noteBox);
			}

			// append innerBox
			outerBox.appendChild(innerBox);
		}

		// append outerBox
		sudokuWrapper.appendChild(outerBox);
	}

}

function createSudokuGrid(sudokuWrapper) {
    // create 9 outer boxes
    for (let outerBoxId = 0; outerBoxId < 9; outerBoxId++) {
        let outerBox = createOuterBox(outerBoxId);
        
        // create 9 inner boxes for the current outerBox
        for (let innerBoxId = 0; innerBoxId < 9; innerBoxId++) {
            let innerBox = createInnerBox(innerBoxId, outerBoxId);
        
            // create 9 note boxes for the current innerBox
            for (let noteBoxId = 0; noteBoxId < 9; noteBoxId++) {
                let noteBox = createNoteBox(noteBoxId, innerBoxId, outerBoxId);     
            
                // add event listeners
                /* innerBox.addEventListener("click", sudokuBox_onClick(noteBoxId, innerBoxId, outerBoxId)); */
                
                // append current noteBox to current innerBox
                innerBox.appendChild(noteBox);
            }

            // add event listener to current innerBox
            //
            innerBox.addEventListener("click", () => sudokuBox_onClick(innerBoxId, outerBoxId));
            
            // append current innerBox to current outerBox
            outerBox.appendChild(innerBox);
        }

        // append current outerBox to sudokuWrapper
        sudokuWrapper.appendChild(outerBox);
    }    
}

function createOuterBox(outerBoxId) {
    let outerBox = document.createElement("div");
    outerBox.classList.add("outerBox");
    outerBox.id = "ob:" + outerBoxId;

    return outerBox;
}

function createInnerBox(innerBoxId, outerBoxId) {
    let innerBox = document.createElement("div");
    innerBox.classList.add("innerBox");
    innerBox.id = "ob:" + outerBoxId + "ib:" + innerBoxId;
    
    let span = document.createElement("span");
    span.id = "ob:" + outerBoxId + "ib:" + innerBoxId + "--value";
    innerBox.appendChild(span);

    return innerBox; 
}

function createNoteBox(noteBoxId, innerBoxId, outerBoxId) {
    let noteBox = document.createElement("div");
    noteBox.classList.add("noteBox");
    noteBox.id = "ob:" + outerBoxId + "ib:" + innerBoxId + "nb:" + noteBoxId;        
    
    return noteBox; 
}

function sudokuBox_onClick(innerBoxId, outerBoxId) {
    // check if an input selection has been made (selectedInput != -1)
    // and check if the selected box is editable (box.id == 0)
    if (selectedInput != -1 && sudokuArray[outerBoxId][innerBoxId].id == 0) {
        let innerBox = document.getElementById("ob:" + outerBoxId + "ib:" + innerBoxId);
        let noteBox = document.getElementById("ob:" + outerBoxId + "ib:" + innerBoxId + "nb:" + (selectedInput - 1));
        let innerBoxSpan = document.getElementById("ob:" + outerBoxId + "ib:" + innerBoxId + "--value");           
        let currentInnerBoxValue = sudokuArray[outerBoxId][innerBoxId].value;
        let noteIndex = selectedInput - 1;
        let tmpSudokuNotesArray = sudokuArray[outerBoxId][innerBoxId].notes[noteIndex];
        let currentNoteValue = sudokuArray[outerBoxId][innerBoxId].notes[noteIndex];

        /* innerBox.addEventListener("click", function() { */
                console.log("Clicked outerbox: " + outerBoxId + 1 + "; innerbox: " + innerBoxId);

                if (note) {
                // update the notes value in sudokuArray
                //      if null: set to selected input
                //      else   : set to null
                sudokuArray[outerBoxId][innerBoxId].notes[noteIndex] = 
                    (currentNoteValue == null) ? selectedInput : null;
               
                // update the notes value visually
                noteBox.innerHTML = (currentNoteValue == null) ? '' : selectedInput;
     
                // update the innerBox classList from the HTML 
                if (empty(tmpSudokuNotesArray)) {
                    innerBox.classList.remove("hasNotes");
                    innerBox.classList.add("noNotes");            
                } else {
                    innerBox.classList.remove("noNotes");
                    innerBox.classList.add("hasNotes");
                }          

                // remove any main value from innerBox
                innerBoxSpan.innerHTML = '';

                } else {
                    // update the innerBox value in sudokuArray
                    sudokuArray[outerBoxId][innerBoxId].value = 
                        (currentInnerBoxValue == selectedInput) ? null : selectedInput;

                    // update the innerBox value from the HTML (visually)
                    innerBoxSpan.innerHTML = 
                        (sudokuArray[outerBoxId][innerBoxId].value == null) ? '' : selectedInput; 
                }
         /* }); */
    }

}

function updateSudokuValue(isNote, valueLocation) {
    let outerBoxIndex = valueLocation[0];
    let innerBoxIndex = valueLocation[1];
    let noteBoxIndex = isNote ? valueLocation[2] : null;

    if (isNote) {
        updateSudokuArrayNoteValue(valueLocation); 
    } else {
        updateSudokuArrayValue(outerBoxIndex, innerBoxIndex);
    }
}

function updateSudokuArrayNoteValue(valueLocation) {
    let outerBoxIndex = valueLocation[0];
    let innerBoxIndex = valueLocation[1];
    let noteBoxIndex = isNote ? valueLocation[2] : null;

    sudokuArray[outerBoxIndex][innerBoxIndex].notes[noteBoxIndex] = null; 
}

function updateSudokuArrayValue(outerBoxIndex, innerBoxIndex) {
    
}

function empty(array) {
	for (let e of array) {
		if (e != null)
			return false;
	}

	return true;
}

function createInputWrapper(inputWrapper) {
	for (let i = 1; i <= 9; i++) {
		let div = document.createElement("div");
		let span = document.createElement("span");

		div.classList.add("inputNumber--wrapper");
		span.classList.add("inputNumber");
		span.id = "input--" + i;

		span.innerText = i;

		div.addEventListener("click", function() {
			for (let e of document.getElementsByClassName("selected")) {
				e.classList.remove("selected");
			}

			selectedInput = i;
			
			div.classList.add("selected");
		});

		div.appendChild(span);
		inputWrapper.appendChild(div);
	}
}

function setupInputOptions(inputOptionsWrapper) {
	inputOptionsWrapper.addEventListener("click", function() {
		// if (inputOptionsWrapper.classList.)
		if (note) {
			inputOptionsWrapper.classList.remove("selected");
			note = false;
		} else {
			inputOptionsWrapper.classList.add("selected");
			note = true;
		}
	});
}

// GAME LOGIC FUNCTIONS

function generateSudokuGame() {
	difficulty = document.getElementById("difficulty").value;
	difficulty = switchDifficulty(difficulty);
	
	let numOfStartingClues = getNumberOfStartingClues(difficulty);

	
}
