import Ember from 'ember';

const {inject, computed} = Ember;

export default Ember.Controller.extend({

	project: inject.controller('project'),
	filteredProjects: computed.filterBy('model', 'open', false)

});
