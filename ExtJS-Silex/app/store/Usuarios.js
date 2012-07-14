Ext.define('CRUD.store.Usuarios',{
	extend		: 'Ext.data.Store',
	autoLoad	: true,
	autoSync	: true,
	storeId		: 'usuarios_id',
	pageSize	: 20,
	model		: 'CRUD.model.Usuario',
	proxy		: {
		type: 'rest',
		url: serverURI + 'usuario',
		actionMethods: {
			create  : 'POST',
		    read    : 'GET',
		    update  : 'PUT',
		    destroy : 'DELETE'
		},
		reader: {
			type: 'json',
			root: 'data',
			rootProperty: 'data',
			successProperty: 'success',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			writeAllFields: true
		}
	}  
});