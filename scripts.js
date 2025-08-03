 document.querySelector(".notify-btn").addEventListener("click", () => {
    const form = document.getElementById("emailForm");
    form.classList.toggle("open");
});

emailjs.init("YdEYNPcN8rUMHejfc");

document.getElementById("emailForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const namePattern = /^[a-zA-Z]/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName) {
        alert("Full name cannot be blank.");
        return;
    }

    if (!namePattern.test(fullName)) {
        alert("Invalid name used. It must start with a letter from A to Z.");
        return;
    }

    if (fullName.length < 2) {
        alert("Full name is too short.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Incorrect email.");
        return;
    }

    emailjs.sendForm("service_mdd7yja", "template_5azh0tt", this)
    .then(() => {
        alert(`Thanks, ${fullName}! We'll notify you at ${email}.`);
        document.getElementById("emailForm").classList.remove("open");
        document.getElementById("emailForm").reset();
    }, (error) => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again later.");
    });
});






