// Sections
const navListItems = document.querySelectorAll("nav li:not(:last-of-type)");
const sections = ["features", "faq"];

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (!target) {
    window.location.href = `${location.protocol}//${location.host}/#${id}`;
  } else window.scrollTo({ top: id === "home" ? 0 : target.offsetTop - 100, behavior: "smooth" });
};

navListItems.forEach(item => item.onclick = () => {
  const sectionId = item.id.replace("Link", "");
  if (sections.includes(sectionId)) scrollToSection(sectionId);
  history.pushState(null, "", `#${sectionId}`);
});

window.addEventListener("load", () => {
  const sectionId = location.hash.slice(1);
  if (sections.includes(sectionId)) scrollToSection(sectionId);
});

// Icons
lucide.createIcons();