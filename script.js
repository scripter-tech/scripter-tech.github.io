const apiKey = "AIzaSyCHMxecKhNbzdYjdMM4CJFOfgxWH7ODBww"; // Replace this with your actual API key
const container = document.getElementById("video-container");

function searchVideos(query = "Punjabi Haryanvi Songs 2024") {
  const input = document.getElementById("search-input");
  const searchQuery = input.value || query;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      data.items.forEach(item => {
        const { videoId } = item.id;
        const { title, thumbnails } = item.snippet;

        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
            <img src="${thumbnails.medium.url}" alt="${title}" />
            <p>${title}</p>
          </a>
        `;
        container.appendChild(videoCard);
      });
    })
    .catch(err => {
      console.error("Error loading videos:", err);
      container.innerHTML = "<p>Failed to load videos. Check your API key or network restrictions.</p>";
    });
}

// Load default videos on page load
window.onload = () => searchVideos();
