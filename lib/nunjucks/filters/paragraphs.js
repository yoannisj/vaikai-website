var _ = require('lodash');

function addClassToTag(tag, classname) {
  var classStart = tag.indexOf('class="');

  // if tag has a 'class' attribute
  if (classStart >= 0) {
    // move at the end of 'class="'
    classStart = classStart + 7;

    // find existing classnames
    var classEnd = tag.indexOf('"', classStart);
    var cname = tag.slice(classStart, classEnd);

    // inject new classnames
    cname = cname.split(' ');
    cname = _.union(cname, classname.split(' '));
    cname = cname.join(' ');

    // replace old class attribute with new one
    return tag.slice(0, classStart) + cname + tag.slice(classEnd);
  }

  // add a new 'class' attribute to tag
  return tag + ' class="' + classname + '"';
}

// helper function that adds a given classname to a given tag
function addClassToTags(str, tagname, classname) {
  var tagOpen = '<' + tagname;
  var tagStart = str.indexOf(tagOpen);

  while(tagStart >= 0) {
    var tagEnd = str.indexOf('>', tagStart);
    var tag = str.slice(tagStart, tagEnd);

    // add classname to tag
    tag = addClassToTag(tag, classname);

    // replace old tag in string with new one
    str = str.slice(0, tagStart) + tag + str.slice(tagEnd);

    // search for next tag
    tagStart = str.indexOf(tagOpen, tagEnd);
  }

  return str;
}

// helper function to wrap a piece of html content inside a 'p' tag
function wrapParagraph(str) {
  return str.indexOf('<p') >= 0 ? str : '<p>' + str + '</p>';
}

module.exports = function(env) {

  return function(str, classname) {
    // wrap html string into '<p>' tags
    str = wrapParagraph(str);

    // add given classname to '<p>' tags
    return classname ?  addClassToTags(str, 'p', classname) : str;
  };

};