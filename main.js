//CALENDAR
const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener('click', function(e) {
    toggleDatePicker(e.composedPath());
});
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
function toggleDatePicker (path) {
    if (!checkEventPathForClass(path, 'dates')) {
        dates_element.classList.toggle('active');
    }
}

function goToNextMonth (e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function goToPrevMonth (e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function populateDates (e) {
    days_element.innerHTML = '';
    let amount_days = 31;

    if (month == 1) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            amount_days = 29;
        } else {
            amount_days = 28;
        }
    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        amount_days = 30;
    }

    // Create days of week
    for (let i = 0; i < days.length; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day-of-week');
        day_element.textContent = days[i];
        days_element.appendChild(day_element);
    }

    const firstDayIndex = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDayIndex; i++) {
        const empty_day_element = document.createElement('div');
        days_element.appendChild(empty_day_element);
    }

    for (let i = 0; i < amount_days; i++) {
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        day_element.textContent = i + 1;
        const currentDay = new Date(year, month, i + 1);
        if (currentDay >= date) {
            day_element.addEventListener('click', function () {
                selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
                selectedDay = (i + 1);
                selectedMonth = month;
                selectedYear = year;
                selected_date_element.textContent = formatDate(selectedDate);
                selected_date_element.dataset.value = selectedDate;
                populateDates();
                // Store the selected date in local storage
                localStorage.setItem('selectedDate', selectedDate.toString());
                // Update the paragraph with the selected date
                document.getElementById('summary-date').textContent = formatDate(selectedDate);
            });
        }
        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            day_element.classList.add('selected');
        }
        days_element.appendChild(day_element);
    }
}


// HELPER FUNCTIONS
function checkEventPathForClass (path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }
    return false;
}
function formatDate (d) {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = d.getFullYear();
    return day + ' / ' + month + ' / ' + year;
}
//time selector
// Start and end times in hours
const start = 7;
const end = 18;

// Peak hours
const peakHours = [10, 11, 12, 15, 16, 17];

// Reference to the dropdown content element
const dropdownContent = document.getElementById('dropdown-content');
const confirmButton = document.getElementById('confirmButton');
const submitButton = document.getElementById('submit-button');

let checkboxes = [];

// Loop through the hours of the day
for (let i = start; i < end; i++) {
    // Create a new div element
    const div = document.createElement('div');

    // Format the hour to display as a time slot
    let timeSlot = (i < 10 ? '0' : '') + i + ':00 - ';
    timeSlot += ((i+1) < 10 ? '0' : '') + (i + 1) + ':00';

    // Add peak period label
    if (peakHours.includes(i)) {
        timeSlot += ' (Peak)';
    }

    // Create the checkbox and label
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'timeslot-' + i;
    checkbox.value = timeSlot;

    const label = document.createElement('label');
    label.htmlFor = 'timeslot-' + i;
    label.appendChild(document.createTextNode(timeSlot));

    // Add the checkbox and label to the div
    div.appendChild(checkbox);
    div.appendChild(label);

    // Add the div element to the dropdown content element
    dropdownContent.appendChild(div);

    checkboxes.push(checkbox);
}

// Listen for the checkbox change event
for (let checkbox of checkboxes) {
    checkbox.addEventListener('change', function() {
        // Find index of this checkbox
        let index = checkboxes.indexOf(this);

        // If this checkbox is being checked
        // if (this.checked) {
        //     // Check if the previous and next checkboxes are unchecked
        //     if (index > 0 && !checkboxes[index - 1].checked && index < checkboxes.length - 1 && !checkboxes[index + 1].checked) {
        //         // Uncheck this checkbox
        //         this.checked = false;

        //         // Alert user
        //         alert('Please select contiguous time slots.');
        //     }
        // } else {
        //     // If this checkbox is being unchecked
        //     // Check if the previous and next checkboxes are checked
            if (index > 0 && checkboxes[index - 1].checked && index < checkboxes.length - 1 && checkboxes[index + 1].checked) {
                // Check this checkbox again
                this.checked = true;

                // Alert user
                alert('Please do not leave a gap in the selection.');
            }
        // }
    });
}

