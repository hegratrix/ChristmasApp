 function addToGiftList() {
     event.preventDefault()
     let listName = $('#add-to-gift-list').val()
     $('#add-gift-list').append (`
        <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
     `)
     $('#add-to-gift-list').val('')
 }

 function showList(Name) {
    $('#gift-list-title').html(`${Name} Gift List`)
 } 

function addGiftItem() {
   event.preventDefault()
   let name = $('#giftName').val()
   let budget = $('#giftBudget').val()
   $('#gift-table tr:last').before(`
      <tr>
         <td><input type="checkbox" name="bought" value="false"><br></td>
         <td>${name}</td>
         <td>${budget}</td>
         <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem()">Edit</button></td>
         <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem()">Delete</button></td>
      </tr>
   `)
   $('#giftName').val('')
   $('#giftBudget').val('')
}