Ext.define('Ares.store.Users', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    storeId: 'teststore',

    model: 'Ares.model.User',

    pageSize: 25,

    autoLoad: false,
    autoSync: false,

    remoteSort: true,

    proxy: {
        type: 'rest',
        url: Ares.CONFIG.URL.users.url,
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'total'
        }/*,
        sortParam: 'sort',
        startParam: 'start',
        limitParam: 'limit'*/

    }
});