// Listen for the confirm button click event
confirmButton.addEventListener('click', function() {

    // Get checked time slots
    const checkedTimeSlots = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    // Calculate total duration
    const totalDuration = checkedTimeSlots.length;

    // Calculate total charges for each category
    const peakHourSlots = checkedTimeSlots.filter(slot => slot.includes('Peak')).length;
    const normalHourSlots = totalDuration - peakHourSlots;

    const ticketCount = id => parseInt(localStorage.getItem(id) || "0");
    
    const chargesForSLAdult = (peakHourSlots * 6 + normalHourSlots * 4) * ticketCount('SL-Adult');
    const chargesForSLChild = (peakHourSlots * 3 + normalHourSlots * 2) * ticketCount('SL-Child');
    const chargesForForeignerAdult = (peakHourSlots * 13 + normalHourSlots * 10) * ticketCount('Foreigner-Adult');
    const chargesForForeignerChild = (peakHourSlots * 8 + normalHourSlots * 5) * ticketCount('Foreigner-Child');

    if(selectedDate == null) {
        alert('Please select a date.');
        return;
    }

    if(checkedTimeSlots.length == 0) {
        alert('Please select at least one time slot.');
        return;
    }

    if(chargesForSLAdult == 0 && chargesForSLChild == 0 && chargesForForeignerAdult == 0 && chargesForForeignerChild == 0) {
        alert('Please select at least one ticket.');
        return;
    }
   

    const totalAmountPayable = chargesForSLAdult + chargesForSLChild + chargesForForeignerAdult + chargesForForeignerChild;


    // Retrieve the selected time slots from the local storage and convert it to an array
    const selectedTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots'));

    // Get the table cell for displaying the time slots and charges
    const timeSlotsCell = document.getElementById('time-slots');
    const totalDurationCell = document.getElementById('total-duration');
    const chargesSLAdultCell = document.getElementById('charges-SL-Adult');
    const chargesSLChildCell = document.getElementById('charges-SL-Child');
    const chargesForeignerAdultCell = document.getElementById('charges-Foreigner-Adult');
    const chargesForeignerChildCell = document.getElementById('charges-Foreigner-Child');
    const totalAmountPayableCell = document.getElementById('total-amount-payable');


    // Store selected time slots and charges in local storage
    localStorage.setItem('selectedTimeSlots', JSON.stringify(checkedTimeSlots));
    localStorage.setItem('charges-SL-Adult', chargesForSLAdult);
    localStorage.setItem('charges-SL-Child', chargesForSLChild);
    localStorage.setItem('charges-Foreigner-Adult', chargesForForeignerAdult);
    localStorage.setItem('charges-Foreigner-Child', chargesForForeignerChild);
    localStorage.setItem('total-amount-payable', totalAmountPayable);

    localStorage.setItem('totalDuration', totalDuration);


    // Set the innerText of the cells as the selected time slots, total duration, and charges
    timeSlotsCell.innerText = selectedTimeSlots.join(', ');
    totalDurationCell.innerText = totalDuration.toString().padStart(2, '0') + ' Hours';
    chargesSLAdultCell.innerText = '$' + chargesForSLAdult;
    chargesSLChildCell.innerText = '$' + chargesForSLChild;
    chargesForeignerAdultCell.innerText = '$' + chargesForForeignerAdult;
    chargesForeignerChildCell.innerText = '$' + chargesForForeignerChild;
    totalAmountPayableCell.innerText = '$' + totalAmountPayable;

    alert('Time slots confirmed and stored.');

    document.getElementById('submit-button').style.display = 'block';
});

submitButton.addEventListener('click', function() {
    window.location.href = 'details.html';
});

// document.getElementById('confirmButton').addEventListener('click', function() {
    
// });


//ticket category selector



