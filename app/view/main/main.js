Ext.define('Ares.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ares.view.main.MainController',
        'Ares.view.main.MainModel',
        'Ext.layout.container.Border'
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
                    id: 'app-header-logo'/*,
                    listeners: {
                        click: 'showBindInspector',
                        element: 'el'
                    }*/
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
                    listeners: {
                        click: 'onClickUserName',
                        element: 'el'
                    },
                    margin: '0 10 0 0'
                }
            ]
        },
        {
            //xtype: 'container',
            region: 'west',
            width: 250,
            split: true,
            collapsible: true,

            html: 'west'
        },
        {
            //xtype: 'container',
            region: 'center',
            flex: 1,

            html: 'center'
        }
    ]
});