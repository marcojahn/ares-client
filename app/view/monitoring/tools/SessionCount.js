Ext.define('Ares.view.monitoring.tools.SessionCount', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'Ext.data.JsonStore'
    ],
    itemId: 'monitoring-tools-sessioncount',
    alias: 'widget.monitoring-tools-sessioncount',

    title: 'Active sessions',

    config: {
        sessionCountStore: null,
        baseData: [
            {counting: 1, count: 0},
            {counting: 2, count: 0},
            {counting: 3, count: 0},
            {counting: 4, count: 0},
            {counting: 5, count: 0},
            {counting: 6, count: 0},
            {counting: 7, count: 0},
            {counting: 8, count: 0},
            {counting: 9, count: 0},
            {counting: 10, count: 0}
        ],
        countings: 0,
        task: null
    },

    flex: 1,
    layout: 'fit',

    initComponent: function () {
        this.buildSessionCountStore();

        this.items = [
            {
                xtype: 'cartesian',
                store: this.getSessionCountStore(),
                interactions: 'itemhighlight',
                innerPadding: {
                    top: 20,
                    left: 20,
                    right: 20,
                    bottom: 20
                },
                axes: [
                    {
                        type: 'numeric',
                        fields: 'count',
                        position: 'left',
                        grid: true,
                        increment: 1,
                        minorTickSteps: 1
                    },
                    {
                        type: 'numeric',
                        fields: 'counting',
                        position: 'bottom',
                        grid: true
                        ,hidden: true
                    }
                ],
                series: [
                    {
                        type: 'line',
                        xField: 'counting',
                        yField: 'count',
                        style: {
                            lineWidth: 4
                        },
                        marker: {
                            radius: 4
                        },
                        label: {
                            field: 'count',
                            display: 'over'
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        },
                        tooltip: {
                            trackMouse: true,
                            style: 'background: #fff',
                            renderer: function (storeItem, item) {
                                this.setHtml('Counting: ' + storeItem.get('counting') + ' - sessions: ' + storeItem.get('count'));
                            }
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);

        var runner = new Ext.util.TaskRunner();
        this.setTask(runner.newTask({
            run: this.refreshSessionCount,
            interval: 5000,
            scope: this
        }));
    },

    startSessionCounter: function () {
        this.getTask().start();
    },
    stopSessionCounter: function () {
        this.getTask().stop();
    },

    buildSessionCountStore: function () {
        this.setSessionCountStore(Ext.create('Ext.data.JsonStore', {
            fields: ['counting', 'count' ],
            idProperty: 'counting',
            data: this.getBaseData(),
            proxy: 'memory'
        }));
    },

    refreshSessionCount: function () {
        Ext.Ajax.request({
            method: 'GET',
            url: Ares.CONFIG.URL.monitoring.sessions,
            scope: this,
            callback: function (options, success, response) {
                var result = Ext.JSON.decode(response.responseText);
                if (success) {
                    var dataSet = this.getBaseData();

                    this.setCountings(this.getCountings() + 1);

                    if (this.getCountings() < 10) {
                        dataSet[this.getCountings()].count = result.total;
                    } else {
                        dataSet = Ext.Array.slice(dataSet, 1);
                        dataSet.push({
                            counting: this.getCountings() + 1,
                            count: result.total
                        })
                    }

                    this.setBaseData(dataSet);
                    this.getSessionCountStore().setData(dataSet);

                } else {
                    Ext.Msg.alert('Update session count error', Ares.CONFIG.getReason(result.reason));
                }
            }
        });
    }
});