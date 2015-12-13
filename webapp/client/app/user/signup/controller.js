import Ember from 'ember';
import config from '../../config/environment';
import Firebase from 'firebase';

const {computed} = Ember;


export default Ember.Controller.extend({
	email: '',
	password: '',
	password2: '',
	username: '',
	alert: '',
	isLoading: false,

	isReadyToSend: computed('username','password', function(){
		var username = this.get('username');
		var isNOTEmpty = username !== '';
		var isAlphanumeric = /^[\w]+$/i.test(username);

		var password = this.get('password');
		var isPasswordLongEnough = password.length > 3;

		if (!isAlphanumeric) {
			this.set('alert', {type: 'danger', message: 'Username can contain letters and numbers only!'});
		}

		if (!isPasswordLongEnough) {
			this.set('alert', {type: 'danger', message: 'Password is too short. Make it at least 4 characters!'});
		}

		if (!isNOTEmpty) {
			this.set('alert', {type: 'danger', message: 'Username can\'t be empty!'});
		}

		//Basicly checking only username here, password and email is checked on the server by firebase
		return isNOTEmpty && isAlphanumeric && isPasswordLongEnough;
	}),

	actions: {
		sendSignUpForm(){

			if(this.get('isReadyToSend')){
				this.set('isLoading', true);

				var ref = new Firebase(config.firebase);

				var email = this.get('email');
				var password = this.get('password');

				ref.createUser({
				  email    : email,
				  password : password
				}, (error, userData) => {
				  if (error) {
					this.set('isLoading', false);
				    console.log("Error creating user:", error);
				    this.set('alert', {
				    	type: 'danger',
				    	message: error
				    });
				  } else {

				    var newUserData = this.getProperties('email', 'username');
				    newUserData.id = userData.uid;

				    newUserData.createdAt = Firebase.ServerValue.TIMESTAMP;
					newUserData.updatedAt = Firebase.ServerValue.TIMESTAMP;

				    this.store.createRecord('user',newUserData).save().then(() => {
					    // this.transitionToRoute('index');

					    this.setProperties({
					    	username: '',
					    	password: '',
					    	email: '',
					    	alert: {
					    		type: 'success',
					    		message: 'Your account has been created successfuly.'
					    	}
					    });

					    //Lets login the user after sign up
					    this.get('session').authenticate('authenticator:firebase', {
			                'email': email,
			                'password': password
			            }).then(function(){
			            	// this.set('isLoading')
			            });



				    });
				    // store.createRecord({});
				  }
				});
			}
		},

		transitionBack(){
            window.history.back();
        }
	}
});
