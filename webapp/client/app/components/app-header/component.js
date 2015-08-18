import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['app-header'],
    tagName: 'header',
    showDropdown: false,

    actions: {
    	// toggleDropdown(){
    	// 	console.log('clickity click?');
    	// 	this.toggleProperty('showDropdown');
    	// }
    }
});
