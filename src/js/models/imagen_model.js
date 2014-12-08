App.Imagen = DS.Model.extend({
	url: DS.attr('string'),
	receta: DS.belongsTo('receta')
});

Ember.Inflector.inflector.irregular('imagen', 'imagenes');
