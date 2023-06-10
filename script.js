
// Select the draggable items, target container, add button, and reset button
const draggables = document.querySelectorAll('.draggable');
const targetContainer = document.querySelector('.target-container');
const addButton = document.querySelector('.plus-icon');
const resetButton = document.getElementById('reset-button');
const input = document.querySelector('.input');

// Add event listeners for drag and drop
draggables.forEach(draggable => {
    addEventsDragAndDrop(draggable);
});

targetContainer.addEventListener('dragover', dragOver);
targetContainer.addEventListener('drop', dragDrop);

resetButton.addEventListener('click', resetContainers);




function dragStart(event) {
    draggedItem = this;
    // Delay setting the opacity to give a visual feedback
    setTimeout(() => {
        this.style.opacity = '0.5';
    }, 0);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
}


// Event listener for dragging over the target container
function dragOver(event) {
    event.preventDefault();
}



// Event listener for dropping the item into the target container
function dragDrop(event) {
    if (draggedItem !== null) {
        targetContainer.appendChild(draggedItem);
        draggedItem.style.opacity = '1';
        draggedItem = null;
        displaySuccessMessage()
    }
}

// Display a success message when an item is dropped
function displaySuccessMessage() {
    const successMessage = document.createElement('p');
    successMessage.textContent = "Item Dropped successfully";
    successMessage.classList.add('success-message');
    document.body.appendChild(successMessage)
    // Remove the success message after a delay
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}


// Reset the containers to their initial state

function resetContainers() {
    targetContainer.innerHTML = '';
    draggables.forEach(draggable => {
        draggable.style.opacity = '1';
        document.querySelector('.source-container').appendChild(draggable);
        addEventsDragAndDrop(draggable);
    });
}

// Add drag and drop event listeners to an element
function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('drop', dragDrop, false);
}

input.addEventListener('keydown', handleInputKeyDown);

function handleInputKeyDown(event) {
    if (event.key === 'Enter') {
        addNewItem();
    }
}


// Add a new item to the draggable list
function addNewItem() {
    const newItem = document.querySelector('.input').value;
    if (newItem !== '') {
        document.querySelector('.input').value = '';
        const li = document.createElement('li');
        li.className = 'draggable';
        li.draggable = true;
        li.appendChild(document.createTextNode(newItem));
        addEventsDragAndDrop(li);
        document.querySelector('ul').appendChild(li);
    }
}
// Event listener for the add button
addButton.addEventListener('click', addNewItem);


