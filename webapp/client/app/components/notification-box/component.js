import Ember from 'ember';
import UIDropdown from '../ui-dropdown/component';

export default UIDropdown.extend({
	classNames: ['notifications'],
	isOpen: false,

	actions: {
		toggleBox(){
			this.toggleProperty('isOpen');
		}
	}
});
