Ext.define('Ares.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',

    requires: [
        'Ext.layout.container.Border',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ares.view.ContentTabPanel',
        'Ares.view.MenuPanel'
    ],

    items: [
        {
            xtype: 'container',
            id: 'app-header',
            region: 'north',
            height: 52,
            layout: {
                type: 'hbox',
                align: 'middle'
            },

            items: [
                {
                    xtype: 'component',
                    id: 'app-header-logo'
                },
                {
                    xtype: 'component',
                    cls: 'app-header-text',
                    html: 'Ares Client',
                    flex: 1
                },
                {
                    xtype: 'component',
                    id: 'app-header-username',
                    cls: 'app-header-text',
                    html: '',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'button',
                    cls: 'app-header-button',
                    glyph: 'xf011@FontAwesome',
                    text: 'Logout',
                    margin: '0 10 0 0',
                    action: 'logout'
                }
            ]
        },
        {
            region: 'west',
            split: true,
            border: '0 2 0 0',
            width: 150,
            bodyBorder: false,
            collapseDirection: 'left',
            collapsible: true,
            xtype: 'menuPanel'
        },
        {
            xtype: 'contenttabpanel',
            region: 'center',
            split: true
        }
    ],

    initComponent: function () {

        this.on('afterrender', function () {
            Ext.ComponentQuery.query('#app-header #app-header-username')[0].update(
                    (Ares.CONFIG.CURRENT_USER.firstname || '') + ' ' + (Ares.CONFIG.CURRENT_USER.lastname || '')
                    + ' (' + (Ares.CONFIG.CURRENT_USER.username || '') + ')');
        });

        this.callParent(arguments);
    }
});