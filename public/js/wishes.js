let wishLists = []
let addingToList

function displayLists() {
   $.get("/wishList", function (data) {
      for (let i=0; i< data.length; i++) {
         if (wishLists.includes(data[i].whichList) === false) {
            wishLists.push(data[i].whichList)
         }
      }
      wishLists.forEach(function(item) {
         $('#add-wish-list').append (`
            <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
         `)
      });
   });
} 

function addWishItem() {
  event.preventDefault()
  var newItemNameInput = $("#wishItem").val();
  var newItemLocationInput = $("#wishStore").val();
  var newItemPriceInput = $("#wishCost").val();
  var newItemOptionsInput = $("#wishOptions").val();
  var wish = {
      whichList: addingToList,
      itemName: newItemNameInput,
      itemLocation: newItemLocationInput,
      itemPrice: newItemPriceInput,
      itemOptions: newItemOptionsInput,
      complete: false
  }
  $.post("/wishList", wish);
  $('#wish-table tr:last').before(`
     <tr>
        <td><input type="checkbox" name="bought" value="false"><br></td>
        <td>${newItemNameInput}</td>
        <td>${newItemLocationInput}</td>
        <td>$${newItemPriceInput}</td>
        <td>${newItemOptionsInput}</td>
        <td><button id="edit-wish-list" class="add-to-table" onclick="editWishNewItem(${newItemNameInput})">Edit</button></td>
        <td><button id="delete-wish-list" class="add-to-table" onclick="deleteWishNewItem(${newItemNameInput})">Delete</button></td>
     </tr>
  `)
  $('#wishItem').val('')
  $('#wishStore').val('')
  $('#wishCost').val('')
  $('#wishOptions').val('')
}

function showList(Name) {
   addingToList = Name
   $('#wish-list-title').html(`${Name}'s WishGift List`)
   $('.wish-table-body').empty()
   $('.done-wish-table-body').empty()
   $.get("/wishList", function (data) {
      for (let i=0; i<data.length; i++) {
         if (data[i].whichList === Name && data[i].complete === false) {
            $('.wish-table-body').append(`
               <tr>
                  <td><input type="checkbox" name="bought" value="false"><br></td>
                  <td>${data[i].itemName}</td>
                  <td>${data[i].itemLocation}</td>
                  <td>$${data[i].itemPrice}</td>
                  <td>${data[i].itemOptions}</td>
                  <td><button id="edit-wish-list" class="add-to-table" onclick="editWishItem(${data[i].id})">Edit</button></td>
                  <td><button id="delete-wish-list" class="add-to-table" onclick="deleteWishItem(${data[i].id})">Delete</button></td>
               </tr>
            `)
         } else {
            if (data[i].whichList === Name) {
                  $('.done-wish-table-body').append(`
                     <tr>
                        <td><input type="checkbox" name="bought" value="false"><br></td>
                        <td>${data[i].itemName}</td>
                        <td>${data[i].itemLocation}</td>
                        <td>$${data[i].itemPrice}</td>
                        <td>${data[i].itemOptions}</td>
                        <td><button id="edit-wish-list" class="add-to-table" onclick="editWishItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-wish-list" class="add-to-table" onclick="deleteWishItem(${data[i].id})">Delete</button></td>
                     </tr>
                  `)
               }
         }
      }
   })
   $('#show-wish-details').css('display', 'block')
}

function addToWishList() {
   event.preventDefault()
   let listName = $('#add-to-wish-list').val()
   $('#add-wish-list').append (`
      <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
   `)
   $('#add-to-wish-list').val('')
}

function showCompleted() {
   $('#show-wish-done').css('display', 'block')
   $('#show-wish').css('display', 'none')
   $('#hide-wish').css('display', 'block')
}

function hideCompleted() {
   $('#show-wish-done').css('display', 'none')
   $('#show-wish').css('display', 'block')
   $('#hide-wish').css('display', 'none')
}

function deleteWishItem(id) {
   event.stopPropagation();
   fetch(`/wishList/${id}`, {
       method: 'DELETE'
   }).then(r=> {
       showList(addingToList)
   })
}

// function deleteWishNewItem(name) {
//    event.stopPropagation();
//    console.log('ping')
//    let id
//    $.get("/wishList", function (data) {
//       for (let i=0; i<data.length; i++) {
//          if (data[i].itemName === name) {
//             id = data[i].id
//          }
//       }
//    })
//    console.log(id)
//    fetch(`/wishList/${id}`, {
//        method: 'DELETE'
//    }).then(r=> {
//        showList(addingToList)
//    })
// }




   //        // variable to link list results to html
   //        var $todoContainer = $(".todo-container");

   //        // event listeners for deleting, editing, and adding todos
   //        $(document).on("click", "button.delete", deleteTodo);
   //        $(document).on("click", "button.complete", toggleComplete);
   //        $(document).on("submit", "#todo-form", insertTodo);

   //        // initial list todos array
   //        var todos = [];

   //        // grabs todo list from database when page loads
   //        getTodos();

   //        // resets the todo list displayed with new todos from the database
   //        function initializeRows() {
   //             $todoContainer.empty();
   //             var rowsToAdd = [];
   //             for (var i = 0; i < todos.length; i++) {
   //                  rowsToAdd.push(createNewRow(todos[i]));
   //             }
   //             $todoContainer.prepend(rowsToAdd);
   //        }

   //        // grabs todo list from the database and updates the view
   //        function getTodos() {
   //             $.get("/wishList", function (data) {
   //                  todos = data;
   //                  initializeRows();
   //             });
   //        }

   //        // deletes a todo from the list when the user clicks the delete button
   //        function deleteTodo(event) {
   //             event.stopPropagation();
   //             var id = $(this).data("id");
   //             $.ajax({
   //                  method: "DELETE",
   //                  url: "/wishList/" + id
   //             }).then(getTodos);
   //        }

   //        // toggles strike-through to indicate completed status
   //        function toggleComplete(event) {
   //             event.stopPropagation();
   //             var todo = $(this).parent().data("todo");
   //             todo.complete = !todo.complete;
   //             updateTodo(todo);
   //        }

   //        // updates a todo list item in the database
   //        function updateTodo(todo) {
   //             $.ajax({
   //                  method: "PUT",
   //                  url: "/wishList",
   //                  data: todo
   //             }).then(getTodos);
   //        }


   //        // inserts a new todo item into our database and then updates the view
   //        function insertTodo(event) {
   //             event.preventDefault();
   //             var todo = {
   //                  itemName: $newItemNameInput.val().trim(),
   //                  itemLocation: $newItemLocationInput.val().trim(),
   //                  itemPrice: $newItemPriceInput.val().trim(),
   //                  itemOptions: $newItemOptionsInput.val().trim(),
   //                  complete: false
   //             };
   //             $.post("/wishList", todo, getTodos);
   //             $newitemNameInput.val("");
   //             $newitemLocationInput.val("");
   //             $newitemPriceInput.val("");
   //             $newitemOptionsInput.val("");
   //        }
   //   });     