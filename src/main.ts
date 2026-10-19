import "./main.css";
import WebGL from "./webgl";

const root = document.documentElement;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

const params = new URLSearchParams(window.location.search);
const smallScreen = window.matchMedia("(max-width: 768px)").matches;
const forceFull = params.has("full");
if (forceFull) sessionStorage.removeItem("skipIntro");
const lite =
  params.has("lite") ||
  sessionStorage.getItem("skipIntro") === "1" ||
  !hasWebGL() ||
  (smallScreen && !forceFull);

function goLite() {
  root.classList.add("lite");
  const loading = document.getElementById("loading");
  if (loading) loading.style.display = "none";
}

function skipIntro() {
  sessionStorage.setItem("skipIntro", "1");
  goLite();
  document.getElementById("aboutMe")?.scrollIntoView();
}

document.getElementById("skip-intro")?.addEventListener("click", skipIntro);
document.getElementById("skip-link")?.addEventListener("click", (e) => {
  e.preventDefault();
  skipIntro();
});

if (lite) goLite();
else WebGL();

function onScroll() {
  if (window.scrollY > 10) root.dataset.scroll = "true";
  else root.dataset.scroll = "false";
}
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
