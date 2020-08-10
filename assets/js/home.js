function editProfile() {
  var updateform = document.getElementById('update-form').classList.remove('d-none')
}

function cancelEdit() {
  var updateform = document.getElementById('update-form').classList.add('d-none')
}




function preview_image(event) {
  var reader = new FileReader();
  reader.onload = function () {
    $('.preview').removeClass('d-none')
    $('#output_image')[0].src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

function removeImage(event) {
  event.preventDefault()
  $('#set-avatar').val('')
  $('#output_image')[0].src = ''
  $('.preview').addClass('d-none')
}


$(document).ready(function () {
  let str = $('.login .user-name a')[0].text
  $('.login .user-name a')[0].text = str.substr(0, str.indexOf(' ', str.indexOf(' ') + 1))

  let userNames = $('.post-content .user-name')
  for (user of userNames) {
    let str2 = $(user)[0].textContent
    $(user)[0].textContent = str2.split(' ')[0]
  }

  let chattext = $('#chat-message-list p')
  for (chat of chattext) {
    $(chat)[0].textContent = $(chat)[0].textContent.trim()
    // console.log($(chat)[0].textContent.trim())
  }

  let dates = $('.created')
  for(created of dates){
    let createdDate = $(created)[0].textContent
    $(created)[0].textContent = createdDate.substr(0, createdDate.indexOf(' ', createdDate.indexOf(' ', createdDate.indexOf(' ') + 1) + 1))
  }

  console.log(dates)
  // $('#chat-message-list p').trim()



})






