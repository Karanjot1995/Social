let createPost=function(){let e=$("#new-post-form");e.submit(function(t){t.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:e.serialize(),success:function(e){let t=newPostDom(e.data.post);$("#posts-list-container>ul").prepend(t),deletePost($(" .delete-post-button",t)),new Noty({theme:"relax",text:"Post published!",type:"success",loyout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})},newPostDom=function(e){return $(`\n  <li  class="post" id="post-${e._id}">\n\n  <a href="/posts/delete/${e._id}" class="delete-post-button"><i class="fa fa-close"></i></a>\n\n\n  <div class="post-content">\n    <img class="profile-pic" src="/images/user.png" />\n    <div>\n      <p>${e.content}</p>\n      <small><${e.user.name}</small>\n    </div>\n  </div>\n  <div class="post-comment">\n    <div class="d-flex align-items-center">\n      <div class="p-3">\n        <a\n          class="toggle-like-button"\n          data-likes="0"\n          href="/likes/toggle/?id=${e._id}&type=Post"\n        >\n          0 Likes\n        </a>\n      </div>\n    </div>\n    <form action="/comments/create" id="post-${e._id}-comments-form"  method="POST">\n      <input type="text" class="write-comment" name="content" placeholder="Write a comment..." required/>\n      <input name="post" value="${e._id}" type="hidden"/>\n      <input type="submit" value="Comment" class="submit-comment"/>\n    </form>\n  </div>\n  <div class="comments-list">\n    <ul id="post-comments-${e._id}">\n     \n    </ul>\n  </div>\n</li>\n  `)},deletePost=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#post-${e.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post deleted!",type:"success",loyout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})})};createPost();