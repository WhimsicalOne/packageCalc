/* Instructions
1 - Identify all fields - name, location, type, duration and submission.
1.5 - Inside location, type and duration it has different values.
2 - Attach all external values to specific fields.
3 - Create on-change function to show values as user selects. - This won't work with submit. Can 
    create an external function for submission if this was meant to be sent out to someone.
4 - On change has to do calculations on the calculation field section to indicate possible costs
    for user.
Will continue as needs arise.
*/
// form values;
const name = document.getElementById("full-name"),
locale = document.getElementById("shoot-location"),
duration = document.getElementById("duration"),
people = document.getElementById("amount-of-people"),
tos = document.getElementById("type-of-shoot");
// review values;
const person = document.getElementById("name"),
    amountOfPeople = document.getElementById("persons"),
    where = document.getElementById("where"),
    type = document.getElementById("type"),
    howLong = document.getElementById("hours"),
    finalCost = document.getElementById("cost")
// Shows duration value;
duration.addEventListener("change", durationDisplay);
function durationDisplay() {
    let span = document.querySelector(".duration-value");
    span.innerHTML = `${duration.value} hour(s)`;
    return duration.value;
}
people.style.display = "none";
locale.addEventListener("change", localeSpecific);
function localeSpecific() {
    if(locale.options[locale.selectedIndex].innerText === "Studio") {
        let choicesForStudio = {
            100 : "1 person",
            200 : "2 people",
            300 : "3 people",
        }
        people.style.display = "block";
        for(index in choicesForStudio) {
            people.options[people.options.length] = new Option(choicesForStudio[index], index);
        }
    } else if (locale.options[locale.selectedIndex].innerText === "On-Location") {
        let choicesForLocale = {
            100 : "1 person",
            200 : "2 people",
            300 : "3 people",
            400 : "4 people",
            500 : "5 people"
        }
        people.style.display = "block";
        for(index in choicesForLocale) {
            people.options[people.options.length] = new Option(choicesForLocale[index], index);
        }
    }
    return people[people.selectedIndex].value;
}
function tosSelection() {
    const value = tos[tos.selectedIndex].value;
    return value;
}
class basicUI {
    validationAlert(status, cssName) {
        const div = document.createElement("div");
        const heading = document.getElementById("heading");
        const parentDiv = heading.parentNode;
        div.className = `status ${cssName}`;
        div.textContent = `${status}`;
        parentDiv.insertBefore(div, heading);
        setTimeout(function() {
            document.querySelector(".status").remove();
        }, 1500)
    }
    completedForm() {
        document.getElementById("full-name").value = "";
    }
}
document.getElementById("form-calculator").addEventListener("submit", function(e) {
    const ui = new basicUI();
    // set values for location option fields
    locale.options[0].value = 100;
    locale.options[1].value = 200;
    // set values for type of shoot
    tos.options[0].value = 200;
    tos.options[1].value = 400;
    if (name.value === "" ) {
        ui.validationAlert("Please fill in the necessary details", "error");
    } else {
        person.innerHTML = `${name.value}`;
        amountOfPeople.innerHTML = localeSpecific();
        where.innerHTML = `${locale.options[locale.selectedIndex].innerText}`;
        type.innerHTML = `${tos.options[tos.selectedIndex].innerText}`;
        howLong.innerHTML = durationDisplay() + " hour(s)";
        finalCost.innerHTML = eval("localeSpecific() + tosSelection()");
        ui.validationAlert("Form completed. Thank you.", "success");
        ui.completedForm();
    }
    e.preventDefault();
})