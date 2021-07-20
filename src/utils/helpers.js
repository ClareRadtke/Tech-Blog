// TODO: create function to convert CreatedAt timestamp to be date only for display on the articles and comments

module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};
