// write your code here
document.addEventListener("DOMContentLoaded", function () {
    const ramenMenu = document.getElementById("ramen-menu");
    const ramenDetail = document.getElementById("ramen-detail");
    const ratingDisplay = document.getElementById("rating-display");
    const commentDisplay = document.getElementById("comment-display");
  
    function displayRamenDetails(ramen) {
      ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
      `;
      ratingDisplay.textContent = ramen.rating.toFixed(1);
      commentDisplay.textContent = ramen.comment || "No comment available";
    }
  
    fetch("http://localhost:3000/ramens")
      .then((response) => response.json())
      .then((ramens) => {
        ramens.forEach((ramen) => {
          const img = document.createElement("img");
          img.src = ramen.image;
          img.addEventListener("click", () => displayRamenDetails(ramen));
          ramenMenu.appendChild(img);
        });
  
        if (ramens.length > 0) {
          displayRamenDetails(ramens[0]);
        }
      });
  
    const newRamenForm = document.getElementById("new-ramen");
  
    newRamenForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("new-name").value;
      const restaurant = document.getElementById("new-restaurant").value;
      const image = document.getElementById("new-image").value;
      const rating = parseFloat(document.getElementById("new-rating").value);
      const comment = document.getElementById("new-comment").value;
  
      const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment,
      };
  
      fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRamen),
      })
        .then((response) => response.json())
        .then((ramen) => {
          const img = document.createElement("img");
          img.src = ramen.image;
          img.addEventListener("click", () => displayRamenDetails(ramen));
          ramenMenu.appendChild(img);
          displayRamenDetails(ramen);
        });
  
      newRamenForm.reset();
    });
  
    const editRamenForm = document.getElementById("edit-ramen");
  
    editRamenForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const newRating = parseFloat(document.getElementById("new-rating").value);
      const newComment = document.getElementById("new-comment").value;
  
      ratingDisplay.textContent = newRating.toFixed(1);
      commentDisplay.textContent = newComment || "No comment available";
  
      editRamenForm.reset();
    });
    const deleteButton = document.getElementById("delete-ramen");
  
    deleteButton.addEventListener("click", function () {
    });
  });
  
