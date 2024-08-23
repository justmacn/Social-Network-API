module.exports = (timestamp) => {
    const dateObj = new Date(timestamp);
  
    // gets hours and minutes
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  
    // determines AM or PM
    let ampm;
    if (hours >= 12) {
      ampm = 'PM';
    } else {
      ampm = 'AM';
    }
  
    // converts to 12-hour format
    hours = hours % 12 || 12;
  
    // get day, month, and year
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
  
    // final format of date as "HH:MM AM/PM MM/DD/YYYY"
    return `${hours}:${minutes}${ampm} ${month}/${day}/${year}`;
  };
  