'use strict';

// element toggle function
const elementToggleFunc = function (elem) {
  // Add a check to ensure elem is not null before trying to access classList
  if (elem) {
    elem.classList.toggle("active");
  }
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
// Add null check for sidebarBtn as well, though it's usually present
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  // Ensure modalContainer and overlay exist before toggling class
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

// Add click event to all modal items only if they exist
if (testimonialsItem.length > 0 && modalContainer && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      // Add checks for querySelector results within the item
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }
      if (title) {
        modalTitle.innerHTML = title.innerHTML;
      }
      if (text) {
        modalText.innerHTML = text.innerHTML;
      }
      testimonialsModalFunc();
    });
  }
}

// Add click event to modal close button and overlay only if they exist
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // HTML has data-selecct-value (double c)
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) { // Check if select element exists
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValueText = this.innerText;
      let selectedValue = selectedValueText.toLowerCase();
      if (selectValue) {
        selectValue.innerText = selectedValueText;
      }
      elementToggleFunc(select); // 'select' is 'this' from the outer scope, already checked
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
if (filterBtn.length > 0) { // Check if filter buttons exist
  let lastClickedBtn = filterBtn[0]; // Assuming at least one button if length > 0

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValueText = this.innerText;
      let selectedValue = selectedValueText.toLowerCase();
      if (selectValue) { // selectValue might be null if 'data-select' was not found
        selectValue.innerText = selectedValueText;
      }
      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field only if form exists
if (form && formInputs.length > 0 && formBtn) { // Check if form and its components exist
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// --- MODIFIED Page Navigation Logic ---
if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      const clickedLink = this; // The button that was clicked
      const targetPageName = clickedLink.innerHTML.toLowerCase().trim(); // Or textContent

      // 1. Remove 'active' class from ALL navigation links
      navigationLinks.forEach(navLink => {
        navLink.classList.remove("active");
      });

      // 2. Remove 'active' class from ALL pages
      pages.forEach(page => {
        page.classList.remove("active");
      });

      // 3. Add 'active' class to the CLICKED navigation link
      clickedLink.classList.add("active");

      // 4. Add 'active' class to the CORRESPONDING page
      let pageFound = false;
      pages.forEach(page => {
        if (page.dataset.page === targetPageName) {
          page.classList.add("active");
          pageFound = true;
        }
      });

      if (!pageFound) {
          console.warn(`Debug: Page with data-page="${targetPageName}" not found.`);
      }

      window.scrollTo(0, 0); // Optional: scroll to top of page
    });
  });
} else {
    if (navigationLinks.length === 0) console.warn("Debug: No navigation links found with [data-nav-link]. Page navigation will not work.");
    if (pages.length === 0) console.warn("Debug: No pages found with [data-page]. Page navigation will not work.");
}