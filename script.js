const draggables = document.querySelectorAll('.draggable');
const targetContainer = document.querySelector('.target-container');
const addButton = document.querySelector('.plus-icon');
const resetButton = document.getElementById('reset-button');

// Add event listeners for drag and drop
draggables.forEach(draggable => {
    addEventsDragAndDrop(draggable);
});

targetContainer.addEventListener('dragover', dragOver);
targetContainer.addEventListener('drop', dragDrop);

resetButton.addEventListener('click', resetContainers);




function dragStart(event) {
    draggedItem = this;
    setTimeout(() => {
        this.style.opacity = '0.5';
    }, 0);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
}

function dragOver(event) {
    event.preventDefault();
}

function dragDrop(event) {
    if (draggedItem !== null) {
        targetContainer.appendChild(draggedItem);
        draggedItem.style.opacity = '1';
        draggedItem = null;
        displaySuccessMessage()
    }
}


function displaySuccessMessage() {
    const successMessage = document.createElement('p');
    successMessage.textContent = "Item Dropped successfully";
    successMessage.classList.add('success-message');
    document.body.appendChild(successMessage)

    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

function resetContainers() {
    targetContainer.innerHTML = '<h2>Target Container</h2>';
    draggables.forEach(draggable => {
        draggable.style.opacity = '1';
        document.querySelector('.source-container').appendChild(draggable);
        addEventsDragAndDrop(draggable);
    });
}


function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('drop', dragDrop, false);
}



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

addButton.addEventListener('click', addNewItem);
