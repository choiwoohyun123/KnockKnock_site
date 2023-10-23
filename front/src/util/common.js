export const validateEmail = (email) => {
  if (email === "") {
    return false;
  }
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validatePassword = (password) => {
  return password.match(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/
  );
};

export const validateName = (name) => {
  return name.match(/^[a-zA-Z가-힣\s]{2,20}$/);
};

export const validateDate = (date) => {
  return date.match(/^\d{4}-\d{2}-\d{2}$/);
};
