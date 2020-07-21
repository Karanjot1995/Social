//method to submit form data for new post using ajax
let createPost = function(){
  let newPostForm = $('#new-post-form')
  newPostForm.submit(function(e){
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/posts/create',
      //serialize converts the data received into json like (key: value )
      data: newPostForm.serialize(),
      success: function(data){
        // if(data.flash.success && data.flash.success.length>0){
          
        //   } 
        let newPost = newPostDom(data.data.post)
        $('#posts-list-container>ul').prepend(newPost)
        deletePost($(' .delete-post-button',newPost))
        new Noty({
          theme: 'relax',
          text: 'Post published!',
          type: 'success',
          loyout: 'topRight',
          timeout: 1500
        }).show()
      },
      error : function(error){
        console.log(error.responseText)
      }
    })

  })

}




//method to create a post in DOM
let newPostDom = function(post){
  return $(`
  <li  class="post" id="post-${post._id}">

  <a href="/posts/delete?id=${post._id}" class="delete-post-button"><i class="fa fa-close"></i></a>


  <div class="post-content">
    <img class="profile-pic" src="/images/user.png" />
    <div>
      <p>${post.content}</p>
      <small><${post.user.name}</small>
    </div>
    

  </div>
  <div class="post-comment">
    <h3>Comment</h3>
    <form action="/comments/create" id="new-comment-form"  method="POST">
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
  `)
}




//method to delete a post from DOM
let deletePost = function(deleteLink){
  $(deleteLink).click(function(e){
    e.preventDefault()
    $.ajax({
      type: 'get',
      url: $(deleteLink).prop('href'),
      success: function(data){
        $(`#post-${data.data.post_id}`).remove()
        new Noty({
          theme: 'relax',
          text: 'Post deleted!',
          type: 'success',
          loyout: 'topRight',
          timeout: 1500
        }).show()
      },
      error: function(err){
        console.log(err.responseText)
      }
    })
  })
}



createPost()


