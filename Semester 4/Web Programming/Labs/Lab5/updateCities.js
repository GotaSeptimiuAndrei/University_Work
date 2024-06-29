const citiesByCounty = {
    "Mures": ["Targu Mures", "Sighisoara"],
    "Cluj": ["Cluj-Napoca", "Turda"],
    "Timis": ["Timisoara", "Lugoj"]
};

function updateCities() {
    const countySelect = document.getElementById("county");
    const citySelect = document.getElementById("city");
    const selectedCounty = countySelect.value;

    citySelect.innerHTML = '<option value="">Select City</option>';

    if (selectedCounty !== "") {
        const cities = citiesByCounty[selectedCounty];
        cities.forEach(city => {
            const option = document.createElement("option");
            option.text = city;
            option.value = city;
            citySelect.add(option);
        });
    }
}