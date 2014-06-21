Ext.define('Ares.view.monitoring.TabPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ares.view.monitoring.tools.SessionCount'
    ],

    config: {
        monitoringTitle: null
    },

    itemId: 'monitoring-tabpanel',

    alias: 'widget.monitoring-tabpanel',

    title: 'Monitoring',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyCls: 'app-monitoring',

    initComponent: function () {
        this.buildMonitoringTitle();

        this.items = [
            this.getMonitoringTitle(),
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [{
                    xtpe: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'monitoring-tools-sessioncount',
                        flex: 1,
                        layout: 'fit'
                    }, {
                        xtype: 'panel',
                        flex: 1,
                        margin: '20 0 0 0',
                        //title: 'tbd',
                        layout: 'fit',
                        items: {}
                    }]
                }, {
                    xtype: 'container',
                    flex: 3,
                    margin: '0 0 0 40',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        flex: 1,
                        title: 'Aggregated resource monitoring'
                    }]
                }]
            }
        ];

        this.callParent(arguments);
    },

    buildMonitoringTitle: function () {
        this.setMonitoringTitle(Ext.create('Ext.Container', {
            layout: 'hbox',
            items: [
                {
                    xtype: 'component',
                    margin: '10 0 20 0',
                    cls: 'title',
                    html: 'Ares - Monitoring'
                }
            ]
        }));
    }

});