// TODO: create function to convert CreatedAt timestamp to be date only for display on the articles and comments

module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  content_restriction: (content) => {
    console.log("running contentRestriction");
    const regex = /([\.|\?|\!])([\r\n])/;
    let paraEnd = content.indexOf(regex);
    console.log(paraEnd);
    // paraEnd = paraEnd + 1;
    // console.log(paraEnd);
    const displayContent = content.slice(0, paraEnd);
    return displayContent;
  },
};

// TODO need to add in whitespace to the returned contents
// Regex
// ([\.|\?|\!]) Match this character . or ? or !
// ([\r\n]) checks after prior expression for characters that are a carriage return or line feed (not a word or alphanumeric)
