let groceryLists = []
let addingToList 

function displayLists() {
    groceryLists = []
    console.log(groceryLists)
    $.get("/groceryList", function (data) {
        for (let i=0; i< data.length; i++) {
            if (groceryLists.includes(data[i].whichList) === false) {
                groceryLists.push(data[i].whichList)
            }
        }
    groceryLists.forEach(function(item) {
        $('#add-grocery-list').append (`<div class="delete-list-div">
        <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
        <button class="delete-list-button" onclick="deleteList('${item}')">Delete</button>
        </div>
        `)
        });
    });
}

function addGroceryItem() {
    event.preventDefault()
    let newGroceryQuantityInput = $("#groceryQuantity").val().trim()
    let newGroceryItemInput = $("#groceryItem").val().trim()
    var grocery = {
        whichList: addingToList,
        groceryAmount: newGroceryQuantityInput,
        groceryName: newGroceryItemInput,                          
        complete: false
   };
   $.post("/groceryList", grocery)  
   .then(r => {
   $("#groceryQuantity").val('')
   $("#groceryItem").val('')
   showList(addingToList)
})
}

function showList(Name) {
    addingToList = Name
    $('#grocery-list-title').html(`${Name} Grocery List`)
    $('.grocery-table-body').empty()
    $('.done-grocery-table-body').empty()
    $.get("/groceryList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === Name && data[i].complete === false) {
                $('.grocery-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                        <td>${data[i].groceryName}</td>
                        <td>${data[i].groceryAmount}</td>
                        <td><button id="edit-grocery-list" class="add-to-table" onclick="editGroceryItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-grocery-list" class="add-to-table" onclick="deleteGroceryItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
            } else {
                if (data[i].whichList === Name) {
                    $('.done-grocery-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                        <td>${data[i].groceryName}</td>
                        <td>${data[i].groceryAmount}</td>
                        <td><button id="edit-grocery-list" class="add-to-table" onclick="editGroceryItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-grocery-list" class="add-to-table" onclick="deleteGroceryItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
                }
            }
        }
    })
    $('#show-grocery-details').css('display', 'block')
}

function addToGroceryList() {
    event.preventDefault()
    let listName = $('#add-to-grocery-list').val()
    $('#add-grocery-list').append (`<div class="delete-list-div">
    <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
    <button class="delete-list-button" onclick="deleteList('${listName}')">Delete</button>
    </div>
    `)
    $('#add-to-grocery-list').val('')
}

function showCompleted() {
    $('#show-grocery-done').css('display', 'block')
    $('#show-grocery').css('display', 'none')
    $('#hide-grocery').css('display', 'block')
}

function hideCompleted() {
    $('#show-grocery-done').css('display', 'none')
    $('#show-grocery').css('display', 'block')
    $('#hide-grocery').css('display', 'none')
}

function deleteGroceryItem(id) {
    event.stopPropagation();
    fetch(`/groceryList/${id}`, {
        method: 'DELETE'
    }).then(r=> {
        showList(addingToList)
    })
}

function changeStatus(idStatus) {
    let isComplete 
    $.get("/groceryList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === idStatus) {
                isComplete = data[i].complete
            }
        }
    })
    .then(r => {
        if (isComplete === true) {
            fetch(`/groceryList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: false })
            }).then(r=> {
           showList(addingToList)
            })
        } else {
            fetch(`/groceryList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: true })
            }).then(r=> {
           showList(addingToList)
            })
        }
   })
}

function editGroceryItem (id) {
    $.get("/groceryList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === id) {
                $('#modal6-id').val(id)
                $("#grocery-list").val(data[i].whichList)                
                $("#grocery-item").val(data[i].groceryName)               
                $("#grocery-quantity").val(data[i].groceryAmount)
            }
        }
    }).then(r => {
    $('.modal6').css('display', 'block')
    })
}

