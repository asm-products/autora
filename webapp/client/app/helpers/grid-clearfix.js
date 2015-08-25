import Ember from 'ember';

export function gridClearfix(params, hash) {
	var n = params[0];
	var output = "";

	if(n !== 0){
		if(n%4 === 0){
			output = output+'<div class="clearfix visible-lg"></div>';
		}
		if(n%3 === 0){
			output = output+'<div class="clearfix visible-md"></div>';
		}
		if(n%2 === 0){
			output = output+'<div class="clearfix visible-sm"></div>';
		}
		// console.log(output);
	}
		// console.log('Entry n:'+n);
		// console.log(output);
		return Ember.String.htmlSafe(output);
}

export default Ember.Helper.helper(gridClearfix);
