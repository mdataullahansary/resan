document.addEventListener("DOMContentLoaded", function () {
  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("file-input");
  const fileRequirements = document.getElementById("file-requirements");
  const tooltip = document.getElementById("file-requirements-tooltip");

  function showTooltip(e) {
    const rect = fileRequirements.getBoundingClientRect();
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.bottom + 8}px`;
    tooltip.classList.remove("hidden");
  }

  function hideTooltip() {
    tooltip.classList.add("hidden");
  }

  fileRequirements.addEventListener("click", (e) => {
    e.stopPropagation();
    if (tooltip.classList.contains("hidden")) {
      showTooltip(e);
    } else {
      hideTooltip();
    }
  });

  document.addEventListener("click", (e) => {
    if (!tooltip.contains(e.target) && e.target !== fileRequirements) {
      hideTooltip();
    }
  });

  window.addEventListener("scroll", () => {
    if (!tooltip.classList.contains("hidden")) {
      showTooltip();
    }
  });
  const fileDetails = document.getElementById("file-details");
  const fileName = document.getElementById("file-name");
  const fileSize = document.getElementById("file-size");
  const removeFile = document.getElementById("remove-file");
  const analyzeBtn = document.getElementById("analyze-btn");
  const uploadBtn = document.getElementById("upload-btn");
  // Disable analyze button initially
  analyzeBtn.disabled = true;
  // Handle drag events
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
  });
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
  });
  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
  });
  function highlight() {
    dropArea.classList.add("active");
  }
  function unhighlight() {
    dropArea.classList.remove("active");
  }
  // Handle dropped files
  dropArea.addEventListener("drop", handleDrop, false);
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length) {
      handleFiles(files);
    }
  }
  // Handle file selection via input
  dropArea.addEventListener("click", () => {
    fileInput.click();
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
      handleFiles(fileInput.files);
    }
  });
  // Upload button in hero section
  uploadBtn.addEventListener("click", () => {
    // Scroll to upload section
    const uploadSection = document.querySelector(".max-w-5xl");
    uploadSection.scrollIntoView({ behavior: "smooth" });
    // Highlight the drop area
    setTimeout(() => {
      dropArea.classList.add("active");
      setTimeout(() => {
        dropArea.classList.remove("active");
      }, 1000);
    }, 800);
  });
  function handleFiles(files) {
    const file = files[0];
    // Check file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document.");
      return;
    }
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }
    // Display file details
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileDetails.classList.remove("hidden");
    // Enable analyze button
    analyzeBtn.disabled = false;
  }
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  }
  // Remove file
  removeFile.addEventListener("click", () => {
    fileInput.value = "";
    fileDetails.classList.add("hidden");
    analyzeBtn.disabled = true;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze-btn");
  const resultsArea = document.getElementById("results-area");
  const loadingArea = document.getElementById("loading-area");
  analyzeBtn.addEventListener("click", function () {
    // Show loading state
    loadingArea.classList.remove("hidden");
    resultsArea.classList.add("hidden");
    // Simulate analysis (3 seconds)
    setTimeout(() => {
      // Hide loading, show results
      loadingArea.classList.add("hidden");
      resultsArea.classList.remove("hidden");
    }, 3000);
  });
  // Handle "Start Over" button
  const startOverBtn = document.querySelector(
    "#results-area button:first-of-type"
  );
  if (startOverBtn) {
    startOverBtn.addEventListener("click", function () {
      // Reset the form
      document.getElementById("file-input").value = "";
      document.getElementById("file-details").classList.add("hidden");
      resultsArea.classList.add("hidden");
      document.getElementById("analyze-btn").disabled = true;
    });
  }
});
