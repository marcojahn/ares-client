Ext.define('Ares.controller.Monitoring', {
    extend: 'Ext.app.Controller',

    config: {

        refs: [
            {
                ref: 'resourceAggregationGrid',
                selector: 'monitoring-tools-resourceaggregation'
            }
        ],

        listen: {
            component: {
                'monitoring-tools-resourceaggregation pagingtoolbar button#refresh': {
                    click: 'onReload'
                },
                'monitoring-tools-resourceaggregation button[action=purge]': {
                    click: 'onPurge'
                },
                'monitoring-tools-resourceaggregation button[action=delete]': {
                    click: 'onDelete'
                }
            }
        }
    },

    onReload: function () {
        this.getResourceAggregationGrid().reloadData();
    },

    onPurge: function () {
        this.getResourceAggregationGrid().purgeData();
    },

    onDelete: function () {
        var sm = this.getResourceAggregationGrid().getSelectionModel(),
            selection = sm.getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('Error', 'No entry selection for deletion');
        } else {
            this.getResourceAggregationGrid().removeResource(selection[0].get('resourceId'));
        }
    }

});