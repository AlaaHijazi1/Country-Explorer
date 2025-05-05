const search = document.getElementById("search");
const input = document.querySelector(".box-search input");
let div = document.querySelector(".info");

search.addEventListener("click", () => {
  const country = input.value;
  pattern = /^[A-Za-z\s]+$/;
  if (
    country.toLowerCase() === "Israel".toLowerCase() ||
    country.toLowerCase() === "State of Israel".toLowerCase()
  ) {
    alert("Please Enter Correct Country");
  } else if (country.match(pattern)) {
    try {
      async function get() {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const country_Info = data.find(
          (item) =>
            item.name.official.toLowerCase() === country.toLowerCase() ||
            item.name.common.toLowerCase() === country.toLowerCase()
        );
        if (country_Info) {
          div.style.opacity = "1";
          div.innerHTML = `
        <img src="${country_Info.flags.png}" alt="${country_Info.flags.alt}" />
        <p><strong>Official Name : </strong>${country_Info.name.official}</p>
        <p><strong>Common Name : </strong>${country_Info.name.common}</p>
        <p><strong>Capital: </strong>${country_Info.capital[0]}</p>
        <p><strong>Region: </strong>${country_Info.region}</p>
        <p><strong>population: </strong>${country_Info.population}</p>
        `;
        } else {
          div.style.opacity = "1";
          div.textContent = "Country Not Found";
        }
      }
      get();
    } catch {
      alert("Something Wrong!");
    }
  } else {
    alert("Please Enter Correct Country");
  }
  input.value = "";
});

input.addEventListener("input", () => {
  div.style.opacity = "0";
});
