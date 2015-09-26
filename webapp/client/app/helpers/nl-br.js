import Ember from 'ember';

export function nlBr(params) {
  var text = params[0];
   var breakTag = '<br />';

  return new Ember.String.htmlSafe((text + '')
    .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'));
}

export default Ember.Helper.helper(nlBr);
