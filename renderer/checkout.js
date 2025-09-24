(() => {
const form = document.getElementById("checkoutSearchForm");
const resultDiv = document.getElementById("checkoutResult");

// ketika submit cari nama
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("searchName").value;

  const visitor = await window.electronAPI.searchVisitor(name);

  if (!visitor) {
    resultDiv.innerHTML = `<p style="color:red;">❌ Data tidak ditemukan</p>`;
    return;
  }

  // tampilkan data + foto + tombol checkout
  resultDiv.innerHTML = `
    <h3>Data Ditemukan:</h3>
    <p><b>Nama:</b> ${visitor.name}</p>
    <p><b>NIK:</b> ${visitor.nik}</p>
    <img src="${visitor.photo}" width="200" />
    <br/><br/>
    <button id="checkoutBtn">✅ Check-Out</button>
  `;

  // attach event ke tombol checkout
  document.getElementById("checkoutBtn").addEventListener("click", async () => {
    const res = await window.electronAPI.checkoutVisitor(visitor.id);

    if (res) {
      resultDiv.innerHTML = `
        <p style="color:green;">✔️ Checkout berhasil untuk ${visitor.name}</p>
        <p>Waktu Checkout: ${res.checkout_time}</p>
      `;
    }
  });
});
})();
