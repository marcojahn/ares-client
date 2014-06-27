Ext.define('Ares.store.Reservations', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.proxy.Rest'
    ],

    storeId: 'Reservations',
    alias: 'store.Reservations',

    model: 'Ares.model.Reservation',
    //pageSize: 25,

    autoLoad: false,
    autoSync: false,

    remoteFilter: true,
    //remoteSort: true,

    //groupField: 'usergroup',

    proxy: {
        type: 'rest',
        url: Ares.CONFIG.URL.reservation.url,
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