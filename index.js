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
  return array.filter(item => !Object.prototype.hasOwnProperty.call(item, property));
};

exports.sumDeep = (array) => {
  return array.map((item) => {
    const result = { ...item };
    Object.keys(result).forEach((key) => {
      const sum = result[key].reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.val, 10);
      }, 0);
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
  return { ...defaults, ...object };
};

exports.fetchUserByNameAndUsersCompany = async (name, service) => {
  const result = {};

  await service.fetchStatus().then((status) => {
    result.status = { ...status };
  });

  await service.fetchUsers().then(async (users) => {
    const index = users.findIndex(user => user.name === name);
    if (index > -1) {
      const user = users[index];
      result.user = { ...user };

      await service.fetchCompanyById(user.companyId).then((company) => {
        result.company = { ...company };
      });
    }
  });

  return result;
};
