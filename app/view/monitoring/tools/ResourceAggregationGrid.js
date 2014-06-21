Ext.define('Ares.view.monitoring.tools.ResourceAggregationGrid', {
    extend: 'Ext.grid.Panel',

    store: 'Ares.store.ResourceAggregations',

    itemId: 'monitoring-tools-resourceaggregation',
    alias: 'widget.monitoring-tools-resourceaggregation',

    title: 'Resource monitoring',

    autoScroll: true,

    flex: 1,

    initComponent: function () {

        this.columns = this.buildColumns();

        this.tbar = [
            {
                text: 'Delete resource',
                glyph: 'xf014@FontAwesome',
                action: 'delete'
            },
            {
                text: 'Purge',
                glyph: 'xf1e2@FontAwesome',
                action: 'purge'
            }
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: this.getStore(),
            dock: 'bottom',
            displayInfo: true
        }];

        this.callParent();
    },

    reloadData: function () {
        this.getStore().loadRemote({
            callback: function (success, result) {
                if (!success) {
                    Ext.Msg.alert('Error loading monitoring data', Ares.CONFIG.getReason(result.reason));
                }
            },
            scope: this
        });
    },

    removeResource: function (resourceId) {
        this.getStore().deleteResource({
            resourceId: resourceId,
            callback: function (success, result) {
                if (!success) {
                    Ext.Msg.alert('Error removing resource {' + resourceId + '}', result);
                }
                this.reloadData();
            },
            scope: this
        });
    },

    purgeData: function () {
        this.getStore().purgeResource({
            callback: function (success, result) {
                if (!success) {
                    Ext.Msg.alert('Error pruning resource {' + resourceId + '}', result);
                }
                this.reloadData();
            },
            scope: this
        });
    },

    buildColumns: function () {
        var msRenderer = function (v) {
            return v + ' ms';
        };
        return [
            {
                text: 'Resource',
                dataIndex: 'resourceId',
                flex: 3
            },
            {
                text: 'Calls',
                dataIndex: 'total',
                flex: 1,
                align: 'right'
            },
            {
                text: 'Avg. duration',
                dataIndex: 'avgDuration',
                formatter: 'round(2)',
                flex: 1,
                align: 'right',
                renderer: msRenderer
            },
            {
                text: 'Min. duration',
                dataIndex: 'minDuration',
                flex: 1,
                align: 'right',
                renderer: msRenderer
            },
            {
                text: 'Max. duration',
                dataIndex: 'maxDuration',
                flex: 1,
                align: 'right',
                renderer: msRenderer
            }
        ];
    }
});