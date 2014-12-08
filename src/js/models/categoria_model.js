App.Categoria = DS.Model.extend({
	nombre: DS.attr('string'),
	recetas: DS.hasMany('receta')
});

Ember.Inflector.inflector.irregular('categoria', 'categorias');
