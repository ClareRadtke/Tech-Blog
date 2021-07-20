//add a post
const createPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#new-post").value;

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Post failed");
    }
  }
};

//update a post
const updatePostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#new-post").value;
  const postId = document.querySelector("#post-id").value;

  if (title && content) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Post update failed");
    }
  }
};

// Delete post
const deletePostHandler = async (event) => {
  event.preventDefault();
  const postId = document.querySelector("#post-id").value;

  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Deleting of post failed");
  }
};

const createPost = document.querySelector("#create-post");
const updatePost = document.querySelector("#update");
const deletePost = document.querySelector("#delete");

if (createPost != null) {
  createPost.addEventListener("click", createPostHandler);
}
if (updatePost != null) {
  updatePost.addEventListener("click", updatePostHandler);
}
if (deletePost != null) {
  deletePost.addEventListener("click", deletePostHandler);
}
