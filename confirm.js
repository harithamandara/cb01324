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