import Ember from 'ember';

export default Ember.Controller.extend({
	coverPhoto: Ember.computed('model.cover', function () {
        return this.get('model.cover') || 'https://pbs.twimg.com/profile_banners/2870366753/1422565411/1500x500';
    })
});
