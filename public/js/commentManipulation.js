// Add a comment
const createCommentHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment").value;
  const postId = document.querySelector("#post-id").value;

  if (content) {
    const response = await fetch(`/api/posts/${postId}/comments/`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/posts/${postId}`);
    } else {
      alert("Comment failed");
    }
  }
};

// // Update a comment
// const updateCommentHandler = async (event) => {
//   event.preventDefault();

//   const title = document.querySelector("#post-title").value;
//   const content = document.querySelector("#new-post").value;
//   const postId = document.querySelector("#post-id").value;

//   if (title && content) {
//     const response = await fetch(`/api/posts/${postId}`, {
//       method: "PATCH",
//       body: JSON.stringify({ title, content }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert("Post update failed");
//     }
//   }
// };

// // Delete a comment
// const deleteCommentHandler = async (event) => {
//   event.preventDefault();
//   const postId = document.querySelector("#post-id").value;

//   const response = await fetch(`/api/posts/${postId}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.ok) {
//     document.location.replace("/dashboard");
//   } else {
//     alert("Deleting of post failed");
//   }
// };

const createComment = document.querySelector("#comment-btn");
// const updateComment = document.querySelector("#");
// const deleteComment = document.querySelector("#");

createComment.addEventListener("click", createCommentHandler);

// if (createComment != null) {
// }
// if (updateComment != null) {
//   updateComment.addEventListener("click", updateCommentHandler);
// }
// if (deleteComment != null) {
//   deleteComment.addEventListener("click", deleteCommentHandler);
// }
