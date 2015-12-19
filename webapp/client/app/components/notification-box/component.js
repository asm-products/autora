import Ember from 'ember';

const {computed, inject} = Ember;

export default Ember.Component.extend({
	classNames: ['notification-box'],
	classNameBindings: ['hideNotifications:hidden-animated'],

	hideNotifications: computed.not('showNotifications'),
	session: inject.service('session'),

	subscriptions: computed.alias('session.sortedSubscriptions')
});
