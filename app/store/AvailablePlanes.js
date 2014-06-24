Ext.define('Ares.store.AvailablePlanes', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    storeId: 'AvailablePlanes',
    alias: 'store.AvailablePlanes',

    //model: 'Ares.model.User',
    fields: [
        '_id',
        'plane',
        'planetype'
    ],

    //pageSize: 25,

    autoLoad: false,
    autoSync: false,

    //remoteSort: true,

    //groupField: 'usergroup',

    proxy: {
        type: 'rest',
        url: Ares.CONFIG.URL.reservation.availablePlanes,
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'total'
        },
        sortParam: undefined,
        startParam: undefined,
        limitParam: undefined,
        pageParam: undefined,
        listeners: {
            exception: function (proxy, response, operation) {
                var errorMsg = 'Error',
                    error = Ext.JSON.decode(response.responseText);

                if (error.reason) {
                    errorMsg = (Ares.CONFIG.REASONS[error.reason]) ? Ares.CONFIG.REASONS[error.reason] : error.reason;
                }

                Ext.Msg.alert('Connection Error', errorMsg);
            }
        }
    }
});