import Ember from 'ember';

const {computed, inject, $} = Ember;

export default Ember.Component.extend({

	tagName: 'button',
	classNames: ['badge', 'inline-block','notification-button'],
	classNameBindings: ['newNotifications:red'],

	showNotifications: false,

	newNotifications: computed.gt('session.unseenSubscriptions.length', 0),
	session: inject.service('session'),
	subscriptions: computed.alias('session.subscriptions'),
	

	notificationsToggled(){
		var $app = $('#app');

		if(!this.get('showNotifications')){
			this.get('subscriptions').forEach(subscription => {
				subscription.set('isSeen', true);
				// subscription.set('cachedNotification', subscription.get('notification'));
				subscription.set('cachedSubModelLastCreatedAt', subscription.get('subModelLastCreatedAt'));
				subscription.save();
			});

			this.set('showNotifications', true);
		} else {
			this.set('showNotifications', false);

		}	
	},

	didInsertElement(){
		var $app = $('#app');

		$('.page-wrapper').click(() => {
            if(this.get('showNotifications')){
			
			this.set('showNotifications', false);
            }
        });
	},

	click(){

		// if(this.get('showNotifications')){
			this.notificationsToggled();
		// }
	}
});
