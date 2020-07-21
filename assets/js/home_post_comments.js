// function createComment(){
//   let newCommentForm = $(`#post-comments-form`);
//   newCommentForm.submit(function(e){
//       e.preventDefault();

//       $.ajax({
//           type: 'post',
//           url: '/comments/create',
//           data: newCommentForm.serialize(),
//           success: function(data){
//               let newComment = newCommentDom(data.data.comment);
//               $(`#post-comments`).prepend(newComment);
//               // deleteComment($(' .delete-comment-button', newComment));

//               new Noty({
//                   theme: 'relax',
//                   text: "Comment published!",
//                   type: 'success',
//                   layout: 'topRight',
//                   timeout: 1500
                  
//               }).show();

//           }, error: function(error){
//               console.log(error.responseText);
//           }
//       });


//   });
// }


// function newCommentDom(comment){
//   // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
//   return $(`<li id="comment-${ comment._id }">
//               <img class="profile-pic" src="<%= comment.user.avatar %>"/>
                        
//               <div>
//                 <p>${comment.content}</p>
//                 <small>
//                     ${comment.user.name}
//                 </small>
//               </div>
//               <a class="delete-comment-button" href="/comments/delete?id=${comment._id}"><i class="fa fa-close"></i></a>
//           </li>`);

// }


// createComment()