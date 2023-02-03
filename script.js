let items = [];

//Get
function getData() {
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(res => res.json())
  .then(content => {
    items = content
    _displayItems()
  })
  .catch(er => console.error(er));
}
getData();

//Post

function addData() {
  const addTaskTextbox = document.getElementById('task');
  if(addTaskTextbox.value == '') {
    alert('Failed: Task needed')
    return;
  }else{
    //console.log(items.length)
    const newItem = {
      completed: false,
      title: addTaskTextbox.value,
      userId: 1
    }

    fetch('https://jsonplaceholder.typicode.com/todos/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem),
  
  })

  .then((res) => res.json())
  .then((content) => {
    updateItemsList(content)
    _displayItems()
  })
  .catch(er => console.log(er));
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  addData()
  _displayCount(items.length +1)
})

function updateItemsList(content) {
  const newContent = {
    id: items.length +1,
    completed: content.completed,
    title: content.title,
    userId: content.userId
  }

  items.unshift(newContent)
  console.log(newContent)
}

function deleteData(id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) {
      console.log(`Task ${id} deleted successfully.`);
    } else {
      console.log(`Error deleting resource ${id}.`);
    }
  })
  .catch(er => console.log(er));

    items = items.filter(function(item) {
      return item.id !== id
    })

    _displayItems()
    _displayCount(items.length -1)
}

//Task Counter
function _displayCount(itemCount) {
  const title = (itemCount === 1) ? 'to-do' : 'to-dos';
  document.getElementById('counter').innerText = `${itemCount} ${title}`;
}


function _displayItems() {

  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(items.length);

  const button = document.createElement('button');

  items.forEach(item => {
    let completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.checked = item.completed;

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.addEventListener('click', () => {
      deleteData(item.id)
    });

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.className = "border border-3 border-dark";
    td1.appendChild(completedCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.title);
    td2.className = "border border-3 border-dark";
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.className = "border border-3 border-dark";
    td3.appendChild(deleteButton);
  });
}


/*
//Put
function updateData() {
  const item = {
    'id': parseInt(10),
    'completed': checked,
    'title': title,
    'userId':1
  };
  
  fetch(`https://jsonplaceholder.typicode.com/todos/${item.Id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(res => res.json())
  .catch(er=> console.log(er));

closeInput();
return false;
}
*/
//Delete
/*
//Checkbox
function checkbox(id) {


  const item = items.find((item) => item.id === id);
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.completed;
}
*/