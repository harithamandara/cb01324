// On form submission, store data in localStorage and navigate to payment page.
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const phoneNumber = phoneInput.getNumber();
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirmEmail').value;
    const gender = document.getElementById('gender').value;

    if(email !== confirmEmail) {
        alert('Emails do not match!');
        return;
    }

    if (!phoneInput.isValidNumber()) {
        alert('Invalid phone number.');
        return;
    } else {
        info.style.display = "";
        info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
    }

    localStorage.setItem('fullName', fullName);
    localStorage.setItem('mobileNumber', phoneNumber);
    localStorage.setItem('email', email);
    localStorage.setItem('gender', gender);

    alert('Form submitted successfully and data stored!');

    window.location.href = "payment.html";
});

// On document loaded, retrieve the summary data from localStorage and populate the table.
document.addEventListener('DOMContentLoaded', function() {
    const storedDate = localStorage.getItem('selectedDate');
    const duration = localStorage.getItem('totalDuration');
    const chargesSLAdult = localStorage.getItem('charges-SL-Adult');
    const chargesSLChild = localStorage.getItem('charges-SL-Child');
    const chargesForeignerAdult = localStorage.getItem('charges-Foreigner-Adult');
    const chargesForeignerChild = localStorage.getItem('charges-Foreigner-Child');
    const totalAmountPayable = localStorage.getItem('total-amount-payable');

    const SLAdult = localStorage.getItem('SL-Adult');
    const SLChild = localStorage.getItem('SL-Child');
    const ForeignerAdult = localStorage.getItem('Foreigner-Adult');
    const ForeignerChild = localStorage.getItem('Foreigner-Child');
    const infant = localStorage.getItem('Infant');

    if (storedDate) {
        document.getElementById('summary-date').textContent = storedDate;
    }

    if (chargesSLAdult) {
        document.getElementById('charges-SL-Adult').textContent = '$' + chargesSLAdult;
    }
    if (duration){
        document.getElementById('total-duration').textContent =  duration + ' hours';
    }
// For chargesSLChild
if (chargesSLChild) {
    document.getElementById('charges-SL-Child').textContent ='$' +  chargesSLChild;
}

// For chargesForeignerAdult
if (chargesForeignerAdult) {
    document.getElementById('charges-Foreigner-Adult').textContent ='$' +  chargesForeignerAdult;
}

// For chargesForeignerChild
if (chargesForeignerChild) {
    document.getElementById('charges-Foreigner-Child').textContent ='$' +  chargesForeignerChild;
}

// For totalAmountPayable
if (totalAmountPayable) {
    document.getElementById('total-amount-payable').textContent ='$' +  totalAmountPayable;
}
    // ... Repeat this for all other items ...

    if (SLAdult) {
        document.getElementById('no-sladult').textContent = SLAdult;
    }
// For SLChild
if (SLChild) {
    document.getElementById('no-slchild').textContent = SLChild;
}

// For ForeignerAdult
if (ForeignerAdult) {
    document.getElementById('no-fadult').textContent = ForeignerAdult;
}

// For ForeignerChild
if (ForeignerChild) {
    document.getElementById('no-fchild').textContent = ForeignerChild;
}

// For infant
if (infant) {
    document.getElementById('infant').textContent = infant;
}
    // ... And so on for all other values ...

    // If you also need to retrieve and display time slots:
    const storedTimeSlots = JSON.parse(localStorage.getItem('selectedTimeSlots') || '[]');
    document.getElementById('time-slots').textContent = storedTimeSlots.join(', ');
});
