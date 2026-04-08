let latestJSON = null;

async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const output = document.getElementById("output");

  if (!file) {
    output.innerText = "Select a file";
    return;
  }

  // Show CSV preview
  renderCSVPreview(file);

  const formData = new FormData();
  formData.append("file", file);

  try {
    output.innerText = "Processing...";

    const res = await fetch("http://127.0.0.1:8000/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    latestJSON = data;

    // Render insights
    renderInsights(data.data);

    // Show JSON
    output.innerText = JSON.stringify(data, null, 2);

  } catch (err) {
    console.error(err);
    output.innerText = "❌ Failed to fetch";
  }
}

function renderCSVPreview(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    const rows = text.split("\n").slice(0, 10);

    let html = "<table>";

    rows.forEach((row, i) => {
      const cols = row.split(",");
      html += "<tr>";

      cols.forEach(col => {
        html += i === 0 ? `<th>${col}</th>` : `<td>${col}</td>`;
      });

      html += "</tr>";
    });

    html += "</table>";

    document.getElementById("csvTable").innerHTML = html;
  };

  reader.readAsText(file);
}

function renderInsights(data) {
  let html = "<table>";

  html += `<tr><th>Metric</th><th>Value</th></tr>`;
  html += `<tr><td>Rows</td><td>${data.shape.rows}</td></tr>`;
  html += `<tr><td>Columns</td><td>${data.shape.columns}</td></tr>`;
  html += `<tr><td>Column Names</td><td>${data.columns.join(", ")}</td></tr>`;

  html += "</table>";

  document.getElementById("insightsTable").innerHTML = html;
}

function copyJSON() {
  if (!latestJSON) return;

  navigator.clipboard.writeText(JSON.stringify(latestJSON, null, 2));
  alert("Copied to clipboard!");
}