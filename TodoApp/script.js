const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let liId = 0;

function newTodo() {
  const text = prompt("enter");
  const li = document.createElement("LI");
  li.setAttribute("class", classNames.TODO_ITEM);
  li.setAttribute("id" , "todo" + liId++);

  const checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", classNames.TODO_CHECKBOX);

  const node = document.createElement("SPAN");
  node.setAttribute("class", classNames.TODO_TEXT);
  node.textContent = text;

  const deleteButton = document.createElement("IMG");
  deleteButton.setAttribute("src", "./icon.png");
  deleteButton.setAttribute("class", classNames.TODO_DELETE);
  deleteButton.setAttribute("onClick", "deleteTodo(this, this.parentElement.firstChild)");


  li.appendChild(checkbox);
  li.appendChild(node);
  li.appendChild(deleteButton);
  list.appendChild(li);

  let checkedItems = li.firstChild;

  countItems(itemCountSpan);
  countUncheckedItems(uncheckedCountSpan);

  checkedItems.addEventListener('click', function(e){
      if(e.target.checked){
        let count = uncheckedCountSpan.innerHTML;
        count--;
        uncheckedCountSpan.textContent = count.toString();
      }else if(!e.target.checked){
        let count = uncheckedCountSpan.innerHTML;
        count++;
        uncheckedCountSpan.textContent = count.toString();
      }
  });
}

function countItems(value){
  let count = +value.innerHTML;
  count++;
  value.innerHTML = count.toString();
}

function countUncheckedItems(value){
  let count = +value.innerHTML;
  count++;
  value.innerHTML = count.toString();
}

function deleteTodo(elem,e){
  var o = elem.parentNode.id;
  let li = document.getElementById(o);
  list.removeChild(li);

  let countItem = itemCountSpan.innerHTML;
  countItem--;
  itemCountSpan.innerHTML = countItem;

  let uncheckedCount = uncheckedCountSpan.innerHTML;
  if(e.checked === false){
    uncheckedCount--;
    uncheckedCountSpan.innerHTML = uncheckedCount.toString();
  }
  
}