App.NewController = Ember.ObjectController.extend({
	actions: {
		close: function() {
			this.transitionTo('index');
		},
		guardar: function() {
			var self = this;
			var newNombre = $('#nombre').val(),
				newIngredientes = $('#ingredientes').val(),
				newInstrucciones = $('#instrucciones').val(),
				newTiempo = $('#tiempo').val(),
				newRendimiento = $('#rendimiento').val();
				newImagenUrl = $('#imagen').val();
			var receta = this.store.createRecord('receta', {
				nombre: newNombre,
				ingredientes: newIngredientes,
				preparacion: newInstrucciones,
				tiempoPrep: newTiempo,
				rendimiento: newRendimiento
			});
			var imagen = this.store.createRecord('imagen', {
				url: newImagenUrl
			});
			receta.get('imagenes').pushObject(imagen);
			receta.save().then(function() {
				imagen.set('receta', receta);
				imagen.save().then(function () {
					self.transitionToRoute('recetas');
				});
			});
		}
	}
});
