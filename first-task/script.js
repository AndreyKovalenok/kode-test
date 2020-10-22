const getObjectProperty = (obj, path, defaultValue) => {
  const splitPath = path.split('.'); 
  const key = splitPath[0];
  if (splitPath.length === 1) {
    return obj[key] || defaultValue || undefined;
  } else if (key in obj)  {
    splitPath.shift();
    return getObjectProperty(obj[key], splitPath.join('.'), defaultValue);
  } else {
    return defaultValue || undefined;
  }
}

const obj = {
  'pupa': {
    'lupa': {
      'beep': 'boop',
    },
    'foo': 'bar',
  },
};

console.log(getObjectProperty(obj, "pupa.lupa")); // > { beep : 'boop' }
console.log(getObjectProperty(obj, "pupa.lupa.beep")); // > 'boop'
console.log(getObjectProperty(obj, "pupa.foo")); // > 'bar'
console.log(getObjectProperty(obj, "pupa.ne.tuda")); // > undefined
console.log(getObjectProperty(obj, "pupa.ne.tuda", true)); // > true
console.log(getObjectProperty(obj, "pupa.ne.tuda", "Default value")) // > 'Default value'