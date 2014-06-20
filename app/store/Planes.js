Ext.define('Ares.store.Planes', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    storeId: 'PlaneStore',

    model: 'Ares.model.Plane',

    pageSize: 25,

    autoLoad: false,
    autoSync: false,

    remoteSort: true,

    groupField: 'planetype',

    proxy: {
        type: 'rest',
        url: Ares.CONFIG.URL.planes.url,
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