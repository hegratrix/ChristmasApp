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
    $.post("/giftsList", gift)
    .then(r => {
        $("#giftName").val('')
        $("#giftBudget").val('')
        showList(addingToList)
    })
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
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
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
                            <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
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
        showList(addingToList)
    })
}

function changeStatus(idStatus) {
    let isComplete 
    $.get("/giftsList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === idStatus) {
                isComplete = data[i].complete
            }
        }
    })
    .then(r => {
        if (isComplete === true) {
            fetch(`/giftsList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: false })
            }).then(r=> {
            showList(addingToList)
            })
        } else {
            fetch(`/giftsList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: true })
            }).then(r=> {
                openModal(idStatus)
            })
        }
   })
}

function openModal(id) {
    $('.modal').css('display', 'block')
    $('#id-number').val(id)
}

function addGiftToTable() {
    let gift = $('#gift-title').val()
    let id = $('#id-number').val()
    fetch(`/giftsList/${id}`, {
        method: "PUT",
        headers: { 'Content-Type' : 'application/json; charset=utf-8'},
        body: JSON.stringify({ giftBought: gift })
    }).then(r=> {
        $('#gift-title').val('')
        $('#id-number').val('')
        $('.modal').css('display', 'none')
        showList(addingToList)
    })
}







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

