/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, array) => {
  return array.map((item) => {
    const result = { ...item };
    properties.forEach((key) => {
      if (item[key]) {
        delete result[key];
      }
    });
    return result;
  });
};

exports.excludeByProperty = (property, array) => {
  return array.filter(item => item[property] === undefined);
};

exports.sumDeep = (array) => {
  return array.map((item) => {
    const result = { ...item };
    Object.keys(result).forEach((key) => {
      let sum = 0;
      const values = result[key];

      values.forEach((val) => {
        Object.keys(val).forEach((e) => {
          const data = val[e];
          if (Number.isInteger(data)) {
            sum += parseInt(data, 10);
          }
        });
      });

      result[key] = sum;
    });

    return result;
  });
};

exports.applyStatusColor = (colorMatch, array) => {
  return array.map((item) => {
    const result = { ...item };

    let color;
    Object.keys(colorMatch).forEach((key) => {
      if (colorMatch[key].includes(result.status)) {
        color = key;
      }
    });

    result.color = color;
    return result;
  }).filter(item => item.color !== undefined);
};

exports.createGreeting = (greetFunction, greeting) => {
  return name => greetFunction(greeting, name);
};

exports.setDefaults = defaults => (object) => {
  const result = { ...object };

  Object.keys(defaults).forEach((key) => {
    if (result[key] === undefined) {
      result[key] = defaults[key];
    }
  });
  return result;
};

exports.fetchUserByNameAndUsersCompany = async (name, service) => {
  const result = {};

  const status = await service.fetchStatus();
  result.status = status;

  const users = await service.fetchUsers();

  const index = users.findIndex(user => user.name === name);
  if (index > -1) {
    const user = users[index];
    result.user = user;

    const company = await service.fetchCompanyById(user.companyId);
    result.company = company;
  }
  return result;
};
