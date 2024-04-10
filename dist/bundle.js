(() => {
  const e = document.createElement("h1");
  (e.textContent = "Hello There!"),
    e.classList.add("blur-back"),
    document.body.appendChild(e);
})();
