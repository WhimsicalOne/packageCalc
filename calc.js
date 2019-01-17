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
document.addEventListener('DOMContentLoaded', function() {
    const ui = new basicUI();
});
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
locale.addEventListener("click", localeSpecific);
function localeSpecific() {
    const whatLocation = document.createElement("input");
    if(locale.options[locale.selectedIndex].innerText === "Studio") {
        people.options.length = 0;
        let choicesForStudio = {
            100 : "1 person",
            200 : "2 people",
            300 : "3 people",
        }
        for(index in choicesForStudio) {
            people.options[people.options.length] = new Option(choicesForStudio[index], index);
        }
        document.querySelector(".where").remove();
    } else if (locale.options[locale.selectedIndex].innerText === "On-Location") {
        people.options.length = 0;
        let choicesForLocale = {
            100 : "1 person",
            200 : "2 people",
            300 : "3 people",
            400 : "4 people",
            500 : "5 people"
        }
        for(index in choicesForLocale) {
            people.options[people.options.length] = new Option(choicesForLocale[index], index);
        }
        whatLocation.className = "where";
        if(document.querySelector(".where") < 1) {
            whatLocation.type = "text";
            whatLocation.placeholder = "Tell us where that may be?";
            const elementParent = people.parentNode;
            elementParent.insertBefore(whatLocation, people.previousSibling.previousSibling);
        }
    }
    return parseInt(people[people.selectedIndex].value);
}
function tosSelection() {
    // set values for type of shoot
    tos.options[0].value = 200;
    tos.options[1].value = 400;
    const typeValue = tos[tos.selectedIndex].value;
    return parseInt(typeValue);
}
function finalCalculation() {
    const finalSum = localeSpecific() + tosSelection();
    return finalSum;
}
document.getElementById("form-calculator").addEventListener("submit", function(e) {
    const ui = new basicUI();
    // set values for location option fields
    locale.options[0].value = 100;
    locale.options[1].value = 200;
    if (name.value === "" ) {
        ui.validationAlert("Please fill in the necessary details", "error");
    } else {
        person.innerHTML = `${name.value}`;
        amountOfPeople.innerHTML = `${people.options[people.selectedIndex].innerText}`;
        where.innerHTML = `${locale.options[locale.selectedIndex].innerText}`;
        type.innerHTML = `${tos.options[tos.selectedIndex].innerText}`;
        howLong.innerHTML = durationDisplay() + " hour(s)";
        finalCost.innerHTML = "R"+ finalCalculation();
        ui.validationAlert("Form completed. Thank you.", "success");
        ui.completedForm();
    }
    e.preventDefault();
})