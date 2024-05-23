let serverMessage = document.querySelector(".server_message");
let uploadDiv = document.querySelector(".upload_image");
let input = document.querySelector("input");
let queueImage = document.querySelector(".queue_img");
let queueForm = document.querySelector(".queue_form");
let imageArray = [];
let saveImageDiv = document.querySelector(".save_img");
let serverForm = document.querySelector(".save-server");

input.addEventListener("change", () => {
  let fileList = input.files;
  // console.log(fileList);

  for (let file of fileList) {
    if (imageArray.every((image) => image.name !== file.name)) {
      imageArray.push(file);
    }
  }
  clearOldDisplay();
  displayQueueImage();
  // console.log(imageArray);
});

input.addEventListener("drop", (e) => {
  e.preventDefault();
  let fileList = e.dataTransfer.files;
  // console.log(fileList);
  for (let file of fileList) {
    if (!validFileType(file)) continue;

    if (imageArray.every((image) => image.name !== file.name)) {
      imageArray.push(file);
    }
  }
  clearOldDisplay();
  displayQueueImage();
});

let fileType = ["image/png", "image/jpeg"];

// Check if file type is valid for drop
function validFileType(file) {
  return fileType.includes(file.type);
}

// clear the old displayed files
function clearOldDisplay() {
  while (queueImage.firstChild) {
    queueImage.removeChild(queueImage.firstChild);
  }
}
function clearServerDisplay() {
  while (saveImageDiv.firstChild) {
    saveImageDiv.removeChild(saveImageDiv.firstChild);
  }
}

// Display on frontend
function displayQueueImage() {
  let olDiv = document.createElement("ol");
  imageArray.forEach((image, index) => {
    let liDiv = document.createElement("li");
    let spanDiv = document.createElement("span");
    spanDiv.innerHTML = "x";
    spanDiv.addEventListener("click", () => removeImage(index));

    let imgDiv = document.createElement("img");
    imgDiv.src = URL.createObjectURL(image);

    // create li with image and span (close button)
    // liDiv.innerHTML = `<span onclick="removeImage(${index})">&times;</span>`;
    liDiv.appendChild(spanDiv);
    liDiv.appendChild(imgDiv);
    olDiv.appendChild(liDiv);
  });
  queueImage.appendChild(olDiv);
}

// Remove Image span.onClick
function removeImage(index) {
  imageArray.splice(index, 1);
  clearOldDisplay();
  displayQueueImage();
}

// CLICK UPLOAD ON SERVER

queueForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData();
  imageArray.forEach((image, index) => {
    formData.append(`file`, image);
  });

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      // console.log(error);

      return response.text();
      // location.reload();
    })
    .then((data) => {
      serverMessage.innerHTML = "Upload successful!";

      serverMessage.style.color = "red";
      serverMessage.style.backgroundColor = "green";
      // ENSURE TO CONFIRM UPLOAD ALL FILES BEFORE FETCH DATA BACK FROM SERVER
      fetchImageServer();
    })
    .catch((error) => {
      serverMessage.innerHTML = `Error: ${error.message}`;
      serverMessage.style.color = "red";
      serverMessage.style.backgroundColor = "yellow";
    });
  // clear frontend queue
  clearOldDisplay();
  clearServerDisplay();

  // displayServerImage();
  // fetchImageServer();
  // displayServerImage();
});

// Fetch and display existing images on page load

document.addEventListener("DOMContentLoaded", fetchImageServer());

async function fetchImageServer() {
  const response = await fetch("/files");
  if (response.ok) {
    const files = await response.json();
    displayServerImage(files);
  } else {
    console.error("Failed to load images");
  }
}

// move picture from frontend queue to serveimage
function displayServerImage(files) {
  console.log(files);
  let olDiv = document.createElement("ol");

  files.forEach((file) => {
    let liDiv = document.createElement("li");
    let spanDiv = document.createElement("span");
    let imgDiv = document.createElement("img");

    // create image link to each image of the array
    imgDiv.src = `/uploads/${file}`;

    spanDiv.innerHTML = "x";
    spanDiv.addEventListener("click", () => removeServerImage(file));

    liDiv.appendChild(spanDiv);
    liDiv.appendChild(imgDiv);

    olDiv.appendChild(liDiv);
  });

  saveImageDiv.appendChild(olDiv);
}

// REMOVE IMAGE FROM SERVER

function removeServerImage(file) {
  fetch(`/delete/${file}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      location.reload();
    });
  clearServerDisplay();
  fetchImageServer();
}
