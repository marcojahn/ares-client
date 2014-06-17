Ext.define('Ares.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ares.view.main.MainController',
        'Ares.view.main.MainModel',
        'Ext.layout.container.Border',
        'Ext.tab.Panel',
        'Ares.view.user.User'
    ],

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: 'border',

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
                    bind: 'Ares Client', // TODO binding - config
                    flex: 1
                },
                {
                    xtype: 'component',
                    id: 'app-header-username',
                    cls: 'app-header-text',
                    bind: '{currentUser.firstname} {currentUser.lastname}',
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
            xtype: 'tabpanel',
            region: 'center',
            flex: 1,
            reference: 'main',

            ui: 'navigation',
            cls: 'app-menu-navigation',

            tabBarHeaderPosition: 0,
            titleRotation: 0,
            tabRotation: 0,
            headerPosition: 'left',

            defaults: {
                tabConfig: {
                    iconAlign: 'left',
                    textAlign: 'left',
                    flex: 0
                },
                bodyPadding: 10
            },

            activeTab: 3,

            items: [
                {
                    // This page has a hidden tab so we can only get here during initialization. This
                    // allows us to avoid rendering an initial activeTab only to change it immediately
                    // by routing
                    xtype: 'component',
                    tabConfig: {
                        hidden: true
                    }
                },
                {
                    title: 'Reservation',
                    glyph: 'xf0e0@FontAwesome',
                    html: 'Another one'
                },
                {
                    title: 'Planes',
                    glyph: 'xf072@FontAwesome',
                    html: 'A simple tab'
                },
                {
                    title: 'User',
                    glyph: 'xf007@FontAwesome',
                    xtype: 'userpanel'
                },
                {
                    title: 'Monitoring',
                    glyph: 'xf080@FontAwesome',
                    html: 'Another one'
                }
            ]
        }
    ]
});