Ext.define('Ares.view.MenuPanel', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.menuPanel',

    itemId: 'menuPanel',
    title: 'Menu',

    initComponent: function () {
        this.items = [
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
                        target: 'reservation',
                        hidden: !Ares.CONFIG.hasPermission('reservation')
                    },
                    {
                        xtype: 'menuitem',
                        text: 'Planes',
                        glyph: 'xf072@FontAwesome',
                        target: 'plane',
                        hidden: !Ares.CONFIG.hasPermission('plane')
                    },
                    {
                        xtype: 'menuitem',
                        text: 'User',
                        glyph: 'xf007@FontAwesome',
                        target: 'user',
                        hidden: !Ares.CONFIG.hasPermission('user')
                    },
                    {
                        xtype: 'menuitem',
                        text: 'Monitoring',
                        glyph: 'xf080@FontAwesome',
                        target: 'monitoring',
                        hidden: !Ares.CONFIG.hasPermission('monitoring')
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});