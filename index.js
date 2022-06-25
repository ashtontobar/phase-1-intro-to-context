// Arguments //
// 4-element array (first name, family name, title, pay rate)
// number

function createEmployeeRecord(array, number) {
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };

  return employeeRecord;
}

function createEmployeeRecords(array) {
  const newRecord = array.map(createEmployeeRecord);

  return newRecord;
}

function createTimeInEvent(record, date) {
  // add the time in date & time to createEmployeeRecords
  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(date.slice(11)),
    date: date.slice(0, 10),
  };
  const updatedTimeIn = record.timeInEvents.push(timeInEvent);

  return record;
}

function createTimeOutEvent(record, date) {
  // adds the time out date & time to createEmployeeRecords
  let timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(date.slice(11)),
    date: date.slice(0, 10),
  };

  const updateTimeOut = record.timeOutEvents.push(timeOutEvent);

  return record;
}

function hoursWorkedOnDate(record, date) {
  // match the date passed in to a date within the employee record
  // calculate number of hours worked timeOutEvent - timeInEvent (24 hour clock)
  let hours;

  for (let i = 0; i < record.timeInEvents.length; i++) {
    if (record.timeInEvents[i].date === date) {
      if (record.timeOutEvents[i].date === date) {
        hours = record.timeOutEvents[i].hour - record.timeInEvents[i].hour;
      }
    }
  }
  return hours / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
    let pay = []
    let dates = []

    for (let i = 0; i < record.timeInEvents.length; i++) {
        dates.push(record.timeInEvents[i].date)
    }

    dates.forEach(date => {
        pay.push(wagesEarnedOnDate(record, date))
    })
    return pay.reduce((previousValue, currentValue) => previousValue + currentValue)
}

function calculatePayroll(arrOfRecords) {
    let payroll = []

    arrOfRecords.forEach(employee => {
        payroll.push(allWagesFor(employee))
    })
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}
