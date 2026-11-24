document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".auth-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const passwordRepeat = document.getElementById("password-repeat").value;

        // Client-side validation example
        if (password !== passwordRepeat) {
            alert("Adgangskoderne er ikke ens");
            return;
        }

        try {
            const response = await fetch("/api/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    username,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || "Kunne ikke oprette bruger");
            }

            alert("Bruger oprettet!");
            console.log(data);

            // Optional redirect
            window.location.href = "/login.html";

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    });
});