let submitButton = document.querySelector("#submitBtn");
let siteNameInput = document.querySelector("#site-name");
let siteUrlInput = document.querySelector("#site-url");
let errMsg = submitButton.closest("form").querySelector(".error-msg");

let pattern = {
  siteNameReg: /^[a-zA-Z]{3,}$/,
  siteUrlReg:
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
};

let bookmarklist = JSON.parse(localStorage.getItem("bookmarkList")) || [];
console.log(bookmarklist);

siteNameInput.addEventListener("blur", function () {
  if (validateInput(pattern.siteNameReg, siteNameInput) === true) {
    siteNameInput.classList.remove("error-outline");
    errMsg.classList.replace("visible", "hidden");
  } else {
    siteNameInput.classList.add("error-outline");
  }
});

siteUrlInput.addEventListener("blur", function () {
  if (validateInput(pattern.siteUrlReg, siteUrlInput) === true) {
    siteUrlInput.classList.remove("error-outline");
    errMsg.classList.replace("visible", "hidden");
  } else {
    siteUrlInput.classList.add("error-outline");
  }
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    validateInput(pattern.siteNameReg, siteNameInput) === true &&
    validateInput(pattern.siteUrlReg, siteUrlInput) === true
  ) {
    let bookmark = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    bookmarklist.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarklist));
    display();

    siteNameInput.classList.remove("error-outline");
    siteUrlInput.classList.remove("error-outline");
    errMsg.classList.replace("visible", "hidden");
    submitButton.closest("form").reset();
  } else {
    errMsg.classList.replace("hidden", "visible");
    siteNameInput.classList.add("error-outline");
    siteUrlInput.classList.add("error-outline");
  }
});

function validateInput(regPattern, input) {
  let res = regPattern.test(input.value);
  if (res === true) {
    return true;
  }
  return false;
}
display();
function display() {
  console.log(bookmarklist.length);
  let fragment = document.createDocumentFragment();
  let tbContent = document.createElement("tbody");
  fragment.append(tbContent);
  tbContent.setAttribute("class", "bg-white");
  bookmarklist.forEach((element, index) => {
    /* Set variables */
    let tr = document.createElement("tr");
    tr.setAttribute("data-index-element", `${index}`);
    tbContent.append(tr);
    let tdIterator = document.createElement("td");
    tdIterator.classList.add("border-b", "border-gray-200", "px-6", "py-4");

    let tdName = document.createElement("td");
    tdName.classList.add("border-b", "border-gray-200", "px-6", "py-4");

    let tdVisit = document.createElement("td");
    tdVisit.classList.add("border-b", "border-gray-200", "px-6", "py-4");
    let tdVisitLink = document.createElement("a");
    tdVisitLink.classList.add(
      "cursor-pointer",
      "rounded-full",
      "bg-green-500",
      "px-2",
      "py-1",
      "text-xs",
      "text-white",
    );
    tdVisitLink.textContent = "Visit";
    tdVisitLink.setAttribute("target", "_blanck");
    tdVisitLink.setAttribute("href", "#");

    let tdDelete = document.createElement("td");
    tdDelete.classList.add("border-b", "border-gray-200", "px-6", "py-4");
    let tdDeleteLink = document.createElement("a");
    tdDeleteLink.classList.add(
      "delete-item",
      "cursor-pointer",
      "rounded-full",
      "bg-red-500",
      "px-2",
      "py-1",
      "text-xs",
      "text-white",
    );
    tdDeleteLink.textContent = "Delete"; //end of vars
    //Start Appending to the tr
    tdIterator.textContent = `${index + 1}`;
    //Captalize first Word
    let cap = element.siteName;
    cap = cap.charAt(0).toUpperCase() + cap.slice(1);
    tdName.textContent = `${cap}`;

    tr.append(tdIterator);
    tr.append(tdName);

    tdVisitLink.setAttribute("href", `${element.siteUrl}`);
    tdVisit.append(tdVisitLink);
    tr.append(tdVisit);

    tdDelete.append(tdDeleteLink);
    tr.append(tdDelete);
  });
  document.querySelector("tbody").remove();
  document.querySelector("table").append(tbContent);
}

document.querySelector("table").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-item")) {
    let index = e.target.closest("tr").dataset.indexElement;
    e.target.closest("tr").remove();
    bookmarklist.splice(index, 1);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarklist));
    display();
  }
});
