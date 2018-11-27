let giftLists = []
let addingToList 

function displayLists() {
    $.get("/giftsList", function (data) {
        for (let i=0; i< data.length; i++) {
            if (giftLists.includes(data[i].whichList) === false) {
                giftLists.push(data[i].whichList)
            }
        }
    giftLists.forEach(function(item) {
        $('#add-gift-list').append (`
            <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
        `)
        });
    });
}

function addGiftItem() {
    event.preventDefault()
    let newGiftNameInput = $("#giftName").val().trim()
    let newGiftBudgetInput = $("#giftBudget").val().trim()
    var gift = {
        whichList: addingToList,
        giftName: newGiftNameInput,
        giftBudget: newGiftBudgetInput,                          
        complete: false
   };
   $.post("/giftsList", gift);  
   $('#gift-table tr:last').before(`
      <tr>
         <td><input class="checkbox" type="checkbox" name="bought" value="false"><br></td>
         <td>${newGiftNameInput}</td>
         <td>$${newGiftBudgetInput}</td>
         <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem()">Edit</button></td>
         <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem()">Delete</button></td>
      </tr>
   `)
   $("#giftName").val('')
   $("#giftBudget").val('')
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
                        <td><input class="checkbox" type="checkbox" name="bought" value="complete"><br></td>
                        <td>${data[i].giftName}</td>
                        <td>$${data[i].giftBudget}</td>
                        <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
            } else {
                if (data[i].whichList === Name) {
                    $('.done-gift-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" value="complete"><br></td>
                        <td>${data[i].giftName}</td>
                        <td>${data[i].giftBought}</td>
                        <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
                }
            }
        }
    })
    $('#show-gift-details').css('display', 'block')
 }

 function addToGiftList() {
    event.preventDefault()
    let listName = $('#add-to-gift-list').val()
    $('#add-gift-list').append (`
       <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
    `)
    $('#add-to-gift-list').val('')
}

function showCompleted() {
    $('#show-gift-done').css('display', 'block')
    $('#show-gift').css('display', 'none')
    $('#hide-gift').css('display', 'block')
}

function hideCompleted() {
    $('#show-gift-done').css('display', 'none')
    $('#show-gift').css('display', 'block')
    $('#hide-gift').css('display', 'none')
}

function deleteGiftItem(id) {
    event.stopPropagation();
    fetch(`/giftsList/${id}`, {
        method: 'DELETE'
    }).then(r=> {
        showList()
    })
}




// // deletes a todo from the list when the user clicks the delete button
// function deleteGiftItem(event) {
//     event.stopPropagation();
//     var id = $(this).data("id");
//     $.ajax({
//          method: "DELETE",
//          url: "/giftsList/" + id
//     }).then();
// // 




// // // variable to link list results to html
// // var $todoContainer = $(".todo-container");

// // event listeners for deleting, editing, and adding todos
// // $(document).on("click", "button.delete", deleteTodo);
// $(document).on("click", "button.complete", toggleComplete);

// initial list todos array
// var todos = [];

// grabs todo list from database when page loads
// getTodos();







// // toggles strike-through to indicate completed status
// function toggleComplete(event) {
//      event.stopPropagation();
//      var todo = $(this).parent().data("todo");
//      todo.complete = !todo.complete;
//      updateTodo(todo);
// }

// // updates a todo list item in the database
// function updateTodo(todo) {
//      $.ajax({
//           method: "PUT",
//           url: "/giftsList",
//           data: todo
//      }).then(getTodos);
// }