document.querySelectorAll('.ticket-category').forEach(category => {
    const minusBtn = category.querySelector('.minus-btn');
    const plusBtn = category.querySelector('.plus-btn');
    const count = category.querySelector('.ticket-count');
    const categoryId = category.id;

    // Load count from local storage
    const storedCount = localStorage.getItem(categoryId);
    if (storedCount) {
        count.innerText = storedCount;
    }

    const updateCharges = () => {
        const selectedTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots'));
        const peakHourSlots = selectedTimeSlots.filter(slot => slot.includes('Peak')).length;
        const normalHourSlots = selectedTimeSlots.length - peakHourSlots;
        const ticketCount = parseInt(localStorage.getItem(categoryId) || "0");
        let charges = 0;
        switch(categoryId) {
            case 'SL-Adult':
                charges = (peakHourSlots * 6 + normalHourSlots * 4) * ticketCount;
                break;
            case 'SL-Child':
                charges = (peakHourSlots * 3 + normalHourSlots * 2) * ticketCount;
                break;
            case 'Foreigner-Adult':
                charges = (peakHourSlots * 13 + normalHourSlots * 10) * ticketCount;
                break;
            case 'Foreigner-Child':
                charges = (peakHourSlots * 8 + normalHourSlots * 5) * ticketCount;
                break;
            
            default:
                // No charges for unknown categories
                charges = 0;
                break;
        }
           // Update ticket count in the table
    document.querySelectorAll('.ticket-category').forEach(category => {
        const categoryId = category.id;
        const ticketCount = parseInt(localStorage.getItem(categoryId) || "0");

        // Set the quantity in the table
        const quantityCell = document.getElementById('quantity-' + categoryId.replace(' ', '-'));
        if (quantityCell) {
            quantityCell.innerText = ticketCount;
        }
    });
        
        // Update charges for this category
        document.getElementById('charges-' + categoryId.replace(' ', '-')).textContent = '$' + charges;
        // Update total amount payable
        let totalAmountPayable = 0;
        document.querySelectorAll('[id^="charges-"]').forEach(chargeCell => {
            totalAmountPayable += parseFloat(chargeCell.textContent.slice(1));
        });
        document.getElementById('total-amount-payable').textContent = '$' + totalAmountPayable.toFixed(2);
    }

    minusBtn.addEventListener('click', () => {
        if (parseInt(count.innerText) > 0) {
            count.innerText = parseInt(count.innerText) - 1;
        }
        // Store count in local storage
        localStorage.setItem(categoryId, count.innerText);
        updateCharges();
    });

    plusBtn.addEventListener('click', () => {
        count.innerText = parseInt(count.innerText) + 1;
        // Store count in local storage
        localStorage.setItem(categoryId, count.innerText);
        updateCharges();
    });
});


// Load previously selected date, time slots, total duration, and charges from local storage when the page is loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // Set default values
    const defaultDate = new Date().toDateString();
    const defaultTimeSlots = ['7:00 - 8:00'];

    // Retrieve the selected date and time slots from local storage or use the default values
    const selectedDate = localStorage.getItem('selectedDate') || defaultDate;
    const selectedTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots')) || defaultTimeSlots;

    // Display the selected date and time slots
    document.getElementById('summary-date').textContent = selectedDate;
    document.getElementById('time-slots').textContent = selectedTimeSlots.join(', ');

    // Calculate the total duration
    const totalDuration = selectedTimeSlots.length;
    document.getElementById('total-duration').textContent = totalDuration.toString().padStart(2, '0') + ' Hours';

    // Retrieve the charges for each category from local storage or use '0' as the default value
    const chargesSLAdult = localStorage.getItem('charges-SL-Adult') || '0';
    const chargesSLChild = localStorage.getItem('charges-SL-Child') || '0';
    const chargesForeignerAdult = localStorage.getItem('charges-Foreigner-Adult') || '0';
    const chargesForeignerChild = localStorage.getItem('charges-Foreigner-Child') || '0';

    // Display the charges for each category
    document.getElementById('charges-SL-Adult').textContent = '$' + chargesSLAdult;
    document.getElementById('charges-SL-Child').textContent = '$' + chargesSLChild;
    document.getElementById('charges-Foreigner-Adult').textContent = '$' + chargesForeignerAdult;
    document.getElementById('charges-Foreigner-Child').textContent = '$' + chargesForeignerChild;

    // Calculate and display the total amount payable
    const totalAmountPayable = parseInt(chargesSLAdult) + parseInt(chargesSLChild) + parseInt(chargesForeignerAdult) + parseInt(chargesForeignerChild);
    document.getElementById('total-amount-payable').textContent = '$' + totalAmountPayable.toString();

    // Reset local storage for the next session
    localStorage.clear();

    // Initialize the infant count in local storage
      if (localStorage.getItem('Infants') === null) {
       localStorage.setItem('Infants', '0');
    }

    //Update charges for infants
    const ticketCount = id => parseInt(localStorage.getItem(id) || "0");
    const chargesForInfants = 0 * ticketCount('Infants'); // Infants are free of charge
    document.getElementById('charges-Infants').textContent = '$' + chargesForInfants;

    // Update total amount payable again after adding charges for infants
    let totalAmountPayableUpdated = 0;
    document.querySelectorAll('[id^="charges-"]').forEach(chargeCell => {
        totalAmountPayableUpdated += parseFloat(chargeCell.textContent.slice(1));
    });
    document.getElementById('total-amount-payable').textContent = '$' + totalAmountPayableUpdated.toFixed(2);
});



