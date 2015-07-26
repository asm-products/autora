import Ember from 'ember';

export default Ember.Component.extend({
	pickAction: 'pickEntry',
	actions: {
		pick: function(){
			console.log('pick called');
			this.sendAction('pickAction', this.get('model'));
		}
	}
});
