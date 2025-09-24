(() => {
const video = document.getElementById("camera");
const canvas = document.getElementById("snapshot");
const takePhotoBtn = document.getElementById("takePhoto");
const form = document.getElementById("checkinForm");
let photoData = null;

// 🔹 Aktifkan kamera
if (video) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("Tidak bisa akses kamera:", err);
      alert("Kamera tidak tersedia, silakan periksa device.");
    });
}

// 🔹 Ambil foto
if (takePhotoBtn) {
  takePhotoBtn.addEventListener("click", () => {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    photoData = canvas.toDataURL("image/png");
    alert("Foto berhasil diambil!");
  });
}

// 🔹 Submit Check-In
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const nik = document.getElementById("nik").value;

    if (!photoData) {
      alert("Harap ambil foto terlebih dahulu!");
      return;
    }

    const visitor = { name, nik, photo: photoData };

    try {
      const result = await window.electronAPI.checkinVisitor(visitor);
      if (result) {
        alert("✅ Check-In Berhasil!");
        form.reset();
        photoData = null;
      } else {
        alert("❌ Gagal Check-In.");
      }
    } catch (err) {
      console.error("Check-In Error:", err);
      alert("❌ Terjadi kesalahan saat Check-In.");
    }
  });
}
})();
