Ext.define('Ares.view.user.User', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ares.view.user.UserController',
        'Ares.view.user.UserModel',
        'Ares.view.user.UserGrid',
        'Ares.view.user.UserForm'
    ],

    viewModel: {
        type: 'usermodel'
    },

    alias: 'widget.userpanel',

    controller: 'user',

    session: true,

    items: [
        {
            xtype: 'usergrid',
            bind: '{users}',
            listeners: {
                userdelete: 'onUserDelete'
            },
            reference: 'usergrid'
        },
        {
            xtype: 'userform',
            reference: 'userform'
        }
    ]
});