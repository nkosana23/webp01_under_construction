// Track submission cooldown to prevent rapid resubmissions
let canSubmit = true;

// Open/close the popup form when Notify button is clicked
document.querySelector(".notify-btn").addEventListener("click", () => {
    const form = document.getElementById("emailForm");
    form.classList.toggle("open");
});

// Initialize EmailJS with your public key (must match EmailJS dashboard)
emailjs.init("YdEYNPcN8rUMHejfc");

// Listen for form submission
document.getElementById("emailForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page refresh

    // Throttle check — limit to one submission per 5 seconds
    if (!canSubmit) {
        alert("Please wait before resubmitting.");
    return;
    }

    canSubmit = false;
    setTimeout(() => { canSubmit = true; }, 5000); // Reset cooldown

    // Collect and trim form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const submissionTimeInput = document.getElementById("submissionTime");
    const statusMessage = document.getElementById("statusMessage");

    // Update timestamp field with current local time
    submissionTimeInput.value = new Date().toLocaleString('en-ZA', {
        timeZone: 'Africa/Johannesburg',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Validate full name
    const namePattern = /^[a-zA-Z]/;
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

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Incorrect email.");
        return;
    }

    // Save user's name in localStorage for future convenience
    localStorage.setItem("name", fullName);

    // Show feedback inline (not just alerts)
    statusMessage.textContent = "Thanks, " + fullName + "! We'll notify you at " + email + ".";
    statusMessage.style.opacity = "1";
    setTimeout(() => statusMessage.textContent = "", 5000);

    // Set optional tooltip on timestamp display element
    const timestamp = submissionTimeInput.value;
    document.getElementById("submissionDisplay").title = 'Submitted: ${timestamp}';

    // Disable button while sending
    const sendButton = document.querySelector("#emailForm button[type='submit']");
    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    // Send form data using EmailJS
    emailjs.sendForm("service_mdd7yja", "template_5azh0tt", this)
    .then(() => {
        document.getElementById("emailForm").classList.remove("open");
        this.reset(); // Clear form inputs
    }, (error) => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again later.");
    })
    .finally(() => {
        sendButton.disabled = false;
        sendButton.textContent = "Notify Me";
    });
});