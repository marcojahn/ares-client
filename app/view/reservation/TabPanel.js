Ext.define('Ares.view.reservation.TabPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ares.view.reservation.AvailablePlanesGrid',
        'Ares.view.reservation.ReservationsGrid',
        'Ares.view.reservation.CreateReservation'
    ],

    itemId: 'reservation-tabpanel',

    alias: 'widget.reservation-tabpanel',

    title: 'Reservation',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    config: {
        availablePlanesGrid: null,
        reservationGrid: null
    },

    bodyCls: 'app-reservation',

    initComponent: function () {
        this.buildAvailablePlanesGrid();
        this.buildReservationGrid();

        this.items = [
            this.getAvailablePlanesGrid(),
            this.getReservationGrid()
        ];

        this.callParent(arguments);

        this.on('activate', function () {
            this.getAvailablePlanesGrid().reloadData();
            this.getReservationGrid().reloadData();
        }, this);
    },

    buildAvailablePlanesGrid: function () {
        this.setAvailablePlanesGrid(Ext.widget('reservation-availableplanesgrid'));
    },

    buildReservationGrid: function () {
        this.setReservationGrid(Ext.widget('reservation-reservationsgrid'));
    }
});