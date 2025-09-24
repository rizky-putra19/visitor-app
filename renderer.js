document.addEventListener("DOMContentLoaded", () => {
    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const user = await window.electronAPI.login({ username, password });

            if (user) {
                window.location.href = "dashboard.html";
            } else {
                document.getElementById("loginMsg").innerText = "Login gagal!";
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
});