window.onload = function() {
    // Clear local storage
    localStorage.clear();
}


// Store the selected date in local storage
localStorage.setItem('selectedDate', selectedDate.toDateString());


window.onload = function() {
    // Clear local storage
    localStorage.clear();

    // Set default time slot
    localStorage.setItem('selectedTimeSlots', JSON.stringify(['7:00 - 8:00']));
}



// Calculate and display the total amount payable
// const totalAmountPayable = parseInt(chargesSLAdult) + parseInt(chargesSLChild) + parseInt(chargesForeignerAdult) + parseInt(chargesForeignerChild);
// document.getElementById('total-amount-payable').textContent = '$' + totalAmountPayable.toString();

//Button 

// Update button status based on user's selections
function updateContinueButtonStatus() {
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots'));
    const selectedCategories = ['SL-Adult', 'SL-Child', 'Foreigner-Adult', 'Foreigner-Child'];

    const button = document.getElementById('continuePurchase');

    if (selectedDate && selectedTimeSlots.length > 0) {
        let atLeastOneCategorySelected = false;
        for (const category of selectedCategories) {
            const ticketCount = parseInt(localStorage.getItem(category) || "0");
            if (ticketCount > 0) {
                atLeastOneCategorySelected = true;
                break;
            }
        }

        if (atLeastOneCategorySelected) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    } else {
        button.disabled = true;
    }
}
// Add an event listener to the "Continue with Purchase" button
document.getElementById('continuePurchase').addEventListener('click', function() {
    if (!this.disabled) {
        // Redirect the user to the next page
        window.location.href = "details.html"; 
    }
});

// Initially check the button status
updateContinueButtonStatus();

let chargesSLAdult = 0;
let chargesSLChild = 0;
let chargesForeignerAdult = 0;
let chargesForeignerChild = 0;



//summary table saving

// Storing the summary data in localStorage
// localStorage.setItem('summary-date', document.getElementById('summary-date').textContent);
// localStorage.setItem('charges-SL-Adult', document.getElementById('charges-SL-Adult').textContent);
// localStorage.setItem('charges-SL-Child', document.getElementById('charges-SL-Child').textContent);
// localStorage.setItem('charges-Foreigner-Adult', document.getElementById('charges-Foreigner-Adult').textContent);
// localStorage.setItem('charges-Foreigner-Child', document.getElementById('charges-Foreigner-Child').textContent);
// localStorage.setItem('total-amount-payable', document.getElementById('total-amount-payable').textContent);
// Store the selected date in local storage

localStorage.setItem('selectedDate', selectedDate.toDateString());

// Set default time slot if not already set
if (!localStorage.getItem('selectedTimeSlots')) {
    localStorage.setItem('selectedTimeSlots', JSON.stringify(['7:00 - 8:00']));
}



const totalDuration = selectedTimeSlots.length;
console.log("Total Duration:", totalDuration);
localStorage.setItem('totalDuration', totalDuration);

localStorage.setItem('totalDuration', totalDuration.toString());


localStorage.setItem('totalDuration', totalDuration);
console.log("Stored Duration:", localStorage.getItem('totalDuration'));

