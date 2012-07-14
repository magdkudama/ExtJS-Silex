Ext.define('CRUD.view.usuario.Window', {

	extend: 'Ext.window.Window',
	title: 'Añadir registro',
	width: 400,
	height: 200,
	layout: 'fit',
	autoShow: true,
	modal: true,
	alias: 'widget.usuarioadd',

	initComponent: function(){
		this.items = [
			Ext.widget('usuarioform')
		];

		this.callParent(arguments);
	}

});