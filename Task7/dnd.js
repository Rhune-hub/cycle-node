"use strict";

let selectedTrash, heightDifference, trashBoxHeight, trashBoxWidth;

createTrashBox();
generateTrash();

/**
 * Function randomly add trash to the page
 */
function generateTrash() {
	let count = getRandomNum(5, 50);
	for (let i = 0; i < count; i++) {
		let trash = document.createElement("img");
		trash.classList.add("trash");
		trash.src = "trash.svg";
		trash.style.width = "100px";
		trash.style.position = "absolute";
		let cordX = randCoordX();
		let cordY = randCoordY();
		if (cordX < trashBoxWidth && cordY < trashBoxHeight) {
			cordX += trashBoxWidth + 20;
		}
		trash.style.left = cordX + "px";
		trash.style.top = cordY + "px";
		trash.addEventListener("dragstart", () => {
			return false;
		});
		trash.addEventListener("mousedown", mouseDown);
		document.body.appendChild(trash);
	}
}
/**
 * Function create trashbox and add it to the page
 */
function createTrashBox() {
	let trashContainer = document.createElement("img");
	trashContainer.classList.add("trashbox");
	trashContainer.src = "close.jpg";
	trashContainer.style.position = "absolute";
	heightDifference = 148;
	trashContainer.style.top = heightDifference + "px";
	trashBoxWidth = +trashContainer.width;
	trashBoxHeight = +trashContainer.height + heightDifference;
	document.body.appendChild(trashContainer);
}
/**
 * Random vertical coord generator
 */
function randCoordY() {
	let randCoord = (getRandomNum(0, 20) * 100) % (window.innerHeight - 100);
	return randCoord;
}
/**
 * Random horizontal coord generator
 */
function randCoordX() {
	let randCoord = (getRandomNum(0, 20) * 100) % (window.innerWidth - 100);
	return randCoord;
}
/**
 * Generate random random in range from min to max
 * @param {number} min - min number of generation
 * @param {number} max - max number of generation
 */
function getRandomNum(min = 0, max = 100) {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}
/**
 * Mouse down handler
 * @param {Event} event 
 */
function mouseDown(event) {
	event.preventDefault();
	selectedTrash = event.currentTarget;
	selectedTrash.classList.add("selected");

	let shiftX = event.clientX - selectedTrash.getBoundingClientRect().left;
	let shiftY = event.clientY - selectedTrash.getBoundingClientRect().top;

	selectedTrash.style.zIndex = 1000;
	document.body.append(selectedTrash);

	moveAt(event.pageX, event.pageY);

	/**
	 * Move draggable item with the mouse
	 * @param {number} pageX - Horizontal coord
	 * @param {number} pageY - Vertical coord
	 */
	function moveAt(pageX, pageY) {
		selectedTrash.style.left = pageX - shiftX + "px";
		selectedTrash.style.top = pageY - shiftY + "px";
	}

	let currentDroppable;

	/**
	 * Mouse moving handler
	 * @param {Event} event 
	 */
	function mouseMove(event) {
		moveAt(event.pageX, event.pageY);
		selectedTrash.hidden = true;
		let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
		selectedTrash.hidden = false;

		if (!elemBelow) return;
		let droppableBelow = elemBelow.closest(".trashbox");
		if (currentDroppable != droppableBelow) {
			if (currentDroppable) {
				dragLeave(currentDroppable);
			}
			currentDroppable = droppableBelow;
			if (currentDroppable) {
				dragEnter(currentDroppable);
			}
		}
	}
	document.addEventListener("mousemove", mouseMove);
	/**
	 * Mouse up handler
	 */
	selectedTrash.onmouseup = function () {
		document.removeEventListener("mousemove", mouseMove);
		selectedTrash.onmouseup = null;
		if (currentDroppable) {
			drop(currentDroppable);
		}
	};
}
/**
 * Function of openning trashbox when the trash is enter to the trashbox
 * @param {HTMLElement} elem - Trashbox element
 */
function dragEnter(elem) {
	elem.src = "open.jpg";
	elem.style.left = 10 + "px";
	elem.style.top = 0;
}
/**
 * Function of openning trashbox when the trash is leave the trashbox
 * @param {HTMLElement} elem - Trashbox element
 */
function dragLeave(elem) {
	elem.src = "close.jpg";
	selectedTrash.classList.remove("selected");
	elem.style.top = heightDifference + "px";
	elem.style.left = 0;
}
/**
 * Function of openning trashbox when the trash is dropped into the trashbox
 * @param {HTMLElement} elem - Trashbox element
 */
function drop(elem) {
	elem.src = "close.jpg";
	elem.style.top = heightDifference + "px";
	elem.style.left = 0;
	selectedTrash.remove();
}
