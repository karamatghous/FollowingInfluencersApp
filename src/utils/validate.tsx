export const validateEmail = email => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  ) {
    return true;
  } else {
    return false;
  }
};
export const validateName = name => {
  if (String(name).toLowerCase().match('^[A-Za-z][A-Za-z ]{2,29}$')) {
    return true;
  } else {
    return false;
  }
};
export const validateNumber = number => {
  if (
    String(number)
      //   .toLowerCase()
      // .match(/^(?:\+971|00971|0)?(?:50|51|52|54|55|56|58|2|3|4|6|7|9)\d{7}$/)
      .match(/^(?:50|51|52|54|55|56|58|2|3|4|6|7|9)\d{7}$/)
  ) {
    return true;
  } else {
    return false;
  }
};
