import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Service.extend({
	store: inject.service('store')
});
