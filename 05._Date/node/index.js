const date = new Date();

console.log(date.toLocaleDateString());

/* region specific date format */

console.log("Region specific date format:")
const intlDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Copenhagen',
    timeZoneName: 'short',
});

console.log(intlDate.format(date));

console.log(new Intl.dateTimeFormat('en-US').format(date));
console.log(new Intl.dateTimeFormat('da-DK').format(date));