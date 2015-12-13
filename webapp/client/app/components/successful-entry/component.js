import Ember from 'ember';

const {computed} = Ember;

export default Ember.Component.extend({

	classNames: ['successful-entry'],
	classNameBindings: ['inline'],

	isLast: computed('model', function(){  //could be Optimized
		return this.get('model.id') === this.get('model.project.entries.lastObject.id');
	}),

	shouldDisplayLineBreakSymbol: computed('isLast','entryContent', function(){
		//ends with /n
		var content = this.get('entryContent').string;
		if(content){
			return this.get('isLast') && content.substr(content.length - 4,4) === '<br>';
		}
	}),
	
    entryContent: computed('model.content', function() {
        var entry = this.get('model.content') || '';
        return new Ember.Handlebars.SafeString(entry.replace(/\n/g, '<br>'));
    })
});
