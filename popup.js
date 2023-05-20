document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('openNewTab').addEventListener('click', openNewTabs);
  document.getElementById('addTextBox').addEventListener('click', createTextBox);
});


let textBoxCount = 0;

function createTextBox() {
  const textBoxContainer = document.getElementById('text-box-container');
  const textBoxCount = document.getElementsByClassName('grid-item').length;
  
  const newTextBox = document.createElement('input');
  newTextBox.type = 'text';
  newTextBox.name = 'text-box';
  newTextBox.id = `text-box-${textBoxCount + 1}`;
  newTextBox.placeholder = `Text Box ${textBoxCount + 1}`;

  const newGridItem = document.createElement('div');
  newGridItem.className = 'grid-item';
  newGridItem.appendChild(newTextBox);

  textBoxContainer.appendChild(newGridItem);
}

function openNewTabs() {
  chrome.tabs.create({});
}