document.addEventListener("DOMContentLoaded", function () {
    loadSearchHistory();
});

function showSuggestions(value) {
    let suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";
    if (value.length === 0) {
        suggestions.style.display = "none";
        return;
    }

    let chemicalList = ["Water", "Ethanol", "Acetone", "Benzene", "Methanol", "Glucose", "Sulfuric Acid", "Ammonia"];
    let filtered = chemicalList.filter(chem => chem.toLowerCase().includes(value.toLowerCase()));

    if (filtered.length > 0) {
        filtered.forEach(chem => {
            let div = document.createElement("div");
            div.textContent = chem;
            div.onclick = function () {
                document.getElementById("chemName").value = chem;
                suggestions.style.display = "none";
            };
            suggestions.appendChild(div);
        });
        suggestions.style.display = "block";
    } else {
        suggestions.style.display = "none";
    }
}

function searchChemical() {
    let chemName = document.getElementById("chemName").value.trim();
    let resultDiv = document.getElementById("result");

    if (chemName === "") {
        resultDiv.style.display = "none";
        return;
    }

    let details = {
        "Water": "H2O - Essential for life.",
        "Ethanol": "C2H5OH - Used in alcoholic beverages and disinfectants.",
        "Acetone": "C3H6O - Common solvent in laboratories.",
        "Benzene": "C6H6 - Used in chemical synthesis.",
        "Methanol": "CH3OH - Used as fuel and solvent.",
        "Glucose": "C6H12O6 - A simple sugar essential for energy.",
        "Sulfuric Acid": "H2SO4 - Strong acid used in industries.",
        "Ammonia": "NH3 - Used in fertilizers and cleaning agents."
    };

    if (details[chemName]) {
        resultDiv.innerHTML = `<strong>${chemName}</strong>: ${details[chemName]}`;
        resultDiv.style.display = "block";
        saveToHistory(chemName);
    } else {
        resultDiv.innerHTML = "Chemical information not found.";
        resultDiv.style.display = "block";
    }
}

function saveToHistory(chemName) {
    let historyList = document.getElementById("history");
    let searches = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!searches.includes(chemName)) {
        searches.unshift(chemName);
        if (searches.length > 5) searches.pop();
        localStorage.setItem("searchHistory", JSON.stringify(searches));
        loadSearchHistory();
    }
}

function loadSearchHistory() {
    let historyList = document.getElementById("history");
    historyList.innerHTML = "";
    let searches = JSON.parse(localStorage.getItem("searchHistory")) || [];

    searches.forEach(chem => {
        let li = document.createElement("li");
        li.textContent = chem;
        li.onclick = function () {
            document.getElementById("chemName").value = chem;
            searchChemical();
        };
        historyList.appendChild(li);
    });
}
