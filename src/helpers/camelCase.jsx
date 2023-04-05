// CamelCase function adapted from one by Pranchal Katiyar via geeksforgeeks.org/
const camelCase = str => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

export default camelCase;
