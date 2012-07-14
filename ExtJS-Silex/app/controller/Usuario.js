Ext.define('CRUD.controller.Usuario',{
	extend: 'Ext.app.Controller',

	views: ['usuario.Grid', 'usuario.Form', 'usuario.Window'],
	models: ['Usuario'],
	stores: ['Usuarios'],

	refs: [
        {
            ref: 'list',
            selector: 'gridusuarios'
        }
    ],

	init: function() {
		this.control({
            'gridusuarios button[action=add]': {
                click: this.add
            },
            'gridusuarios button[action=delete]': {
                click: this.destroy
            },
            'usuarioform button[action=save]': {
                click: this.save
            }
        });
	},

	add: function() {
		Ext.widget('usuarioadd');
	},

	save: function(btn){
		var me = this,
			form = btn.up('usuarioform'),
			win = form.up('window'),
			basicForm = form.getForm(),
			grid = me.getList(),
			store = grid.getStore(),
			record = basicForm.getRecord(),
			values = basicForm.getValues();

		
		if(basicForm.isValid()){
			if(!record) {
				record = Ext.create('CRUD.model.Usuario');
				record.set(values);
				store.add(record);
			} else record.set(values);

			win.close();
		} else Ext.Msg.alert('¡Alerta!','El formulario contiene errores. Por favor, vuelva a intentarlo');
	},

	destroy: function(){
		grid = this.getList();
		store = grid.getStore();
		records = grid.getSelectionModel().getSelection();

		if(records.length === 0) Ext.Msg.alert('¡Alerta!','No hay ninguna fila seleccionada');
		else {
			Ext.Msg.show({
                title : 'Confirmación',
                msg : '¿Está seguro de que desea borrar el registro seleccionado?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope : this,
                width : 400,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        store.remove(records);
                    }
                }
            });
		}
	}
});