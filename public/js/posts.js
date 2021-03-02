$(document).ready(function() {
  $(".vote-up").submit(function(e) {
    e.preventDefault()

    const postId = $(this).data("id")
    console.log(`postId from AJAX UPVOTE: ${postId}`)
    $.ajax({
      type: "PUT",
      url: `/posts/${postId}/vote-up`,
      success: function(data) {
        console.log("voted up!")
      },
      error: function(err) {
        console.log(err.messsage)
      }
    })
  })

  $(".vote-down").submit(function(e) {
    e.preventDefault()

    const postId = $(this).data("id")
    console.log(`this from downvote: ${this}`)
    console.log(`PostId from AJAX DOWNVOTE: ${postId}`)
    $.ajax({
      type: "PUT",
      url: `/posts/${postId}/vote-up`,
      success: function(data) {
        console.log("voted down!")
      },
      error: function(err) {
        console.log(err.messsage)
      }
    })
  })
})
