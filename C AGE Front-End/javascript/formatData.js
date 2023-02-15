// function formatPhoneNumber(value) {
//     if (!value) return value;
//     const phoneNumber = value.replace(/[^\d]/g, '');
//     const phoneNumberLength = phoneNumber.length;
//     if (phoneNumberLength < 2) return phoneNumber;
//     if (phoneNumberLength < 7) return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
//     return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2,7)}-${phoneNumber.slice(7, 10)}`;
// }

// function ElderlyPhoneNumberFormatter() {
//     const inputField = document.getElementById('inputPhoneElderly');
//     const formattedInputValue = formatPhoneNumber(inputField.value);
//     inputField.value = formattedInputValue;
// }


// function EmergencyPhoneNumberFormatter() {
//     const inputField = document.getElementById('inputPhoneEmergencyElderly');
//     const formattedInputValue = formatPhoneNumber(inputField.value);
//     inputField.value = formattedInputValue;
// }

function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, '');
  
    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;
  
    // we need to return the value with no formatting if its less than four digits
    // this is to avoid weird behavior that occurs if you  format the area code too early
    if (phoneNumberLength < 4) return phoneNumber;
  
    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 8) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
  
    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      7
    )}-${phoneNumber.slice(7, 10)}`;
  }

  function phoneNumberFormatter(html) {    
    const formattedInputValue = formatPhoneNumber(html.value);
    html.value = formattedInputValue;
  }