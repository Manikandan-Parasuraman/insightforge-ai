async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const output = document.getElementById("output");

  if (!fileInput.files.length) {
    output.innerText = "❌ Please select a file";
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", file);

  try {
    output.innerText = "⏳ Processing...";

    const res = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error("API Error");
    }

    const data = await res.json();

    output.innerText = JSON.stringify(data, null, 2);

  } catch (err) {
    output.innerText = "❌ Error: " + err.message;
  }
}