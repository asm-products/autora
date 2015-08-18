import Ember from 'ember';

export default Ember.Component.extend({
	//Tags
	tags: [],
	// rightColSize: Ember.computed('tags.length', function(){
	// 	return 'col-sm-'+parseInt(12 - 3*this.get('tags.length')); 
	// }),
	newTagAdd: Ember.computed('newTag',function(){
		var newTag = this.get('newTag');
		var regex = /^.+\ $/;
		if(regex.test(newTag)){
			this.get('tags').pushObject(newTag);
			this.set('newTag','');
		}
	}),
	newTag: '',

	actions: {
		deleteTag(tag){
			this.get('tags').removeObject(tag);
		},
		addTag(){
			this.get('tags').pushObject(this.get('newTag'));
			this.set('newTag','');
			
		}
	}
});
