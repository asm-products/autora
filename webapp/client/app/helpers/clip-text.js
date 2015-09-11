import Ember from 'ember';

export function clipText(params) {
  var text = params[0];
  var maxlength = params[1];
  if(text.length > maxlength + 3){
  	return text.substr(0,maxlength)+'...';
  } else {
  	return text;
  }
  // return params;
}

export default Ember.Helper.helper(clipText);
