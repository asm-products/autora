import Ember from 'ember';

export default Ember.Component.extend({
	//Tags
	tags: [],
	// rightColSize: Ember.computed('tags.length', function(){
	// 	return 'col-sm-'+parseInt(12 - 3*this.get('tags.length')); 
	// }),
	newTagAdd: Ember.computed('newTag','canAddTags', function(){
		var newTag = this.get('newTag');
		var regex = /^.+\ $/;
		if(this.get('spacelessTag') !== '' && this.get('canAddTags')){
			if(regex.test(newTag)){
				newTag = newTag.substring(0, newTag.length -1); //remove the space at the end
				this.get('tags').pushObject(newTag);
				this.set('newTag','');
			}
		}
	}),
	noTagsAdded: Ember.computed.equal('tags.length', 0),
	newTag: '',
	spacelessTag: Ember.computed('newTag', function(){
		return this.get('newTag').replace(/ /g,'');
	}),
	canAddTags: Ember.computed.lt('tags.length', 5),

	actions: {
		deleteTag(tag){
			this.get('tags').removeObject(tag);
		},
		addTag(){
			var newTag = this.get('spacelessTag');
			if(newTag !== '' && this.get('canAddTags')){
				this.get('tags').pushObject(newTag);
				this.set('newTag','');
			}
			
		}
	}
});
