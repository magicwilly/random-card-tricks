let DATA = [];

async function loadData() {
  const res = await fetch("tricks.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Cannot load tricks.json");
  DATA = await res.json();
}

function tidyPdfText(raw) {
  if (!raw) return "";
  // Normalize Windows/Mac newlines
  let s = raw.replace(/\r\n?/g, "\n");
  // Collapse 3+ newlines to 2 (max)
  s = s.replace(/\n{3,}/g, "\n\n");
  // For each paragraph block, replace single newlines with spaces
  const paras = s.split(/\n\n/).map(block =>
    block.replace(/\n+/g, " ").replace(/\s{2,}/g, " ").trim()
  ).filter(Boolean);
  return paras;
}

function renderTrick(t) {
  document.getElementById("title").textContent = t.title || "Untitled Trick";

  const meta =
    t.page_start && t.page_end
      ? (t.page_start === t.page_end ? `p. ${t.page_start}` : `pp. ${t.page_start}–${t.page_end}`)
      : "";
  document.getElementById("meta").textContent = meta;

  const container = document.getElementById("text");
  container.innerHTML = "";
  const paras = tidyPdfText(t.text);
  for (const p of paras) {
    const el = document.createElement("p");
    el.textContent = p;
    container.appendChild(el);
  }
}

function showRandomTrick() {
  if (!DATA.length) return;
  const t = DATA[Math.floor(Math.random() * DATA.length)];
  renderTrick(t);
}

async function boot() {
  try {
    await loadData();
    showRandomTrick(); // show one on load
    document.getElementById("new-trick").addEventListener("click", showRandomTrick);
  } catch (e) {
    document.getElementById("text").innerHTML =
      '<span style="color:#b00;">Error loading tricks.json. Ensure it is next to index.html.</span>';
  }
}

boot();
