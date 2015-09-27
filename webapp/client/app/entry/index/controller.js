import Ember from 'ember';

export default Ember.Controller.extend({
	competingEntries: Ember.computed('model.pile.competingEntries', function(){
		return this.get('model.pile.competingEntries').without(this.get('model'));
	}),
	entriesSorting: ['initialAmountOfLikes:desc'],
	sortedEntries: Ember.computed.sort('competingEntries', 'entriesSorting'),
});
