import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('textarea-with-counter', 'Integration | Component | textarea with counter', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{textarea-with-counter}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#textarea-with-counter}}
      template block text
    {{/textarea-with-counter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
