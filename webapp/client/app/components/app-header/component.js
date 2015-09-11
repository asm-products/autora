import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['app-header'],
    tagName: 'header',
    showDropdown: false,
    action: 'toggleCreate',

    actions: {
    	// toggleDropdown(){
    	// 	console.log('clickity click?');
    	// 	this.toggleProperty('showDropdown');
    	// }

    	toggleCreate(){
    		this.sendAction();
    	}
    }
});
