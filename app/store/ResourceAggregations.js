Ext.define('Ares.store.ResourceAggregations', {
    extend: 'Ext.data.Store',

    requires: [
        //'Ext.data.proxy.Rest'
    ],

    storeId: 'ResourceAggregationStore',
    alias: 'store.ResourceAggregationStore',

    model: 'Ares.model.ResourceAggregation',

    pageSize: 10,

    autoLoad: true,
    proxy: {
        type: 'memory',
        enablePaging: true,
        reader: {
            type: 'json',
            rootProperty: 'records',
            totalProperty: 'total'
        },
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
    },

    loadRemote: function (options) {
        Ext.Ajax.request({
            method: 'GET',
            url: Ares.CONFIG.URL.monitoring.resourceAggregation.read,
            callback: this.processRemoteResponse,
            scope: this,
            original: options
        });
    },

    deleteResource: function (options) {
        Ext.Ajax.request({
            method: 'DELETE',
            url: Ares.CONFIG.URL.monitoring.resourceAggregation.delete + '?route=' + options.resourceId,
            callback: this.processRemoteResponse,
            scope: this,
            original: options
        });
    },
    purgeResource: function (options) {
        Ext.Ajax.request({
            method: 'DELETE',
            url: Ares.CONFIG.URL.monitoring.resourceAggregation.purge,
            callback: this.processRemoteResponse,
            scope: this,
            original: options
        });
    },

    processRemoteResponse: function (options, success, response) {
        var origOptions = options.original;
        var result = Ext.JSON.decode(response.responseText);

        if (success) {
            this.getProxy().setData(result);
            this.loadPage(this.currentPage);
        }

        origOptions.callback.call(origOptions.scope, success, result);
    }
});