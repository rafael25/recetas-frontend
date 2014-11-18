App.RecetasNewView = Ember.View.extend({
	didInsertElement: function() {
		var modal = this.$('#add-btn-modal');
		var view = this;
		modal.foundation('reveal');
		modal.foundation('reveal', 'open');
		modal.on('close', function () {
			view.controller.send('close');
		});
	}
});