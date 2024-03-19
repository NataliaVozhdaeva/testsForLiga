(function () {
  /* Код компонента пишите здесь */

  const submitBtn = document.querySelector('.submit-btn');

  const validatePhoneNumber = () => {
    const validPattern = /\+7{1}[0-9\s\-\(\)]{10,22}/;
    const phoneSymbols = [' ', '(', ')', '-', '+'];

    const phoneField = document.querySelector('#phone');
    const phoneNumber = phoneField.value;
    const getActualLenght = phoneNumber.split('').filter((el) => !phoneSymbols.includes(el));

    if (validPattern.test(phoneNumber) && getActualLenght.length === 11) {
      phoneField.classList.add('field-correct');
    } else {
      phoneField.classList.add('field-error');
    }
  };

  const validateDate = () => {
    const validPattern1 = /^(0[1-9]|[12][0-9]|3[01]){0,2}[.](0[1-9]|1[0-12]){0,2}[.](20)\d\d$/;
    const validPattern2 = /^(20)\d\d[\-](0[1-9]|1[012]){0,2}[\-](0[1-9]|[12][0-9]|3[01]){0,2}$/;

    const checkinField = document.querySelector('#checkin-date');
    const checkoutField = document.querySelector('#checkout-date');
    const checkinDate = checkinField.value;
    const checkoutDate = checkoutField.value;

    checkoutField.className = 'field-input';
    checkinField.className = 'field-input';

    if (!validPattern1.test(checkinDate) && !validPattern2.test(checkinDate)) {
      checkinField.classList.add('field-error');
      return;
    }

    if (!validPattern1.test(checkoutDate) && !validPattern2.test(checkoutDate)) {
      checkoutField.classList.add('field-error');
      return;
    }

    const getStayPeriod = () => {
      const getDateParams = (string) => {
        const separator = string.includes('-') ? '-' : '.';
        const params = string.split(separator);
        if (separator == '.') params.reverse();

        params[1] = params[1] - 1;

        paramsForDate = params.map((el) => {
          const param = el.toString().split('');
          return param[0] == 0 ? el.slice(1) : el;
        });
        return paramsForDate.join(',');
      };

      const checkIn = new Date(getDateParams(checkinDate));
      const checkOut = new Date(getDateParams(checkoutDate));

      const period = checkOut.getTime() - checkIn.getTime();

      return period / 86400000;
    };

    if (getStayPeriod() >= 4) {
      checkinField.classList.add('field-correct');
      checkoutField.classList.add('field-correct');
    } else {
      checkinField.classList.add('field-error');
      checkoutField.classList.add('field-error');
    }
  };

  const validateGuests = () => {
    const adultsField = document.querySelector('#adults');
    const adultsAmount = adultsField.value;
    const childrenField = document.querySelector('#children');
    const childrenAmount = childrenField.value;
    const roomTypeFields = document.querySelectorAll('input[name="room-type"]');
    let selectedRoom;
    for (const roomTypeField of roomTypeFields) {
      if (roomTypeField.checked) {
        selectedRoom = roomTypeField.value;
        break;
      }
    }

    adultsField.className = 'field-input';
    childrenField.className = 'field-input';

    if (adultsAmount < 1 || childrenAmount > adultsAmount) {
      adultsField.classList.add('field-error');
      childrenField.classList.add('field-error');
      return;
    }

    switch (selectedRoom) {
      case 'single':
        if (adultsAmount > 1) {
          adultsField.classList.add('field-error');
          childrenField.classList.add('field-error');
        } else {
          adultsField.classList.add('field-correct');
          childrenField.classList.add('field-correct');
        }
        break;
      case 'family':
        if (adultsAmount < 2 || childrenAmount < 1) {
          adultsField.classList.add('field-error');
          childrenField.classList.add('field-error');
        } else {
          adultsField.classList.add('field-correct');
          childrenField.classList.add('field-correct');
        }
        break;
      default:
        adultsField.classList.add('field-correct');
        childrenField.classList.add('field-correct');
    }
  };

  submitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    validatePhoneNumber();
    validateDate();
    validateGuests();
  });
})();
