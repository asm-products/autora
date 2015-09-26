import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('social-row', 'Integration | Component | social row', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{social-row}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#social-row}}
      template block text
    {{/social-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
