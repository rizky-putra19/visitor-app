(async () => {
    document.getElementById("filterBtn").addEventListener("click", async () => {
        const start = document.getElementById("startDate").value;
        const end = document.getElementById("endDate").value;

        if (!start || !end) {
            alert("Pilih rentang tanggal dulu!");
            return;
        }

        // kirim permintaan ke main process
        const data = await window.electronAPI.visitorList(start, end);

        const tbody = document.getElementById("reportTableBody");
        tbody.innerHTML = "";

        if (!data || data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5">Tidak ada data</td></tr>`;
            return;
        }

        data.forEach(visitor => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
      <td>${visitor.name}</td>
      <td>${visitor.nik || "-"}</td>
      <td><img src="${visitor.photo}" alt="Foto"></td>
      <td>${visitor.checkin_time || "-"}</td>
      <td>${visitor.checkout_time || "-"}</td>
    `;
            tbody.appendChild(tr);
        });
    });
})();
