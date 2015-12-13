import Ember from 'ember';
import Firebase from 'firebase';
import config from 'client/config/environment';

export default Ember.Controller.extend({
	email: '',
	alert: {},
	isLoading: false,

	actions: {
		resetPassword(){
			this.set('isLoading', true);

			var ref = new Firebase(config.firebase);
			ref.resetPassword({
			  email: this.get('email'),
			}, error => {
			  this.set('isLoading', false);
			  if (error) {
			    switch (error.code) {
			      case "INVALID_USER":
			        this.set('alert.message', 'The specified user account does not exist.');
			        this.set('alert.type', 'danger');
			        break;
			      default:
			        this.set('alert.message', 'Error resetting password:', error);
			        this.set('alert.type', 'danger');

			    }
			  } else {
			    this.set('alert.message', 'Password reset email sent successfully!');
			    this.set('alert.type', 'success');

			  }
			});
		}
	}
});
