import Ember from 'ember';

export function gridClearfix(params, hash) {
	var n = params[0] + 1;
	console.log(n);
	var output = "";
	if(n !== 0){
		if(n%5 === 0){
			output = output+'<div class="clearfix visible-lg"></div>';
		}
		if(n%4 === 0){
			output = output+'<div class="clearfix visible-md"></div>';
		}
		if(n%3 === 0){
			output = output+'<div class="clearfix visible-sm"></div>';
		}
		console.log(output);
		return Ember.String.htmlSafe(output);
	}
}

export default Ember.Helper.helper(gridClearfix);
