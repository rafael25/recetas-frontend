App.RecetaView = Ember.View.extend({
	didInsertElement: function() {
		var modal = this.$('#receta-modal');
		var view = this;
		modal.foundation('reveal');
		modal.foundation('reveal', 'open');
		modal.on('close', function () {
			view.controller.send('close');
		});
	}
});
