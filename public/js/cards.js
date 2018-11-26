function addToCardList() {
    event.preventDefault()
    let listName = $('#add-to-card-list').val()
    console.log(listName)
    $('#add-card-list').append (`
       <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
    `)
    $('#add-to-card-list').val('')
}

function showList(Name) {
   $('#card-list-title').html(`${Name} Card List`)
} 

function addCardItem() {
  event.preventDefault()
  let name = $('#cardName').val()
  $('#card-table tr:last').after(`
     <tr>
        <td><input type="checkbox" name="bought" value="false"><br></td>
        <td>${name}</td>
        <td><button id="show-card-list" class="add-to-table" onclick="showCard()">Show</button></td>
        <td><button id="edit-wish-list" class="add-to-table" onclick="editWishItem()">Edit</button></td>
        <td><button id="delete-wish-list" class="add-to-table" onclick="deleteWishItem()">Delete</button></td>
     </tr>
  `)
  $('#cardName').val('')
  $('#cardAddress').val('')
  $('#cardCity').val('')
  $('#cardState').val('')
  $('#cardZipCode').val('')
}