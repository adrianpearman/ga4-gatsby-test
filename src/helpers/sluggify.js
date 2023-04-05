const sluggify = (string) => {
  return string
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/\s+/g, '-');
};

export default sluggify;
