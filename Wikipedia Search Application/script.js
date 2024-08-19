let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults"); 
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {

    let { title, link, description } = result;

    // 1. Creating result item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    // 2. Anchor Title --result-title
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);

    // 3. Title Break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // 4. Anchor URL --result-url
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);

    // 5. Line Break
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // 6. Paragraph Description --result-description
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description + ".";
    descriptionEl.classList.add("line-description");
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWekipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value.trim();
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonData) {
            let { search_results } = jsonData;
            // console.log(search_results);
            displayResults(search_results);
        });
    }
}

searchInputEl.addEventListener("keydown", searchWekipedia);