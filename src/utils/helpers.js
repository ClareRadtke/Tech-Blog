const { SafeString } = require("handlebars");

module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  content_restriction: (content) => {
    // Regex explanation
    // ([\.|\?|\!]) Match this character . or ? or !
    // ([\r\n]) checks after prior expression for characters that are a carriage return or line feed (not a word or alphanumeric)
    const regex = /([\.|\?|\!])([\r\n])/;
    const paraEnd = content.search(regex);
    const displayContent = content.slice(0, paraEnd + 1).replace(/\n/g, "<br>");
    return new SafeString(displayContent);
  },
};
