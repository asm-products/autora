import Ember from 'ember';
import Firebase from 'firebase';
import config from 'client/config/environment';

export default Ember.Controller.extend({
	email: '',
	alert: {},
	isLoading: false,

	actions: {
		resetPassword(){
			var ref = new Firebase(config.firebase);
			var self = this;
			this.set('isLoading', true);
			ref.resetPassword({
			  email: this.get('email'),
			}, function(error) {
			  self.set('isLoading', false);
			  if (error) {
			    switch (error.code) {
			      case "INVALID_USER":
			        self.set('alert.message', 'The specified user account does not exist.');
			        self.set('alert.type', 'danger');
			        break;
			      default:
			        self.set('alert.message', 'Error resetting password:', error);
			        self.set('alert.type', 'danger');

			    }
			  } else {
			    self.set('alert.message', 'Password reset email sent successfully!');
			    self.set('alert.type', 'success');

			  }
			});
		}
	}
});
