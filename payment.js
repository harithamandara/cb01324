const payButton = document.getElementById('payButton');

window.onload = function() {
    const totalAmountPayable = localStorage.getItem('total-amount-payable');

    document.getElementById('total-amount-payable').textContent = totalAmountPayable;

}

payButton.addEventListener('click', function() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const nameOnCard = document.getElementById('nameOnCard');
    const cardError = document.querySelector('.card-error');
    const dateError = document.querySelector('.date-error');
    const cvvError = document.querySelector('.cvv-error');
    const nameError = document.querySelector('.name-error');

    // Array to collect errors
    let errorMessages = [];

    // Card Number validation
    const cardRegex = /^(\d{4}\s){3}\d{4}$/;
    if (!cardRegex.test(cardNumber.value)) {
        errorMessages.push('Card number must be 16 digits divided into 4 groups.');
    }

    // Expiry Date validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryDate.value)) {
        errorMessages.push('Expiry date must be in MM/YY format.');
    }

    // CVV validation
    if (cvv.value.length !== 3 || isNaN(cvv.value)) {
        errorMessages.push('CVV must be a 3-digit number.');
    }

    // Name on Card validation
    const nameArray = nameOnCard.value.trim().split(' ');
    if (nameArray.length !== 2) {
        errorMessages.push('Name on card must have two names.');
    }

    // Displaying the errors
    if (errorMessages.length) {
        // Reset error displays
        cardError.textContent = '';
        dateError.textContent = '';
        cvvError.textContent = '';
        nameError.textContent = '';
        
        // Assign each error message to its corresponding error element
        cardError.textContent = errorMessages.includes('Card number must be 16 digits divided into 4 groups.') ? 'Card number must be 16 digits divided into 4 groups.' : '';
        dateError.textContent = errorMessages.includes('Expiry date must be in MM/YY format.') ? 'Expiry date must be in MM/YY format.' : '';
        cvvError.textContent = errorMessages.includes('CVV must be a 3-digit number.') ? 'CVV must be a 3-digit number.' : '';
        nameError.textContent = errorMessages.includes('Name on card must have two names.') ? 'Name on card must have two names.' : '';
        return;
    }

    // If all validations pass
    alert('Payment Successful!');  // you can replace this with actual payment logic

    window.location.href = "comfirm.html";
});


// window.onload = function() {
//     const storedDate = localStorage.getItem('summary-date');
//     const chargesSLAdult = localStorage.getItem('charges-SL-Adult');
//     const chargesSLChild = localStorage.getItem('charges-SL-Child');
//     const chargesForeignerAdult = localStorage.getItem('charges-Foreigner-Adult');
//     const chargesForeignerChild = localStorage.getItem('charges-Foreigner-Child');
//     const totalAmountPayable = localStorage.getItem('total-amount-payable');

//     const SLAdult = localStorage.getItem('SL-Adult');
//     const SLChild = localStorage.getItem('SL-Child');
//     const ForeignerAdult = localStorage.getItem('Foreigner-Adult');
//     const ForeignerChild = localStorage.getItem('Foreigner-Child');
//     const infant = localStorage.getItem('Infant');

//     document.getElementById('summary-date').textContent = storedDate;
//     document.getElementById('charges-SL-Adult').textContent = chargesSLAdult;
//     document.getElementById('charges-SL-Child').textContent = chargesSLChild;
//     document.getElementById('charges-Foreigner-Adult').textContent = chargesForeignerAdult;
//     document.getElementById('charges-Foreigner-Child').textContent = chargesForeignerChild;
//     document.getElementById('total-amount-payable').textContent = totalAmountPayable;

//     document.getElementById('no-sladult').textContent = SLAdult;
//     document.getElementById('no-slchild').textContent = SLChild;
//     document.getElementById('no-fadult').textContent = ForeignerAdult;
//     document.getElementById('no-fchild').textContent = ForeignerChild;
//     document.getElementById('infant').textContent = infant;
// }

window.onload = function() {
    const name = localStorage.getItem('fullName');
    const date = localStorage.getItem('selectedDate');
    const time = localStorage.getItem('selectedTimeSlots');
    const duration = localStorage.getItem('totalDuration');
    const mobile = localStorage.getItem('mobileNumber');
    const email = localStorage.getItem('email');
    const gender = localStorage.getItem('gender');
    const chargesSLAdult = localStorage.getItem('charges-SL-Adult');
    const chargesSLChild = localStorage.getItem('charges-SL-Child');
    const chargesForeignerAdult = localStorage.getItem('charges-Foreigner-Adult');
    const chargesForeignerChild = localStorage.getItem('charges-Foreigner-Child');
    const SLAdult = localStorage.getItem('SL-Adult');
    const SLChild = localStorage.getItem('SL-Child');
    const ForeignerAdult = localStorage.getItem('Foreigner-Adult');
    const ForeignerChild = localStorage.getItem('Foreigner-Child');
    const totalAmountPayable = localStorage.getItem('total-amount-payable');
    const infant = localStorage.getItem('Infant');
    

    document.getElementById('name').textContent = name;
    document.getElementById('date').textContent = date;
    document.getElementById('time').textContent = time;
    document.getElementById('duration').textContent = duration + ' hours';
    document.getElementById('mobile').textContent = mobile;
    document.getElementById('email').textContent = email;
    document.getElementById('gender').textContent = gender;
    document.getElementById('no-sladult').textContent = SLAdult;
    document.getElementById('no-slchild').textContent = SLChild;
    document.getElementById('no-fadult').textContent = ForeignerAdult;
    document.getElementById('no-fchild').textContent = ForeignerChild;
    document.getElementById('charges-SL-Adult').textContent = '$'+chargesSLAdult;
    document.getElementById('charges-SL-Child').textContent ='$'+ chargesSLChild;
    document.getElementById('charges-Foreigner-Adult').textContent = '$'+chargesForeignerAdult;
    document.getElementById('charges-Foreigner-Child').textContent = '$'+chargesForeignerChild;
    document.getElementById('infant').textContent = infant;
    document.getElementById('totalAmountPayable').textContent ='$'+ totalAmountPayable;
}