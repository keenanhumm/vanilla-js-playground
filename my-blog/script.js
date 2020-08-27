// dom
const postsContainer = document.querySelector(".posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

// init
let limit = 4;
let page = 1;

renderPosts();

// helpers
async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();

  return data;
}

async function renderPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

function fetchMorePosts() {
  loading.classList.add("show");
  page++;
  renderPosts().then(() => loading.classList.remove("show"));
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    fetchMorePosts();
  }
}

function filterPosts(e) {
  const term = e.target.value;
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText;
    const body = post.querySelector(".post-body").innerText;

    if (
      title.toLowerCase().includes(term.toLowerCase()) ||
      body.toLowerCase().includes(term.toLowerCase())
    ) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// events
window.addEventListener("scroll", handleScroll);
filter.addEventListener("input", filterPosts);
