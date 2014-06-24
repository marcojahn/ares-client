Ext.define('Ares.view.reservation.ReservationsGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.column.Action'
    ],

    alias: 'widget.reservation-reservationsgrid',
    itemId: 'reservation-reservationsgrid',

    title: 'Reservations',

    autoScroll: true,

    store: 'Ares.store.Reservations',

    flex: 2,
    margin: '0 0 0 40',
    layout: 'fit',

    initComponent: function () {
        this.columns = this.buildColumns();

        this.callParent(arguments);
    },

    reloadData: function () {
        this.getStore().load();
    },

    buildColumns: function () {
        return [
            {
                text: 'Plane',
                dataIndex: 'plane',
                flex: 1
            },
            {
                text: 'Start',
                dataIndex: 'start',
                xtype: 'datecolumn',
                format: 'Y-m-d H:i:s',
                width: 150
            },
            {
                text: 'Until',
                dataIndex: 'until',
                xtype: 'datecolumn',
                format: 'Y-m-d H:i:s',
                width: 150
            },
            {
                text: 'By',
                dataIndex: 'by'
            },
            {
                text: 'Updated',
                dataIndex: 'lastmodified',
                xtype: 'datecolumn',
                format: 'Y-m-d H:i:s'
            },
            {
                text: 'Status',
                dataIndex: 'status',
                renderer: function (v) {
                    return Ares.CONFIG.WORKFLOW.status[v].value;
                }
            },
            {
                xtype: 'actioncolumn',
                items: [
                    {
                        tooltip: 'Process Workflow',
                        icon: '/resources/images/process.png',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            this.fireEvent('processworkflow', rec)
                        },
                        isDisabled: function (view, rowIndex, colIndex, item, record) {
                            if (record) {
                                if (Ares.CONFIG.WORKFLOW.status[record.get('status')].next === false) return true;
                            }

                            if (Ares.CONFIG.CURRENT_USER.usergroud === 'admin') return false;

                            if (record) {
                                if (Ares.CONFIG.WORKFLOW.status[record.get('status')].next === false) return true;
                            }
                        },
                        scope: this
                    }
                ]
            }
        ];
    }
});