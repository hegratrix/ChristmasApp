
let startingList = ''

function startList(list) {
    startingList = list
    console.log(startingList)
    window.scrollTo(0,0)
    $('.modal').css('display', 'block')
}

function signIn() {
    $('.modal').css('display', 'none')
    location.replace(`./${startingList}.html`)
}

function newGiftList() {
    $('.modal2').css('display', 'block')
}
function newWishList() {
    $('.modal3').css('display', 'block')
}
function newCardList() {
    $('.modal4').css('display', 'block')
}
function newGroceryList() {
    $('.modal7').css('display', 'block')
}

function addPersonGiftList() {
    event.preventDefault()
    let name = $('#giftRecepient').val()
    let budget = $('#giftRecepientBudget').val()
    $('#giftTable').append(`
        <tr>
            <td><input type="checkbox" name="bought" value="true"><br></td>
            <td>${name}</td>
            <td>$${budget}</td>
            <td><input type="checkbox" name="edit" value="true"><br></td>
            <td><input type="checkbox" name="delete" value="true"><br></td>
        </tr>
    `)
    $('#giftRecepient').val('')
    $('#giftRecepientBudget').val('')
}

function addWishListItem() {
    event.preventDefault()
    let item = $('#wishItem').val()
    let store = $('#wishStore').val()
    let price= $('#wishPrice').val()
    let option= $('#wishOption').val()
    $('#wishTable').append(`
    <tr>
        <td><input type="checkbox" name="bought" value="false"><br></td>
        <td>${item}</td>
        <td>${store}</td>
        <td>$${price}</td>
        <td>${option}</td>
        <td><input type="checkbox" name="edit" value="true"><br></td>
        <td><input type="checkbox" name="delete" value="true"><br></td>
    </tr>
    `)
    $('#wishItem').val('')
    $('#wishStore').val('')
    $('#wishPrice').val('')
    $('#wishOption').val('')
}

function addNewRecepient() {
    event.preventDefault()
    let name = $('#card-name').val()
    $('#cardTable').append(`
    <tr>
        <td><input type="checkbox" name="bought" value="false"><br></td>
        <td>${name}</td>
        <td><input type="checkbox" name="edit" value="true"><br></td>
        <td><input type="checkbox" name="delete" value="true"><br></td>
    </tr>
    `)
    $('.modal5').css('display', 'none')
}
function addToGroceryList() {
    event.preventDefault()
    let amount = $('#grocery-amount').val()
    let item = $('#grocery-item').val()
    $('#groceryTable').append(`
    <tr>
        <td><input type="checkbox" name="bought" value="false"><br></td>
        <td>${amount}</td>
        <td>${item}</td>
        <td><input type="checkbox" name="edit" value="true"><br></td>
        <td><input type="checkbox" name="delete" value="true"><br></td>
    </tr>
    `)
    $('.modal7').css('display', 'none')
}
function addActivityItem() {
    event.preventDefault()
    let date = $('#activity-date').val()
    date = moment(date).format('Do, ddd')    
    let time = $('#activity-time').val()
    time = moment(time, moment.HTML5_FMT.TIME).format('h:mm a')
    let name = $('#activity-name').val()
    let location = $('#activity-location').val()
    let instructions = $('#activity-instructions').val()
    $('#activityTable').append(`
    <tr>
        <td>${date}</td>
        <td>${time}</td>
        <td>${name}</td>
        <td>${location}</td>
        <td>${instructions}</td>
        <td><input type="checkbox" name="edit" value="true"><br></td>
        <td><input type="checkbox" name="delete" value="true"><br></td>
    </tr>
    `)
    $('#activity-date').val('')   
    $('#activity-time').val('')
    $('#activity-name').val('')
    $('#activity-location').val('')
    $('#activity-instructions').val('')
}

function addGiftList(){
    event.preventDefault()
    let title = $('#gift-title').val()
    $('.modal2').css('display', 'none')
    $('#listDiv').append(`<h2>${title}</h2>`)
}
function addWishList(){
    event.preventDefault()
    let title = $('#wish-title').val()
    $('.modal3').css('display', 'none')
    $('#listDivWish').append(`<h2>${title}</h2>`)
}
function addCardList(){
    event.preventDefault()
    let title = $('#card-title').val()
    $('.modal4').css('display', 'none')
    $('#listDivCard').append(`<h2>${title}</h2>`)
}
function addGroceryList(){
    event.preventDefault()
    let title = $('#grocery-title').val()
    $('.modal7').css('display', 'none')
    $('#listGroceryDiv').append(`<h2>${title}</h2>`)
}

function addCardRecepient(){
    $('.modal5').css('display', 'block')
}

function showAddresses() {
    $('.modal6').css('display', 'block')
}

function closeAddresses() {
    $('.modal6').css('display', 'none')
}

