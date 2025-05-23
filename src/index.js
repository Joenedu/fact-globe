// import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const displayCountryDataBtn = document.querySelector(
    "#displayCountryDataBtn"
  );
  displayCountryDataBtn.addEventListener("click", () => {
    const countryDataDiv = document.querySelector("#countryDataDiv");
    const countryStatsHeading = document.createElement("h2");
    countryStatsHeading.style.textAlign = "center";

    if (countryDataDiv.childElementCount !== 0) {
      countryDataDiv.innerHTML = "";
      countryStatsHeading.textContent = "";
    }

    const countryName = document.querySelector("#countryInput").value;

    const containerDiv = document.querySelector(".container");
    if (countryName.length === 0) {
      const countryNameErrorSpan = document.querySelector(
        "#countryNameErrorSpan"
      );
      countryNameErrorSpan.style.color = "red";
      countryNameErrorSpan.style.fontSize = "0.8rem";
      countryNameErrorSpan.style.paddingLeft = "5px";
      countryNameErrorSpan.style.fontFamily = "sans-serif";
      countryNameErrorSpan.innerHTML =
        "<strong>*Country Name Field is Required*</strong>";
      return;
    }

    if (countryName.length !== 0) {
      countryNameErrorSpan.innerHTML = "";
    }

    async function getCountryData(countryName) {
      countryName.toLowerCase();
      try {
        const loadingState = document.createElement("p");
        loadingState.innerHTML = "<strong>Loading...</strong>";
        loadingState.style.padding = "12px";
        loadingState.style.textAlign = "center";

        countryDataDiv.insertAdjacentElement("beforebegin", loadingState);
        const apiResult = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );

        const countryData = await apiResult.json();
        loadingState.style.display = "none";

        loadingState.style.fontWeight = "800";

        countryDataDiv.insertAdjacentElement("afterbegin", countryStatsHeading);

        countryStatsHeading.textContent = `${
          countryName.slice(0, 1).toUpperCase() +
          countryName.slice(1).toLowerCase()
        } Facts`;
        countryStatsHeading.style.backgroundColor = "rgb(200,56,78)";
        countryStatsHeading.style.padding = "8px";
        countryStatsHeading.style.color = "#fff";

        for (let country of countryData) {
          const coatOfArmsImg = document.createElement("img");
          const flagImg = document.createElement("img");
          flagImg.setAttribute("src", country.flags.png);
          coatOfArmsImg.setAttribute("src", country.coatOfArms.png);

          const countryDetails = document.createElement("div");
          countryDetails.style.backgroundColor = "#fff";
          countryDetails.style.border = "1px solid grey";
          countryDetails.style.boxShadow = "2px 2px 3px lightgrey";
          countryDetails.style.padding = "10px";

          countryDetails.innerHTML = `<p><strong>Capital:</strong> ${
            country.capital
          }</p> <p><strong>Official Name:</strong> ${
            country.name.official
          }</p><p><strong>Currencies:</strong> ${
            typeof country.currencies !== "object"
              ? country.currencies
              : JSON.stringify(country.currencies)
          }</p>
              <p><strong>Population:</strong> ${
                country.population
              }</p><p><strong>Region:</strong> ${
            country.region
          }</p><p><strong>Subregion:</strong> ${
            country.subregion
          }</p><p><strong>Languages:</strong> ${
            typeof country.languages !== "object"
              ? country.languages
              : JSON.stringify(country.languages)
          }</p><p><strong>Borders:</strong> ${
            country.borders
          }</p><p><strong>Area:</strong> ${
            country.area
          }</p><p>Location on <a href=${
            country.maps.googleMaps
          } loading='lazy' style="border: 0" >Google Map</a></p><p><strong>Timezones:</strong> ${
            country.timezones
          }<p><strong>Continents:</strong> ${country.continents}`;

          countryDetails.insertAdjacentElement("afterbegin", coatOfArmsImg);
          countryDetails.insertBefore(flagImg, coatOfArmsImg.nextSibling);
          countryDataDiv.appendChild(countryDetails);
          countryDataDiv.style.textAlign = "center";
        }
      } catch (error) {
        countryStatsHeading.innerHTML = `${
          countryName.slice(0, 1).toUpperCase() +
          countryName.slice(1).toLowerCase()
        } Not Found.`;
      } //
    }
    getCountryData(countryName);
  });
});
