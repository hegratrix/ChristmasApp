let recipeLists = []
let addingToList 

function displayLists() {
    $.get("/recipeList", function (data) {
        for (let i=0; i< data.length; i++) {
            if (recipeLists.includes(data[i].whichList) === false) {
                recipeLists.push(data[i].whichList)
            }
        }
    recipeLists.forEach(function(item) {
        $('#add-recipe-list').append (`
            <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
        `)
        });
    });
}

function addGiftItem() {
    event.preventDefault()
    var newRecipeImageInput = $("#recipeImage").val();
    var newRecipeNameInput = $("#recipeType").val();
    var newRecipeLinkInput = $("#recipeLink").val();
    var newRecipeMakesInput = $("#recipeMakes").val();
    var recipe = {
        whichList: addingToList,
        recipeImage: newRecipeImageInput,
        recipeName: newRecipeNameInput,
        recipeLink: newRecipeLinkInput,
        newRecipeMakesInput: newRecipeMakesInput,         
        complete: false
   };
   $.post("/recipeList", recipe);  
   $('#recipe-table tr:last').before(`
      <tr>
         <td><input type="checkbox" name="bought" value="false"><br></td>
         <td>${newRecipeImageInput}</td>
         <td>$${newRecipeNameInput}</td>
         <td>${newRecipeLinkInput}</td>
         <td>$${newRecipeMakesInput}</td>
         <td><button id="edit-recipe-list" class="add-to-table" onclick="editRecipeItem()">Edit</button></td>
         <td><button id="delete-recipe-list" class="add-to-table" onclick="deleteRecipeItem()">Delete</button></td>
      </tr>
   `)
   $("#recipeName").val('')
   $("#recipeBudget").val('')
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






        //   // variable to link input fields for adding new list item
        //   
          
        //   // variable to link list results to html
        //   var $todoContainer = $(".todo-container");

        //   // event listeners for deleting, editing, and adding todos
        //   $(document).on("click", "button.delete", deleteTodo);
        //   $(document).on("click", "button.complete", toggleComplete);
        //   $(document).on("submit", "#todo-form", insertTodo);

        //   // initial list todos array
        //   var todos = [];

        //   // grabs todo list from database when page loads
        //   getTodos();

        //   // resets the todo list displayed with new todos from the database
        //   function initializeRows() {
        //        $todoContainer.empty();
        //        var rowsToAdd = [];
        //        for (var i = 0; i < todos.length; i++) {
        //             rowsToAdd.push(createNewRow(todos[i]));
        //        }
        //        $todoContainer.prepend(rowsToAdd);
        //   }

        //   // grabs todo list from the database and updates the view
        //   function getTodos() {
        //        $.get("/recipeList", function (data) {
        //             todos = data;
        //             initializeRows();
        //        });
        //   }

        //   // deletes a todo from the list when the user clicks the delete button
        //   function deleteTodo(event) {
        //        event.stopPropagation();
        //        var id = $(this).data("id");
        //        $.ajax({
        //             method: "DELETE",
        //             url: "/recipeList/" + id
        //        }).then(getTodos);
        //   }

        //   // toggles strike-through to indicate completed status
        //   function toggleComplete(event) {
        //        event.stopPropagation();
        //        var todo = $(this).parent().data("todo");
        //        todo.complete = !todo.complete;
        //        updateTodo(todo);
        //   }

        //   // updates a todo list item in the database
        //   function updateTodo(todo) {
        //        $.ajax({
        //             method: "PUT",
        //             url: "/recipeList",
        //             data: todo
        //        }).then(getTodos);
        //   }

        //   // constructs each todo list item row
        //   function createNewRow(todo) {
        //        var $newInputRow = $([
        //             "<li class='list-group-item todo-item'>",
        //             "<span>",
        //             todo.recipeName,
        //             "</span>",
        //             "<br>",
        //             "<span>",
        //             todo.recipeLink,
        //             "</span>",
        //             "<br>", "<span>",
        //             todo.recipeMakes,
        //             "</span>",                    
        //             "<input type='text' class='edit' style='display: none;'>",
        //             "<button class='delete btn btn-danger'>x</button>",
        //             "<button class='complete btn btn-primary'>✓</button>",
        //             "</li>"
        //        ].join("")
        //        );
        //        $newInputRow.find("button.delete").data("id", todo.id);
        //        $newInputRow.data("todo", todo);
        //        if (todo.complete) {
        //             $newInputRow.find("span").css("text-decoration", "line-through");
        //        }
        //        return $newInputRow;
        //   }

        //   // inserts a new todo item into our database and then updates the view
        //   function insertTodo(event) {
        //        event.preventDefault();
        //        var todo = {
        //             recipeName: $newRecipeNameInput.val().trim(),
        //             recipeLink: $newRecipeLinkInput.val().trim(),
        //             recipeMakes: $newRecipeMakesInput.val().trim(),                    
        //             complete: false
        //        };
        //        $.post("/recipeList", todo, getTodos);
        //        $newRecipeNameInput.val("");
        //        $newRecipeLinkInput.val("");
        //        $newRecipeMakesInput.val("");               
        //   }