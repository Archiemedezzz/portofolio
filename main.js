// Fungsi untuk toggle tab skills/tools
function toggleTab(tab) {
  document.getElementById("skills").classList.toggle("hidden", tab !== "skills");
  document.getElementById("tools").classList.toggle("hidden", tab !== "tools");
  document.getElementById("btn-skills").classList.toggle("active", tab === "skills");
  document.getElementById("btn-tools").classList.toggle("active", tab === "tools");
}

// Fungsi untuk toggle portfolio webdev/graphic
function togglePortfolio(type) {
  document.getElementById("webdev-portfolio").classList.toggle("hidden", type !== "webdev");
  document.getElementById("graphic-portfolio").classList.toggle("hidden", type !== "graphic");
  document.getElementById("btn-webdev").classList.toggle("active", type === "webdev");
  document.getElementById("btn-graphic").classList.toggle("active", type === "graphic");
}

// Fungsi untuk setup modal gambar
function setupImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("expandedImage");
  const closeBtn = document.querySelector(".close-modal");

  document.querySelectorAll(".experience-image").forEach((img) => {
    img.addEventListener("click", function() {
      modal.classList.add("active");
      modalImg.src = this.src;
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", function() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Fungsi untuk setup progress bars
function setupProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fill-bar").forEach(bar => {
    bar.style.width = "0%";
    observer.observe(bar);
  });
}

// Fungsi untuk toggle tema
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark");
  localStorage.setItem("darkMode", isDark);
  updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
  // Desktop
  document.getElementById("light-icon")?.classList.toggle("hidden", isDark);
  document.getElementById("dark-icon")?.classList.toggle("hidden", !isDark);
  
  // Mobile
  document.getElementById("light-icon-mobile")?.classList.toggle("hidden", isDark);
  document.getElementById("dark-icon-mobile")?.classList.toggle("hidden", !isDark);
}

function checkInitialTheme() {
  const savedTheme = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme ? savedTheme === "true" : prefersDark;

  if (isDark) {
    document.documentElement.classList.add("dark");
  }
  
  updateThemeIcons(isDark);
}

// Inisialisasi semua fungsi saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
  // Setup komponen
  setupImageModal();
  setupProgressBars();
  
  // Event listener untuk tab
  document.getElementById("btn-skills")?.addEventListener("click", () => toggleTab("skills"));
  document.getElementById("btn-tools")?.addEventListener("click", () => toggleTab("tools"));
  
  // Event listener untuk portfolio
  document.getElementById("btn-webdev")?.addEventListener("click", () => togglePortfolio("webdev"));
  document.getElementById("btn-graphic")?.addEventListener("click", () => togglePortfolio("graphic"));
  
  // Dark mode
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
  document.getElementById("theme-toggle-mobile")?.addEventListener("click", toggleTheme);
  
  // Cek tema awal
  checkInitialTheme();
  
  // Refresh AOS setelah semua konten dimuat
  window.addEventListener('load', function() {
    AOS.refresh();
  });
});