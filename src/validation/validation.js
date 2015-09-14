const isEmpty = value => value === undefined || value === null || value === '';
//const join = (rules) => value => rules.map(rule => rule(value)).filter(error => !!error)[0 /* first error */];

// 同上面的寫法, 實在是優雅的讓人看不太懂啊~~
function join(rules) {
  return function (value) {
    return rules.map(function (rule) {
      return rule(value);
    }).filter(function (error) {
      return !!error;
    })[0]; // 取得第一個錯誤
  };
};


export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

// rules
/*
const surveyValidation = createValidator({
  name: [required, maxLength(10)],
  email: [required, email],
  occupation: maxLength(20) // single rules don't have to be in an array
});
*/

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {valid: true};

    // 取得obj所有的key轉為array
    Object.keys(rules).forEach((key) => {
      //console.log(rules[key]);
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key]);

      //console.log(error);
      if (error) {
        errors[key] = error;
        errors.valid = false;
      }
    });
    return errors;
  };
}
