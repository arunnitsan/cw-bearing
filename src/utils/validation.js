export const validateText = (required, type, validation, value, lang) => {
  let error;
  if (validation && validation.length && Array.isArray(validation)) {
    validation.map((v) => {
      if (!value && v.code === 1221560910) {
        error = v.message;
      } else if (
        v.code === 1221559976 &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ) {
        error = v.message;
      }
    });
  } else if (required && !value) {
    if (lang === "en") {
      error = "This is a required field.";
    } else {
      error = "Das ist ein Pflichtfeld.";
    }
  }
  return error;
};

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
