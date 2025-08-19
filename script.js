// script.js — uses tricks.json generated from the PDF

let DATA = [];

// Load the JSON once
async function loadData() {
  const res = await fetch("tricks.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Cannot load tricks.json");
  DATA = await res.json();
}

// Pick and render a random trick
function showRandomTrick() {
  if (!DATA.length) return;
  const t = DATA[Math.floor(Math.random() * DATA.length)];

  const pages =
    t.page_start === t.page_end || !t.page_end
      ? `p. ${t.page_start ?? "?"}`
      : `pp. ${t.page_start}–${t.page_end}`;

  const box = document.getElementById("trick-container");
  box.innerHTML = ""; // clear

  const h2 = document.createElement("h2");
  h2.textContent = t.title || "Untitled Trick";

  const meta = document.createElement("div");
  meta.style.color = "#666";
  meta.style.fontSize = "0.9rem";
  meta.textContent = pages;

  const pre = document.createElement("pre");
  pre.style.whiteSpace = "pre-wrap";
  pre.style.marginTop = "0.6rem";
  pre.textContent = t.text || "";

  box.appendChild(h2);
  box.appendChild(meta);
  box.appendChild(pre);
}

async function boot() {
  try {
    await loadData();
  } catch (e) {
    document.getElementById("trick-container").innerHTML =
      `<p style="color:#b00;">Error loading tricks.json. Make sure it sits next to index.html.</p>`;
    return;
  }

  // Show one immediately if checkbox is on
  const chk = document.getElementById("show-on-load");
  if (chk && chk.checked) showRandomTrick();

  // Button wiring
  document.getElementById("new-trick").addEventListener("click", showRandomTrick);
}

// Run
boot();
