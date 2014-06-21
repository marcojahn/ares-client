Ext.define('Ares.view.reservation.TabPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
    ],

    config: {
    },

    itemId: 'reservation-tabpanel',

    alias: 'widget.reservation-tabpanel',

    title: 'Reservation',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    bodyCls: 'app-reservation',

    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                title: 'free planes',
                flex: 1,
                layout: 'fit'
            },
            {
                xtype: 'panel',
                flex: 2,
                margin: '0 0 0 40',
                title: 'reserved planes',
                layout: 'fit'
            }
        ];

        this.callParent(arguments);

        this.on('activate', function () {
        }, this);

        this.on('deactivate', function () {
        }, this);
    }
});