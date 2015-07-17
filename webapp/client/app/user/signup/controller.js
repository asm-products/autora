import Ember from 'ember';
import config from '../../config/environment';


export default Ember.Controller.extend({
	email: '',
	password: '',
	password2: '',
	name: '',
	alert: '',

	passwordsDontMatch: Ember.computed('password', 'password2', function(){
		return (this.get('password') !== this.get('password2') && this.get('password2') !== ''); 
	}),

	actions: {
		sendSignUpForm: function(){
			var self = this;
			var ref = new Firebase(config.firebase);
			ref.createUser({
			  email    : this.get('email'),
			  password : this.get('password')
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			    self.set('alert', {
			    	type: 'danger',
			    	message: error
			    });
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			    //ToDO: Create new profile and save it
			    var newUserData = self.getProperties('email', 'password', 'name');
			    newUserData.id = userData.uid;
			    self.store.createRecord('user',newUserData).save().then(function(){
				    self.set('alert', {
				    	type: 'success',
				    	message: 'You have a profile now! Congratz!'
				    });
			    });
			    // store.createRecord({});
			  }
			});
		}
	}
});
