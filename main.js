const input = document.getElementById("myInput");
const dropdown = document.getElementById("dropdown");

// Fetch Json and convert to array of Job titles
const jobTitlesFetcher = async () => {
  const response = await fetch("jobTitle.json");
  const jobTitles = await response.json();
  const titles = jobTitles.map((title) => title.jobTitle);
  console.log(titles);
  return titles;
};

// Settings for dropdown
inputSettings = {
  startSearch: 3,
  displayCount: 3,
};

// Autcomplete Dropdown
filteredArr = (string, arr) => {
  let filteredArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toUpperCase().indexOf(string.toUpperCase()) > -1) {
      if (filteredArr.length >= inputSettings["displayCount"])
        return filteredArr;
      else filteredArr.push(arr[i]);
    }
  }
  return filteredArr.sort();
};

autocomplete = ({ inp, arr }) => {
  if (inp.length >= inputSettings["startSearch"]) {
    arrFiltered = filteredArr(inp, arr);
    return display(arrFiltered);
  }
};

display = (filteredArr) => {
  for (let i = 0; i < filteredArr.length; i++) {
    if (filteredArr[i] !== undefined) {
      li = document.createElement("li");
      li.innerText = filteredArr[i];
      dropdown.append(li);
    }
  }
};

const removeChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const main = async () => {
  const jobTitles = await jobTitlesFetcher();

  input.addEventListener("input", () => {
    removeChildNodes(dropdown);
    autocomplete({ inp: input.value, arr: jobTitles });
  });
};

main();
