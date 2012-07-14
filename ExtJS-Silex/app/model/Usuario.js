Ext.define('CRUD.model.Usuario',{
	extend		: 'Ext.data.Model',
	fields		: ['id', 'nombre', 'email', 'fecha_alta'],
	idProperty	: 'id'
});