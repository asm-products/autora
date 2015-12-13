import Ember from 'ember';

const {computed} = Ember;

export default Ember.Controller.extend({
	entriesSorting: ['initialAmountOfLikes:desc'],
	sortedEntries: computed.sort('competingEntries', 'entriesSorting'),
	
	competingEntries: computed('model.pile.competingEntries', function(){
		return this.get('model.pile.competingEntries').without(this.get('model'));
	}),
});
