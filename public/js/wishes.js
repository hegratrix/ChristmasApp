function addToWishList() {
    event.preventDefault()
    let listName = $('#add-to-wish-list').val()
    $('#add-wish-list').append (`
       <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
    `)
    $('#add-to-wish-list').val('')
}

function showList(Name) {
   $('#wish-list-title').html(`${Name}'s Wish List`)
} 

function addWishItem() {
  event.preventDefault()
  let item = $('#wishItem').val()
  let store = $('#wishStore').val()
  let cost = $('#wishCost').val()
  let options = $('#wishOptions').val()
  $('#wish-table tr:last').before(`
     <tr>
        <td><input type="checkbox" name="bought" value="false"><br></td>
        <td>${item}</td>
        <td>${store}</td>
        <td>${cost}</td>
        <td>${options}</td>
        <td><button id="edit-wish-list" class="add-to-table" onclick="editWishItem()">Edit</button></td>
        <td><button id="delete-wish-list" class="add-to-table" onclick="deleteWishItem()">Delete</button></td>
     </tr>
  `)
  $('#wishItem').val('')
  $('#wishStore').val('')
  $('#wishCost').val('')
  $('#wishOptions').val('')
}