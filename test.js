let str = "12345.00";
str = str.slice(4); 
console.log(str);

const queryString = require('query-string');
console.log(location.search);

const parsed = queryString.parse(location.search);
console.log(parsed);