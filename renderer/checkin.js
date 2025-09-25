(async () => {
  const video = document.getElementById("camera");
  const canvas = document.getElementById("snapshot");
  const takePhotoBtn = document.getElementById("takePhoto");
  const form = document.getElementById("checkinForm");
  const cameraSelect = document.getElementById("cameraSelect");

  let photoData = null;
  let currentStream = null;

  // 🔹 Fungsi untuk start kamera
  async function startCamera(deviceId) {
    if (currentStream) {
      // Stop stream lama sebelum ganti
      currentStream.getTracks().forEach(track => track.stop());
    }

    try {
      const constraints = deviceId ? { video: { deviceId: { exact: deviceId } } } : { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      currentStream = stream;
      video.srcObject = stream;
      video.play();
    } catch (err) {
      console.error("Tidak bisa akses kamera:", err);
      alert("Kamera tidak tersedia.");
    }
  }

  // 🔹 Ambil daftar kamera dan isi ke dropdown
  async function initCameraList() {
    await navigator.mediaDevices.getUserMedia({ video: true }); // minta izin dulu
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(d => d.kind === "videoinput");

    cameraSelect.innerHTML = "";
    videoDevices.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.text = device.label || `Camera ${index + 1}`;
      cameraSelect.appendChild(option);
    });

    if (videoDevices.length > 0) {
      startCamera(videoDevices[0].deviceId);
    }
  }

  // 🔹 Event listener kalau user ganti kamera
  cameraSelect.addEventListener("change", (e) => {
    startCamera(e.target.value);
  });

  // 🔹 Ambil foto
  if (takePhotoBtn) {
    takePhotoBtn.addEventListener("click", () => {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      photoData = canvas.toDataURL("image/png");
      alert("Foto berhasil diambil!");
    });
  }

  // 🔹 Submit form
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

  // 🔹 Jalankan pertama kali
  initCameraList();
})();
