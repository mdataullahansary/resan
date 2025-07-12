const fileInput = document.getElementById('file-input');
    const output = document.getElementById('output');

    import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.min.mjs";

// Set the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.269/pdf.worker.min.mjs';

    fileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function () {
          const typedarray = new Uint8Array(reader.result);

          pdfjsLib.getDocument(typedarray).promise.then(async pdf => {
            if (pdf.numPages !== 1) {
              output.textContent = `❌ The uploaded PDF has ${pdf.numPages} pages. Please upload a single-page PDF.`;
              return;
            }

            const page = await pdf.getPage(1);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            output.textContent = `✅ Single-page PDF detected.\n\n--- Page 1 Text ---\n${pageText || "No text found."}`;
          }).catch(err => {
            output.textContent = "Error reading PDF: " + err.message;
          });
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert("Please upload a valid PDF file.");
      }
    });