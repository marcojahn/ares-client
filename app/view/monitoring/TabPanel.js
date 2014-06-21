Ext.define('Ares.view.monitoring.TabPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ares.view.monitoring.tools.SessionCount',
        'Ares.view.monitoring.tools.ResourceAggregationGrid'
    ],

    config: {
        monitoringTitle: null,
        resourceAggregationGrid: null,
        sessionCount: null
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
        this.buildSessionCount();
        this.buildResourceAggregationGrid();

        this.items = [
            this.getMonitoringTitle(),
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [
                    {
                        xtpe: 'container',
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            this.getSessionCount(),
                            {
                                xtype: 'panel',
                                flex: 1,
                                margin: '20 0 0 0',
                                //title: 'tbd',
                                layout: 'fit',
                                items: {}
                            }]
                    },
                    {
                        xtype: 'container',
                        flex: 3,
                        margin: '0 0 0 40',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            this.getResourceAggregationGrid()
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);

        this.on('activate', function () {
            this.getResourceAggregationGrid().reloadData();
            this.getSessionCount().startSessionCounter();
        }, this);

        this.on('deactivate', function () {
            this.getSessionCount().stopSessionCounter();
        }, this);
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
    },

    buildResourceAggregationGrid: function () {
        this.setResourceAggregationGrid(Ext.widget('monitoring-tools-resourceaggregation'));
    },

    buildSessionCount: function () {
        this.setSessionCount(Ext.widget('monitoring-tools-sessioncount'));
    }
});