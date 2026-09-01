for (const disclosure of document.querySelectorAll("details.site-menu")) {
  const summary = disclosure.querySelector("summary");
  const synchronizeState = () => {
    summary.setAttribute("aria-expanded", String(disclosure.open));
  };

  disclosure.addEventListener("toggle", synchronizeState);
  for (const link of disclosure.querySelectorAll('a[href^="#"]')) {
    link.addEventListener("click", () => {
      disclosure.open = false;
      synchronizeState();
    });
  }

  synchronizeState();
}
