function createEmployeeRecord(recordArray) {
    const recordObject = {
        firstName: recordArray[0],
        familyName: recordArray[1],
        title: recordArray[2],
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };

    return recordObject;
}

function createEmployeeRecords(recordArray) {
    return recordArray.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date: date
    });

    return employeeRecord;
}

function hoursWorkedOnDate(recordObject, date) {
    let end = recordObject.timeOutEvents.find(emp => emp.date === date);
    let start = recordObject.timeInEvents.find(emp => emp.date === date);

    return (end.hour - start.hour) / 100;
}

function wagesEarnedOnDate(recordObject, date) {
    return hoursWorkedOnDate(recordObject, date) * recordObject.payPerHour;
}

function allWagesFor(recordObject) {
    let totalDates = recordObject.timeInEvents.map(emp => emp.date);

    let wages = totalDates.reduce(( total, date ) => total + wagesEarnedOnDate(recordObject, date), 0);
    
    return wages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(emp => emp.firstName === firstName);
}

function calculatePayroll(empArray) {
    return empArray.reduce((total, emp) => total + allWagesFor(emp), 0);
}