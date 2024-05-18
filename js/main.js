window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
  loadHome();
});

function loadHome() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      let content = '<h1 class="mb-4">Users</h1><div class="row">';
      users.forEach((user) => {
        content += `
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text"><strong>Username:</strong> ${user.username}</p>
                <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                <p class="card-text"><strong>Phone:</strong> ${user.phone}</p>
                <p class="card-text"><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
                <p class="card-text"><strong>Address:</strong><br>
                  ${user.address.suite}, ${user.address.street}<br>
                  ${user.address.city}, ${user.address.zipcode}
                </p>
                <p class="card-text"><strong>Company:</strong> ${user.company.name}</p>
              </div>
            </div>
          </div>
        `;
      });
      content += "</div>";
      document.getElementById("content").innerHTML = content;
    });
}

function loadGallery() {
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((photos) => {
      let uniqueAlbumIds = new Set(photos.map((photo) => photo.albumId));
      let uniqueAlbumIdsArray = Array.from(uniqueAlbumIds);

      let content = '<h1 class="mb-4">Gallery</h1><div class="row">';
      uniqueAlbumIdsArray.forEach((albumNum) => {
        // Limiting to 12 photos
        content += `
          <div class="col-md-4">
            <div class="card mb-4">  
              <img src="./images/logo-ccs-512.jpeg" class="card-img-top" alt="mali" />
              <div class="card-body text-center">
                <h5 class="card-title">Album ${albumNum}</h5>
                <a href="#" class="btn btn-primary" onclick="loadAlbum(${albumNum})">View Album</a>
              </div>
            </div>
          </div>
        `;
      });
      content += "</div>";
      document.getElementById("content").innerHTML = content;
    });
}

function loadAlbum($num) {
  fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${$num}`)
    .then((response) => response.json())
    .then((photos) => {
      let content = '<h1 class="mb-4">Gallery</h1><div class="row">';
      photos.forEach((photo) => {
        // Limiting to 12 photos
        content += `
        <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
          <img src="${photo.thumbnailUrl}" class="card-img-top" alt="${photo.title}">
          <div class="card-body">
            <h5 class="card-title">${photo.title}</h5>
            <a href="${photo.url}" target="_blank" class="btn btn-primary">View Full Image</a>
          </div>
        </div>
      </div>
    `;
      });
      content += "</div>";
      document.getElementById("content").innerHTML = content;
    });
}

function loadAbout() {
  document.getElementById("content").innerHTML = `
  <div class="card mb-4 shadow-sm">
  <div class="row">
  <div class="col-md-6">
    <img src="./images/about.png" class="img-fluid rounded-circle mb-3" alt="Your Name">
  </div>
  <div class="col-md-6 mt-4">
    <h1>About Me</h1>
    <p>Hello, I'm Jemuel Salcedo. I'm an IT student of LSPU.</p>
    <p>Email: 0321-3087@lspu.edu.ph</p>
    <p>Year Level: 3rd Year</p>
    <p>Section: 3WMAD2</p>
  </div>
</div>
</div>
  `;
}
