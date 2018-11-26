let groceryLists = []
let addingToList 

function displayLists() {
    $.get("/groceryList", function (data) {
        for (let i=0; i< data.length; i++) {
            if (groceryLists.includes(data[i].whichList) === false) {
                groceryLists.push(data[i].whichList)
            }
        }
    groceryLists.forEach(function(item) {
        $('#add-grocery-list').append (`
            <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
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
        groceryQuantity: newGroceryQuantityInput,
        groceryItem: newGroceryItemInput,                          
        complete: false
   };
   $.post("/grocerysList", grocery);  
   $('#grocery-table tr:last').before(`
      <tr>
         <td><input type="checkbox" name="bought" value="false"><br></td>
         <td>${newGroceryQuantityInput}</td>
         <td>$${newGroceryItemInput}</td>
         <td><button id="edit-grocery-list" class="add-to-table" onclick="editGroceryItem()">Edit</button></td>
         <td><button id="delete-grocery-list" class="add-to-table" onclick="deleteGroceryItem()">Delete</button></td>
      </tr>
   `)
   $("#groceryName").val('')
   $("#groceryBudget").val('')
}

function showList(Name) {
    addingToList = Name
    $('#gift-list-title').html(`${Name} Gift List`)
    $('.gift-table-body').empty()
    $('.done-gift-table-body').empty()
    $.get("/giftsList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === Name && data[i].complete === false) {
                $('.gift-table-body').append(`
                    <tr>
                        <td><input type="checkbox" name="bought" value="complete"><br></td>
                        <td>${data[i].giftName}</td>
                        <td>$${data[i].giftBudget}</td>
                        <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem()">Edit</button></td>
                        <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem()">Delete</button></td>
                    </tr>
             `)
            } else {
                if (data[i].whichList === Name) {
                    $('.done-gift-table-body').append(`
                    <tr>
                        <td><input type="checkbox" name="bought" value="complete"><br></td>
                        <td>${data[i].giftName}</td>
                        <td>${data[i].giftBought}</td>
                        <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem()">Edit</button></td>
                        <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem()">Delete</button></td>
                    </tr>
             `)
                }
            }
        }
    })
    $('#show-gift-details').css('display', 'block')













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