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


$(document).ready(function(){
  let str = $('.login .user-name a')[0].text
  $('.login .user-name a')[0].text = str.substr( 0, str.indexOf( ' ', str.indexOf( ' ' ) + 1 ) )
  
})





