Ext.define('Ares.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'border',

    requires: [
        'Ext.layout.container.Border',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ares.view.ContentTabPanel'
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
            xtype: 'panel',
            region: 'west',
            split: true,
            border: '0 2 0 0',
            itemId: 'menuPanel',
            width: 150,
            bodyBorder: false,
            collapseDirection: 'left',
            collapsible: true,
            title: 'Menu',
            items: [
                {
                    xtype: 'menu',
                    floating: false,
                    itemId: 'sideMenu',
                    items: [
                        {
                            xtype: 'menuitem',
                            text: 'Home',
                            glyph: 'xf015@FontAwesome',
                            target: 'home'
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Reservation',
                            glyph: 'xf0e0@FontAwesome',
                            target: 'reservation'
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Planes',
                            glyph: 'xf072@FontAwesome',
                            target: 'planes'
                        },
                        {
                            xtype: 'menuitem',
                            text: 'User',
                            glyph: 'xf007@FontAwesome',
                            target: 'user'
                        },
                        {
                            xtype: 'menuitem',
                            text: 'Monitoring',
                            glyph: 'xf080@FontAwesome',
                            target: 'monitoring'
                        }
                    ]
                }
            ]
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
                    Ext.state.Manager.get('firstname', '') + ' ' + Ext.state.Manager.get('lastname', '')
                    + ' (' + Ext.state.Manager.get('username') + ')');
        });

        this.callParent(arguments);
    }
});