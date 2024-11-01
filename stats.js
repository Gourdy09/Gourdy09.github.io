const currentDate = new Date();
const birthDate = new Date("2008-09-19");
const difference = calculateAge(currentDate, birthDate);

// Update HTML elements
document.getElementById("ageSpan").innerText = difference.years;
document.getElementById("year").innerText = difference.years;
document.getElementById("month").innerText = difference.months;
document.getElementById("day").innerText = difference.days;

if(isSleeping()){
    document.getElementById("status").innerText = "Sleeping";
    document.getElementById("bubble").style.background = "yellow";
} 
else if(isAtSchool()){
    document.getElementById("status").innerText = "At School";
    document.getElementById("bubble").style.background = "red";
} 
else{
    document.getElementById("status").innerText = "Available";
    document.getElementById("bubble").style.background = "green";
}


function calculateAge(cD, bD) {

    // Initial difference in years, months, and days
    let years = cD.getFullYear() - bD.getFullYear();
    let months = cD.getMonth() - bD.getMonth();
    let days = cD.getDate() - bD.getDate();

    // Adjust if current month/day is before birth month/day
    if (days < 0) {
        months -= 1;
        let lastMonthDate = new Date(cD.getFullYear(), cD.getMonth(), 0);
        days += lastMonthDate.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }
    years = String(years).padStart(2, '0');
    months = String(months).padStart(2, '0');
    days = String(days).padStart(2, '0');

    // Return object with difference in dates
    return { years, months, days };
}

function isAtSchool() {
    const currentTime = new Date();
    const options = { timeZone: 'America/Chicago', hour: 'numeric', minute: 'numeric', weekday: 'long' };
    const houstonTime = new Intl.DateTimeFormat('en-US', options).formatToParts(currentTime);

    const day = houstonTime.find(part => part.type === 'weekday').value;
    const hour = parseInt(houstonTime.find(part => part.type === 'hour').value, 10);
    const period = houstonTime.find(part => part.type === 'dayPeriod').value;

    console.log(`Current Time: ${day}, ${hour} ${period}`); // Debugging line

    const isWeekday = !["Saturday", "Sunday"].includes(day);
    const isAfter7AM = (period === 'AM' && hour >= 7) || (period === 'PM' && hour < 3); // Correctly handles AM/PM
    const isBefore3PM = (period === 'AM' && hour < 3) || (period === 'PM' && hour < 3);

    return isWeekday && isAfter7AM && isBefore3PM;
}

function isSleeping() {
    const currentTime = new Date();
    const options = { timeZone: 'America/Chicago', hour: 'numeric', minute: 'numeric', weekday: 'long' };
    const houstonTime = new Intl.DateTimeFormat('en-US', options).formatToParts(currentTime);

    const day = houstonTime.find(part => part.type === 'weekday').value;
    const hour = parseInt(houstonTime.find(part => part.type === 'hour').value, 10);
    const period = houstonTime.find(part => part.type === 'dayPeriod').value;

    console.log(`Current Time: ${day}, ${hour} ${period}`); // Debugging line

    const isWeekday = !["Saturday", "Sunday"].includes(day);
    const isPast9PM = period === 'PM' && hour >= 9;
    const isBefore7AM = period === 'AM' && hour < 7;

    // For 12 AM, consider it before 7 AM
    if (hour === 12 && period === 'AM') {
        return isWeekday; // Sleeping if it's a weekday
    }

    return isWeekday && (isPast9PM || isBefore7AM);
}
