Ext.define('CRUD.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    
    requires: [
        'CRUD.view.usuario.Form',
        'CRUD.view.usuario.Grid',
        'CRUD.view.usuario.Window'
    ],
    
    initComponent: function() {

        this.items = {
            layout: {
                type: 'border',
                align: 'stretch'
            },
            items: [{
                region: 'west',
                collapsible: true,
                title: 'Menú',
                width: 150,
                split: true
            }, {
                region: 'south',
                title: 'Panel inferior',
                collapsible: true,
                split: true,
                height: 100,
                minHeight: 100
            }, {
                region: 'east',
                title: 'Panel lateral',
                collapsible: true,
                split: true,
                width: 150
            }, {
                region: 'center',
                xtype: 'tabpanel',
                activeTab: 0,
                items: {
                    title: 'Usuarios',
                    xtype: 'gridusuarios'
                }
            }]
        };
        this.callParent();
    }
});