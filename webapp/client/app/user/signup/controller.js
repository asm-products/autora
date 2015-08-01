import Ember from 'ember';
import config from '../../config/environment';
import Firebase from 'firebase';


export default Ember.Controller.extend({
	email: '',
	password: '',
	password2: '',
	username: '',
	alert: '',
	isLoading: false,

	isReadyToSend: Ember.computed('username','password', function(){
		var username = this.get('username');
		var isNOTEmpty = username !== '';
		var isAlphanumeric = /^[\w]+$/i.test(username);

		var password = this.get('password');
		var isPasswordLongEnough = password.length > 3;

		if(!isAlphanumeric) this.set('alert', {type: 'danger', message: 'Username can contain letters and numbers only!'});
		if(!isPasswordLongEnough) this.set('alert', {type: 'danger', message: 'Password is too short. Make it at least 4 characters!'});
		if(!isNOTEmpty) this.set('alert', {type: 'danger', message: 'Username can\'t be empty!'});

		//Basicly checking only username here, password and email is checked on the server by firebase
		return isNOTEmpty && isAlphanumeric && isPasswordLongEnough;
	}),

	actions: {
		sendSignUpForm: function(){
			if(this.get('isReadyToSend')){

				var self = this;
				var ref = new Firebase(config.firebase);
				self.set('isLoading', true);

				var email = this.get('email');
				var password = this.get('password');

				ref.createUser({
				  email    : email,
				  password : password
				}, function(error, userData) {
				  if (error) {
					self.set('isLoading', false);
				    console.log("Error creating user:", error);
				    self.set('alert', {
				    	type: 'danger',
				    	message: error
				    });
				  } else {

				    var newUserData = self.getProperties('email', 'username');
				    newUserData.id = userData.uid;

				    newUserData.set('createdAt', Firebase.ServerValue.TIMESTAMP);
					newUserData.set('updatedAt', Firebase.ServerValue.TIMESTAMP);

				    self.store.createRecord('user',newUserData).save().then(function(){
					    // self.transitionToRoute('index');

					    self.setProperties({
					    	username: '',
					    	password: '',
					    	email: '',
					    	alert: {
					    		type: 'success',
					    		message: 'Your account has been created successfuly.'
					    	}
					    });

					    //Lets login the user after sign up
					    self.get('session').authenticate('authenticator:firebase', {
			                'email': email,
			                'password': password
			            }).then(function(){
			            	// self.set('isLoading')
			            });



				    });
				    // store.createRecord({});
				  }
				});
			}
		},

		transitionBack: function(){
            window.history.back();
        }
	}
});
