App.RecetasNewController = Ember.ObjectController.extend({
	actions: {
		close: function() {
			this.transitionTo('recetas');
		}
	}
});
