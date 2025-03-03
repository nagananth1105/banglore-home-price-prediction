// Function to get selected BHK value
function getBHKValue() {
    let selectedBHK = document.querySelector(".bhk-btn.bg-blue-500");
    return selectedBHK ? parseInt(selectedBHK.getAttribute("value")) : -1;
}

// Function to get selected Bathroom value
function getBathValue() {
    let selectedBath = document.querySelector(".bath-btn.bg-blue-500");
    return selectedBath ? parseInt(selectedBath.getAttribute("value")) : -1;
}

// Function to estimate the home price
function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    let sqft = document.getElementById("uiSqft").value;
    let bhk = getBHKValue();
    let bath = getBathValue();
    let location = document.getElementById("uiLocations").value;
    let estPrice = document.getElementById("uiEstimatedPrice");

    // Validate Inputs
    if (!sqft || bhk === -1 || bath === -1 || !location) {
        estPrice.innerHTML = `<p class="text-red-400">⚠️ Please fill all fields correctly!</p>`;
        return;
    }

    let url = "http://127.0.0.1:5000/predict_home_price"; // Ensure this endpoint is live

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            total_sqft: parseFloat(sqft),
            bhk: bhk,
            bath: bath,
            location: location
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response Data:", data);
        if (data.estimated_price) {
            estPrice.innerHTML = `<p class="text-green-400 text-2xl">💰 Estimated Price: ₹ ${data.estimated_price} Lakhs</p>`;
        } else {
            throw new Error("Invalid response data");
        }
    })
    .catch(error => {
        console.error("Error fetching price:", error);
        estPrice.innerHTML = `<p class="text-red-400">⚠️ Error calculating price. Try again!</p>`;
    });
}

// Function to load locations with a retry mechanism
async function fetchLocations(retries = 3) {
    let url = "http://127.0.0.1:5000/get_location_names";

    try {
        let response = await fetch(url, { cache: "no-store" }); // Prevent caching issues
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        let data = await response.json();
        console.log("Received location data:", data);

        let locationDropdown = document.getElementById("uiLocations");
        locationDropdown.innerHTML = `<option disabled selected>Choose a Location</option>`;

        if (!data.locations || data.locations.length === 0) {
            throw new Error("No locations found in API response.");
        }

        // Populate dropdown
        data.locations.forEach(location => {
            let option = document.createElement("option");
            option.value = location;
            option.textContent = location;
            locationDropdown.appendChild(option);
        });

    } catch (error) {
        console.error(`Error loading locations (Attempt ${4 - retries}):`, error);
        if (retries > 0) {
            setTimeout(() => fetchLocations(retries - 1), 1000); // Retry after 1 second
        } else {
            document.getElementById("uiLocations").innerHTML = `<option disabled>Error loading locations</option>`;
        }
    }
}

// Function to toggle active class on BHK/Bathroom buttons
function setupSelectionButtons() {
    document.querySelectorAll(".bhk-btn, .bath-btn").forEach(button => {
        button.addEventListener("click", function () {
            let group = this.classList.contains("bhk-btn") ? ".bhk-btn" : ".bath-btn";

            // Remove active class from all buttons in the group
            document.querySelectorAll(group).forEach(btn => {
                btn.classList.remove("bg-blue-500", "text-white");
                btn.classList.add("bg-gray-700"); // Reset color
            });

            // Add active class to the selected button
            this.classList.remove("bg-gray-700");
            this.classList.add("bg-blue-500", "text-white");
        });
    });
}

// Initialize the page
window.onload = function () {
    fetchLocations(); // Load locations with retry
    setupSelectionButtons();
};
