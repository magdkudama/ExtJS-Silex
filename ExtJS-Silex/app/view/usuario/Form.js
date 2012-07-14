Ext.define('CRUD.view.usuario.Form', {

	extend: 'Ext.form.Panel',
	requires: ['Ext.form.Field'],
	defaultType: 'textfield',
	defaults: {
		allowBlank: false,
		labelAlign: 'left',
		labelWidth: 150
	},
	alias: 'widget.usuarioform',

	padding: 10,
	style: 'background-color: #fff;',
	border: false,

	initComponent: function(){

		this.items = [
			{
				name: 'nombre',
				fieldLabel: 'Nombre'
			},
			{
				name: 'email',
				fieldLabel: 'Email',
				vtype: 'email'
			},
			{
				name: 'fecha_alta',
				fieldLabel: 'Fecha de alta',
				xtype: 'datefield',
				format: 'd/m/Y'
			}
		];

		this.bbar = [
			{
				text: 'Guardar',
				action: 'save',
				itemId: 'salvar',
				iconCls: 'save'
			}
		];
			
		this.callParent(arguments);
	}
});