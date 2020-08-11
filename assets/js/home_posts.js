//method to submit form data for new post using ajax
let createPost = function () {
  let newPostForm = $("#new-post-form");
  newPostForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/posts/create",
      //serialize converts the data received into json like (key: value )
      data: newPostForm.serialize(),
      success: function (data) {
        // if(data.flash.success && data.flash.success.length>0){

        //   }
        let newPost = newPostDom(data.data.post);
        $("#posts-list-container>ul").prepend(newPost);
        deletePost($(" .delete-post-button", newPost));
        // toggleLikes(" .toggle-like-button", newPost);
        new Noty({
          theme: "relax",
          text: "Post published!",
          type: "success",
          loyout: "topRight",
          timeout: 1500,
        }).show();
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
    $(this).trigger('reset')
  });
};

//method to create a post in DOM
let newPostDom = function (post) {
  return $(`
<li class="post" id="post-${post._id}">
  <a href="/posts/delete/${post._id}" class="delete-post-button"><i class="fa fa-close"></i></a>
  <div class="post-content">
    <div class="d-flex align-items-center text-center mr-3 mb-4">
      <img class="profile-pic mr-2" src=${post.user.avatar} />
      <div class="d-flex flex-column align-items-start">
        <small class="user-name">${post.user.name}</small>
        <small class="created">${post.createdAt}</small>
      </div>

    </div>
    <div>
      <p>${post.content}</p>
    </div>
  </div>
  <div class="post-comment">
    <div class="d-flex align-items-center">
      <div class="p-3">
        <a
          class="toggle-like-button"
          data-likes="0"
          href="/likes/toggle/?id=${post._id}&type=Post"
        >
          0 Likes
        </a>
      </div>
    </div>
    <form action="/comments/create" id="post-${post._id}-comments-form"  method="POST">
      <input type="text" class="write-comment" name="content" placeholder="Write a comment..." required/>
      <input name="post" value="${post._id}" type="hidden"/>
      <input type="submit" value="Comment" class="submit-comment"/>
    </form>
  </div>
  <div class="comments-list">
    <ul id="post-comments-${post._id}">
     
    </ul>
  </div>
</li>
  `);
};

//method to delete a post from DOM
let deletePost = function (deleteLink) {
  $(deleteLink).click(function (e) {
    e.preventDefault();
    $.ajax({
      type: "get",
      url: $(deleteLink).prop("href"),
      success: function (data) {
        $(`#post-${data.data.post_id}`).remove();
        new Noty({
          theme: "relax",
          text: "Post deleted!",
          type: "success",
          loyout: "topRight",
          timeout: 1500,
        }).show();
      },
      error: function (err) {
        console.log(err.responseText);
      },
    });
  });
};

// function toggleLikes(toggleBtn) {
//   $(toggleBtn).click(function (e) {
//     e.preventDefault();
//     $.ajax({
//       type: "GET",
//       url: $(toggleBtn).attr("href"),
//     })
//       .done(function (data) {
//         let likesCount = parseInt($(toggleBtn).attr("data-likes"));
//         console.log(likesCount);
//         if (data.data.deleted == true) {
//           likesCount -= 1;
//         } else {
//           likesCount += 1;
//         }

//         $(toggleBtn).attr("data-likes", likesCount);
//         $(toggleBtn).html(`${likesCount} Likes`);
//       })
//       .fail(function (errData) {
//         console.log("error in completing the request", errData);
//       });
//   });
// }

// $(".toggle-like-button").click(toggleLikes(this));

createPost();
