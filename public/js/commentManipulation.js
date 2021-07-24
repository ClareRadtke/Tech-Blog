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

// Future State TODO: Update/Edit a comment

// Future State TODO: Delete a comment

const createComment = document.querySelector("#comment-btn");

createComment.addEventListener("click", createCommentHandler);
