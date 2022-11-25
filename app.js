import { EasyHTTP } from "./http.js";
import { ui } from "./ui.js";

let http = new EasyHTTP();

// GET posts
document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

// SUBMIT posts
document.querySelector(".post-submit").addEventListener("click", submitPosts);

function submitPosts(e) {
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const id = document.getElementById("id").value;

  const data = {
    title: title,
    body: body,
  };

  if (title != "" && body != "") {
    if (id === "") {
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => {
          getPosts(), ui.removeFields();
          ui.showAlert("the post added", "alert alert-success");
        })
        .catch((err) => console.log(err));
    } else {
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(() => {
          getPosts(),
            ui.showAlert("the post is updated", "alert alert-success");
        })
        .catch((err) => console.log(err));
    }
  } else {
    ui.showAlert("please check the input values", "alert alert-danger");
  }

  e.preventDefault();
}

// delete event
document.querySelector("#posts").addEventListener("click", deletePost);

function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    console.log("delete post");

    const id = e.target.parentElement.dataset.id;
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then((data) => {
        getPosts();
      })
      .catch((error) => console.log(error));

    ui.showAlert("deleted", "alert alert-success");
  } else {
  }
  e.preventDefault();
}

// EDIT event
document.querySelector("#posts").addEventListener("click", editPost);

function editPost(e) {
  if (e.target.classList.contains("edit")) {
    const id = e.target.dataset.id;
    const title =
      e.target.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }

  e.preventDefault();
}
// cancel event
document.querySelector(".postsContainer").addEventListener("click", cancelEdit);

function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }

  e.preventDefault();
}
