function addEvent() {
    $('.modal8').css('display', 'block')
}

function addEventToList() {
    let activity = $("#event-name").val().trim()
    let date = $("#event-date").val().trim()
    let time = $("#event-time").val().trim()
    let location = $("#event-location").val().trim()
    let instructions = $("#event-instructions").val().trim()
    var event = {
        eventName: activity,
        eventDate: date,
        eventTime: time,
        eventLocation: location,
        eventInstructions: instructions,                  
        complete: false
    };
    $.post("/eventList", event)
    .then(r => {
        $("#event-name").val('')
        $("#event-date").val('')
        $("#event-time").val('')
        $("#event-location").val('')
        $("#event-instructions").val('')
    })
    $('.modal8').css('display', 'none')
    showEvents()
}

function showEvents() {
    $('#card-div').empty()
    $.get("/eventList", function (data) {
        for (let i=0; i<data.length; i++) {
            let date = data[i].eventDate
            date = moment(date).format('dddd MMM Do')
            let time = data[i].eventTime
        time = moment(time, moment.HTML5_FMT.TIME).format('h:mm a')
            $('#card-div').append(`
                    <div class='column'>
                        <div class="flip-card card">
                            <div class="flip-card-inner">
                                <div class="flip-card-inner-front">
                                    <span>${date}</span>
                                </div>
                                <div class="flip-card-inner-back">
                                    <h3 class="flip-card-inner-back-title">${data[i].eventName}</h3>
                                    <p class="flip-card-inner-back-text">Date: ${date}</p>
                                    <p class="flip-card-inner-back-text">Time: ${time}</p>
                                    <p class="flip-card-inner-back-text">Location: ${data[i].eventLocation}</p>
                                    <p class="flip-card-inner-back-text">Instructions: ${data[i].eventInstructions}</p>
                                    <div class="event-buttons">
                                        <button class="event-btn button" onclick="editEvent(${data[i].id})">Edit</button>
                                        <button class="event-btn button" onclick="deleteEvent(${data[i].id})">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            `)
        }
    })
}

function editEvent(id) {
    $.get("/eventList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === id) {
                $('#modal9-id').val(id)
                $("#event-name").val(data[i].whichList) 
                $("#event-date").val(data[i].whichList)                
                $("#event-time").val(data[i].eventName)               
                $("#event-location").val(data[i].eventBudget)
                $("#event-instructions").val(data[i].eventBought)
            }
        }
    }).then(r => {
    $('.modal9').css('display', 'block')
    })
}

function deleteEvent(id) {
    fetch(`/eventList/${id}`, {
        method: 'DELETE'
    }).then(r=> {
        showEvents()
    })
}

function updateItem() {

}