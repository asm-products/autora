import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'}, function(){
    this.route('about');
    this.route('how-it-works');
  });
  this.route('project', function() {
    this.route('create');
    this.route('list');

    this.route('index',{path: '/:project_id'}, function() {
      this.route('new-entry');
      this.route('entries');
    });
  });
  this.route('user', function() {
    this.route('signup');
    this.route('login');
    this.route('welcome');
    this.route('index',{path: '/:user_id'}, function() {
      this.route('settings');
      this.route('about');
      this.route('how-it-works');
    });
    this.route('logout');
  });
  this.route('entry',{path: '/:entry_id'}, function() {});
  this.route('dashboard', function() {});
});

export default Router;
