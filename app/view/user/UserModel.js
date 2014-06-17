Ext.define('Ares.view.user.UserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usermodel',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    stores: {
        users: {
            model: 'User',
            autoLoad: true,
            remoteFilter: true
        }
    },

    formulas: {
        user: {
            bind: {
                record: '{usergrid.selection}'
            },
            get: function (data) {
                return data.record;
            }
        }
    }
});
