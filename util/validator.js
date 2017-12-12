/**
 * Created by tyt on 2017/7/24.
 */

let _ = require('lodash');

/**
 * Request params validator.
 * @param {Object} body - An object need to validate
 * @param {Object} params - Key is a property of `body` need to validate, value is the expected type for `key`
 * @returns {Object} it has a property include all errors' message when occur error, otherwise return null.
 */

module.exports = (body, params) => {
  let errArr = [];

  let validate = (value, key, enumFields) => {
    switch (value.toLowerCase()) {
    case 'number':
      body[key] = Number(body[key]);
      isNaN(body[key]) ? errArr.push({
        message: `Param \`${key}\` must be Number`,
        type: 'Request Params Invalid',
        param: key,
        value: body[key]
      }) : null;
      break;

    case 'boolean':
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
      break;

    /**
     * When you want to validate value whose type is `enum`,
     * the `params` can be:
     * { key: ['value'] } or
     * { key: { type: `enum`, values: [`enumValue`]}}
     */
    case 'enum':
      enumFields.indexOf(body[key]) === -1 ? errArr.push({
        message: `Value of param \`${key}\` must be in [ ${enumFields} ]`,
        type: 'Request Params Invalid',
        param: key,
        value: body[key]
      }) : null;
      break;

    case 'required':
      !body[key] ? errArr.push({
        message: `Param \`${key}\` is Required`,
        type: 'Request Params Invalid',
        param: key
      }) : null;
      break;
    }
  };

  _.map(params, (paramValue, paramName) => {
    if (typeof paramValue === 'object') {

      if (Array.isArray(paramValue)) {
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
