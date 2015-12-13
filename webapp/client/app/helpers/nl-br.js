import Ember from 'ember';

export function nlBr(params) {
	
	if(typeof params[0] === 'string' || typeof params[0] === 'object'){
	  var text = params[0]; //strip html tags manually
	  var breakTag = '<br />';

	  return new Ember.String.htmlSafe((text + '').replace(/[\r\n]+/g, "\r\n").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'));
	
		}
}

export default Ember.Helper.helper(nlBr);
