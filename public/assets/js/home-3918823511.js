function editProfile(){document.getElementById("update-form").classList.remove("d-none")}function cancelEdit(){document.getElementById("update-form").classList.add("d-none")}function preview_image(e){var t=new FileReader;t.onload=function(){$(".preview").removeClass("d-none"),$("#output_image")[0].src=t.result},t.readAsDataURL(e.target.files[0])}function removeImage(e){e.preventDefault(),$("#set-avatar").val(""),$("#output_image")[0].src="",$(".preview").addClass("d-none")}