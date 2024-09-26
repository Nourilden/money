document.addEventListener("DOMContentLoaded", () => {
    const settingsButton = document.getElementById("settingsButton");
    const settingsPanel = document.getElementById("settingsPanel");
    const closeSettings = document.getElementById("closeSettings");
    const themeSelect = document.getElementById("themeSelect");
    const languageSelect = document.getElementById("languageSelect");
    const addButton = document.getElementById("add");
    const takeButton = document.getElementById("take");
    const moneyDisplay = document.querySelector(".my_money h2");

    // Initialize money value
    let money = 0;

    // Function to update the display
    function updateDisplay() {
        moneyDisplay.textContent = money;
    }

    // Function to get user details
    function getUserDetails(action) {
        let amount = parseInt(prompt(`Enter the amount to ${action}:`), 10);
        let visaNumber = prompt("Enter your Visa Number (16 digits):");
        let phoneNumber = prompt("Enter your Phone Number:");
        let ccv = prompt("Enter your CCV (3 digits):");
        let gender = prompt("Are you a Boy or Girl? (Type 'boy' or 'girl')").toLowerCase();

        // Validate inputs
        if (
            !isNaN(amount) && amount > 0 &&
            (visaNumber) &&
            (phoneNumber) &&
           (ccv) &&
            (gender === "boy" || gender === "girl")
        ) {
            return amount; // Return the valid amount
        } else {
            alert("Invalid input! Please make sure to fill in all fields correctly.");
            return null; // Return null if validation fails
        }
    }

    // Add money button functionality
    addButton.addEventListener("click", () => {
        let amount = getUserDetails("add");
        if (amount !== null) {
            money += amount; // Increase money by the entered amount
            updateDisplay();
        }
    });

    // Take money button functionality
    takeButton.addEventListener("click", () => {
        let amount = getUserDetails("take");
        if (amount !== null) {
            if (money >= amount) {
                money -= amount; // Decrease money by the entered amount, but ensure enough balance
                updateDisplay();
            } else {
                alert("Not enough money to take!");
            }
        }
    });

    // Open and close settings panel
    settingsButton.addEventListener("click", () => {
        settingsPanel.style.display = "block";
    });

    closeSettings.addEventListener("click", () => {
        settingsPanel.style.display = "none";
    });

    // Theme switching
    themeSelect.addEventListener("change", (e) => {
        if (e.target.value === "dark") {
            document.documentElement.style.setProperty("--bg-color", "#333");
            document.documentElement.style.setProperty("--text-color", "#fff");
            document.documentElement.style.setProperty("--primary-color", "#444");
            document.documentElement.style.setProperty("--hover-color", "#555");
            document.documentElement.style.setProperty("--active-color", "#666");
        } else {
            document.documentElement.style.setProperty("--bg-color", "linear-gradient(135deg, #f0f0f0, #d9d9d9)");
            document.documentElement.style.setProperty("--text-color", "#000");
            document.documentElement.style.setProperty("--primary-color", "#007bff");
            document.documentElement.style.setProperty("--hover-color", "#0056b3");
            document.documentElement.style.setProperty("--active-color", "#003d7a");
        }
    });

    // Language switching
    languageSelect.addEventListener("change", (e) => {
        if (e.target.value === "ar") {
            document.documentElement.lang = "ar";
            addButton.textContent = "إضافة";
            takeButton.textContent = "خذ بعض المال";
            settingsButton.textContent = "⚙ الإعدادات";
            settingsPanel.querySelector("h3").textContent = "الإعدادات";
            updateDisplay();
        } else {
            document.documentElement.lang = "en";
            addButton.textContent = "Add";
            takeButton.textContent = "Take Some Money";
            settingsButton.textContent = "⚙ Settings";
            settingsPanel.querySelector("h3").textContent = "Settings";
            updateDisplay();
        }
    });

    // Initial display update
    updateDisplay();
});
