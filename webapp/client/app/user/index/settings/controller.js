import Ember from 'ember';
import config from '../../../config/environment';
import Firebase from 'firebase';

const {inject} = Ember;

export default Ember.Controller.extend({

	oldPassword: '',
	newPassword: '',
	changePasswordAlert: {},
	changePasswordLoading: false,

	newEmail: '',
	passwordForEmail: '',
	changeEmailAlert: {},
	changeEmailLoading: false,

	session: inject.service('session'),


	actions: {
		userPhotoUploadDone(file){
			this.set('session.user.photo', file);
			this.get('session.user.content').save();
		},
		coverPhotoUploadDone(file){
			this.set('session.user.cover', file);
			this.get('session.user.content').save();
		},
		changePassword(){

				this.set('changePasswordLoading', true);
				var ref = new Firebase(config.firebase);
				ref.changePassword({
					email: this.get('session.user.email'),
					oldPassword: this.get('oldPassword'),
					newPassword: this.get('newPassword'),
				}, error => {
					this.setProperties({changePasswordLoading: false, oldPassword: '', newPassword: ''});
					
					if (error) {
					    switch (error.code) {
					      case "INVALID_PASSWORD":
					       		this.set('changePasswordAlert.message','The specified user account password is incorrect.');
					       		this.set('changePasswordAlert.type','danger');
					        break;
					      case "INVALID_USER":
						        this.set('changePasswordAlert.message','The specified user account does not exist.');
						       	this.set('changePasswordAlert.type','danger');
					        break;
					      default:
					        	this.set('changePasswordAlert.message','Error changing password:', error);
						       	this.set('changePasswordAlert.type','danger');

					    }
					  } else {
					    this.set('changePasswordAlert.message','User password changed successfully!');
						this.set('changePasswordAlert.type','success');

					  }
				});
		},
		changeEmail(){

			this.set('changeEmailLoading', true);
			var ref = new Firebase(config.firebase);
			var newEmail = this.get('newEmail');
			ref.changeEmail({
			  oldEmail: this.get('session.user.email'),
			  newEmail: newEmail,
			  password: this.get('passwordForEmail'),
			}, error => {
			  this.setProperties({changeEmailLoading: false, passwordForEmail: '', newEmail: ''});
			  if (error) {
			    switch (error.code) {
			      case "INVALID_PASSWORD":
			        this.set('changeEmailAlert.message', 'The specified user account password is incorrect.');
			        this.set('changeEmailAlert.type', 'danger');
			        break;
			      case "INVALID_USER":
			        this.set('changeEmailAlert.message', 'The specified user account does not exist.');
			        this.set('changeEmailAlert.type', 'danger');

			        break;
			      default:
			        this.set('changeEmailAlert.message', 'Error changing email:', error);
			        this.set('changeEmailAlert.type', 'danger');

			    }
			  } else {
			  	var currentUser = this.get('session.user');
			  	currentUser.set('email', newEmail);
			  	this.set('changeEmailLoading', true);
			  	currentUser.get('content').save().then(() => {
			  		this.set('changeEmailLoading',false);
				    this.set('changeEmailAlert.message', 'User email changed successfully!');
				    this.set('changeEmailAlert.type', 'success');
			  	}, function(error){
			  		this.set('changeEmailLoading',false);
				    this.set('changeEmailAlert.message', 'There has been trouble saving the new email address. Please contact us! Error: '+error);
				    this.set('changeEmailAlert.type', 'danger');
			  	});

			  }
			});
		}
	}
});