function updateItem () {
    let id = $("#modal6-id").val()
    let list = $('#grocery-list').val()
    let item = $('#grocery-item').val()
    let quantity = $('#grocery-quantity').val()
    fetch(`/groceryList/${id}`, {
        method: "PUT",
        headers: { 'Content-Type' : 'application/json; charset=utf-8'},
        body: JSON.stringify({ groceryName: item, groceryAmount: quantity, whichList: list})
}).then(r=> {
    $('.modal6').css('display', 'none')
        $("#modal6-id").val('')
        $('#grocery-list').val('')
        $('#grocery-item').val('')
        $('#grocery-quantity').val('')
        showList(addingToList)
    })
}

function deleteList(name) {
    $.get("/groceryList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === name){
                let id = data[i].id
                fetch(`/groceryList/${id}`, {
                    method: 'DELETE'
                })
            }
        }
    })    
.then(r=> {
    groceryLists = []
    location.reload()
})     
}

            //    // event listeners for deleting, editing, and adding todos
            //    $(document).on("click", "button.delete", deleteTodo);
            //    $(document).on("click", "button.complete", toggleComplete);
            //    $(document).on("submit", "#todo-form", insertTodo);

            //    // initial list todos array
            //    var todos = [];

            //    // grabs todo list from database when page loads
            //    getTodos();

            //    // resets the todo list displayed with new todos from the database
            //    function initializeRows() {
            //         $todoContainer.empty();
            //         var rowsToAdd = [];
            //         for (var i = 0; i < todos.length; i++) {
            //              rowsToAdd.push(createNewRow(todos[i]));
            //         }
            //         $todoContainer.prepend(rowsToAdd);
            //    }

            //    // grabs todo list from the database and updates the view
            //    function getTodos() {
            //         $.get("/groceryList", function (data) {
            //              todos = data;
            //              initializeRows();
            //         });
            //    }

            //    // deletes a todo from the list when the user clicks the delete button
            //    function deleteTodo(event) {
            //         event.stopPropagation();
            //         var id = $(this).data("id");
            //         $.ajax({
            //              method: "DELETE",
            //              url: "/groceryList/" + id
            //         }).then(getTodos);
            //    }

            //    // toggles strike-through to indicate completed status
            //    function toggleComplete(event) {
            //         event.stopPropagation();
            //         var todo = $(this).parent().data("todo");
            //         todo.complete = !todo.complete;
            //         updateTodo(todo);
            //    }

            //    // updates a todo list item in the database
            //    function updateTodo(todo) {
            //         $.ajax({
            //              method: "PUT",
            //              url: "/groceryList",
            //              data: todo
            //         }).then(getTodos);
            //    }

            //    // constructs each todo list item row
            //    function createNewRow(todo) {
            //         var $newInputRow = $([
            //              "<li class='list-group-item todo-item'>",
            //              "<span>",
            //              todo.groceryName,
            //              "</span>",
            //              "<br>",
            //              "<span>",
            //              todo.groceryAmount,
            //              "</span>",
            //              "<input type='text' class='edit' style='display: none;'>",
            //              "<button class='delete btn btn-danger'>x</button>",
            //              "<button class='complete btn btn-primary'>✓</button>",
            //              "</li>"
            //         ].join("")
            //         );
            //         $newInputRow.find("button.delete").data("id", todo.id);
            //         $newInputRow.data("todo", todo);
            //         if (todo.complete) {
            //              $newInputRow.find("span").css("text-decoration", "line-through");
            //         }
            //         return $newInputRow;
            //    }

            //    // inserts a new todo item into our database and then updates the view
            //    function insertTodo(event) {
            //         event.preventDefault();
            //         var todo = {
            //              groceryName: $newGroceryNameInput.val().trim(),
            //              groceryAmount: $newGroceryAmountInput.val().trim(),
            //              complete: false
            //         };
            //         $.post("/groceryList", todo, getTodos);
            //         $newGroceryNameInput.val("");
            //         $newGroceryAmountInput.val("");
            //    }