class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.id = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.formState = "add";
  }

  showPosts(items) {
    let output = ``;

    items.forEach((item) => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${item.title}</h4>
          <p class="card-text">${item.body}</P>
          <a href="#" class="edit card-link" data-id="${item.id}">
          <i class="fa fa-pencil"></i>
        </a>

        <a href="#" class="delete card-link" data-id="${item.id}">
        <i class="fa fa-remove"></i>
      </a>
        </div>
      </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(msg, className) {
    this.removeFields();
    this.removeAlert();
    // const card = document.querySelectorById(".card card-body card-form");
    const div = document.createElement("div");
    div.className = className;

    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector(".postsContainer");
    const end = document.querySelector("#posts");
    container.insertBefore(div, end);
    //end.classList.add("alert-danger");
    // end.innerText = msg;

    setTimeout(() => this.removeAlert(), 3000);
  }

  removeAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  removeFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  removeInputId() {
    this.id.value = "";
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.id.value = data.id;

    this.changeFormState("edit");
  }

  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.value = "update";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      //cancel button

      const button = document.createElement("div");
      button.className = "post-cancel btn btn-secondary btn-block";
      button.appendChild(document.createTextNode("Cancel IT"));

      const card = document.querySelector(".card-form");
      const end = document.querySelector(".form-end");

      card.insertBefore(button, end);
    } else {
      this.postSubmit.value = "post it";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }

      this.removeInputId();
      this.removeFields();
    }
  }
}

export const ui = new UI();
