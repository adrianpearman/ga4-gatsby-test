// creates an object of default state values for a list of inputs (inputName: '')
export const createInputStateDefaults = (arrayOfInputs, propertyName) => {
  return arrayOfInputs.reduce((acc, input) => {
    return {
      ...acc,
      [input[propertyName]]: ''
    };
  }, {});
};

// tracks value changes on a group of inputs and updates their state, works for a group of text inputs and a set of checkbox or radio inputs
export const trackInputValueChanges = (
  e,
  stateValues,
  setStateValues,
  inputName,
  inputValue,
  checkboxList = false
) => {
  let newValue = inputValue;
  if (checkboxList) {
    newValue = e.target.checked ? inputValue : '';
  }
  setStateValues({
    ...stateValues,
    [inputName]: newValue
  });
};

// error handling to ensure that at least one checkbox has been checked in a list
export const hasAtLeastOneOptionChecked = (stateValuesObject) => {
  return Object.values(stateValuesObject).join('') !== '';
};

// form error handling to show error messages underneath opt in questions
export const handleInvalidSubmit = (e, setFormFailState, formErrorsList, setFormErrorsList) => {
  setFormFailState(true);
  if (e.target.name === 'doNotEmail' || e.target.name === 'privacy_policy') {
    e.preventDefault();
    setFormErrorsList([...formErrorsList, e.target.name]);
  }
};

// opt in checkbox change handler, toggles error messages after form fails
export const validateCheckboxChange = (e, formFailState, formErrorsList, setFormErrorsList) => {
  if (formFailState && e.target.checked) {
    const newErrorList = formErrorsList.filter((error) => error !== e.target.name);
    setFormErrorsList(newErrorList);
  }
  if (formFailState && !e.target.checked) {
    setFormErrorsList([...formErrorsList, e.target.name]);
  }
};
