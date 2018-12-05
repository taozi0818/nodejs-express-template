/**
 * Created by tyt on 2017/7/24.
 *
 * Request params validator.
 * @param {Object} body - An object need to validate
 * @param {Object} params - Key is a property of `body` need to validate, value is the expected type for `key`
 * @returns {Object} it has a property include all errors' message when occur error, otherwise return null.
 */

let _ = require('lodash');

module.exports = (body, params) => {
  let errArr = [];
  let validator = {
    'number': (key) => {
      body[key] = Number(body[key]);

      isNaN(body[key]) ? errArr.push({
        message: `Param \`${key}\` must be Number`,
        type: 'Request Params Invalid',
        param: key,
        value: body[key]
      }) : null;
    },
    'boolean': (key) => {
      if (typeof body[key] === 'string' && body[key].toLowerCase() === 'true') {
        body[key] = Boolean(true);
      } else if (typeof body[key] === 'string' && body[key].toLowerCase() === 'false') {
        body[key] = Boolean(false);
      }

      typeof body[key] !== 'boolean' ? errArr.push({
        message: `Param \`${key}\` must be Boolean`,
        type: 'Request Params Invalid',
        param: key,
        value: body[key]
      }) : null;
    },
    'enum': (key, checkValue) => {
      checkValue.indexOf(body[key]) === -1 ? errArr.push({
        message: `Value of param \`${key}\` must be in [ ${checkValue} ]`,
        type: 'Request Params Invalid',
        param: key,
        value: body[key]
      }) : null;
    },
    'required': (key) => {
      !body[key] ? errArr.push({
        message: `Param \`${key}\` is Required`,
        type: 'Request Params Invalid',
        param: key
      }) : null;
    },
    'date': (key) => {
      (new Date(body[key])).toString() === 'Invalid Date' ? errArr.push({
        message: `Param \`${key}\` is not invalid date`,
        type: 'Request Params Invalid',
        param: key,
        value: body[key]
      }) : null;
    },
    'regexp': (key, checkValue) => {
      !checkValue.test(body[key]) ? errArr.push({
        message: `Param \`${key}\` is invalid`,
        type: 'Request Params Invalid',
        param: key,
        value: body[key]
      }) : null;
    }
  };

  let validate = (value, key, checkValue) => {
    let checkFn = validator[value.toLowerCase()];

    if (checkFn) {
      checkFn(key, checkValue);
    } else {
      /* eslint-disable */
      console.warn(`The type \`${value}\`of request params \`${key}\` waited to  is in supported list!`);
      /* eslint-enable */
    }
  };

  _.map(params, (paramValue, paramName) => {
    if (typeof paramValue === 'object') {

      if (paramValue instanceof RegExp) {
        validate('regExp', paramName, paramValue);
      } else if (Array.isArray(paramValue)) {
        validate('enum', paramName, paramValue);
      } else {
        validate(paramValue['type'], paramName, paramValue['values']);
      }

    } else {
      validate(paramValue, paramName);
    }
  });

  return errArr.length === 0 ? null : {
    status: 400,
    message: errArr
  };
};
