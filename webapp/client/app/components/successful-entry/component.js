import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['successful-entry'],
	classNameBindings: ['inline'],
	isLast: Ember.computed('model', function(){ //could be Optimized
		return this.get('model.id') === this.get('model.project.entries.lastObject.id');
	}),
	shouldDisplayLineBreakSymbol: Ember.computed('isLast','entryContent', function(){
		//ends with /n
		var content = this.get('entryContent').string;
		//console.log(content);
		if(content){
			return this.get('isLast') && content.substr(content.length - 4,4) === '<br>';
		}
	}),
    entryContent: Ember.computed('model.content', function() {
        var entry = this.get('model.content') || '';
        return new Ember.Handlebars.SafeString(entry.replace(/\n/g, '<br>'));
    })
});
