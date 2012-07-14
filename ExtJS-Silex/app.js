Ext.application({
    name: 'CRUD',
    autoCreateViewport: true,
    
    models: ['Usuario'],
    stores: ['Usuarios'],
    controllers: ['Usuario']
});