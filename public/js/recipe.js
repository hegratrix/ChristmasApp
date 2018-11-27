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

function addRecipeItem() {
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
        recipeMakes: newRecipeMakesInput,         
        complete: false
   };
   $.post("/recipeList", recipe);  
   $('#recipe-table tr:last').before(`
      <tr>
         <td><input class="checkbox" type="checkbox" name="bought" value="false"><br></td>
         <td><img class="recipe-pic" src="${newRecipeImageInput}"></td>
         <td>${newRecipeNameInput}</td>
        <td><a href="${newRecipeLinkInput}">Recipe</a></td>
         <td>${newRecipeMakesInput}</td>
         <td><button id="edit-recipe-list" class="add-to-table" onclick="editRecipeItem()">Edit</button></td>
         <td><button id="delete-recipe-list" class="add-to-table" onclick="deleteRecipeItem()">Delete</button></td>
   `)
   $("#recipeImage").val('');
    $("#recipeType").val('');
    $("#recipeLink").val('');
    $("#recipeMakes").val('');
}

function showList(Name) {
    addingToList = Name
    $('#recipe-list-title').html(`${Name} Recipe List`)
    $('.recipe-table-body').empty()
    $('.done-recipe-table-body').empty()
    $.get("/recipeList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === Name && data[i].complete === false) {
                $('.recipe-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" value="complete"><br></td>
                        <td><img class="recipe-pic" src="${data[i].recipeImage}"></td>
                        <td>${data[i].recipeName}</td>
                        <td><a href="${data[i].recipeLink}">Recipe</a></td>
                        <td>${data[i].recipeMakes}</td>
                        <td><button id="edit-recipe-list" class="add-to-table" onclick="editRecipeItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-recipe-list" class="add-to-table" onclick="deleteRecipeItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
            } else {
                if (data[i].whichList === Name) {
                    $('.done-recipe-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" value="complete"><br></td>
                        <td><img class="recipe-pic" src="${data[i].recipeImage}"></td>
                        <td>${data[i].recipeName}</td>
                        <td><a href="${data[i].recipeLink}">Recipe</a></td>
                        <td>${data[i].recipeMakes}</td>
                        <td><button id="edit-recipe-list" class="add-to-table" onclick="editRecipeItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-recipe-list" class="add-to-table" onclick="deleteRecipeItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
                }
            }
        }
    })
    $('#show-recipe-details').css('display', 'block')
 }

 function addToRecipeList() {
    event.preventDefault()
    let listName = $('#add-to-recipe-list').val()
    $('#add-recipe-list').append (`
       <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
    `)
    $('#add-to-recipe-list').val('')
}

function showCompleted() {
    $('#show-recipe-done').css('display', 'block')
    $('#show-recipe').css('display', 'none')
    $('#hide-recipe').css('display', 'block')
}

function hideCompleted() {
    $('#show-recipe-done').css('display', 'none')
    $('#show-recipe').css('display', 'block')
    $('#hide-recipe').css('display', 'none')
}

function deleteRecipeItem(id) {
    event.stopPropagation();
    fetch(`/recipeList/${id}`, {
        method: 'DELETE'
    }).then(r=> {
        showList(addingToList)
    })
}





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