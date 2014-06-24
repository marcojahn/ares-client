Ext.define('Ares.view.reservation.AvailablePlanesGrid', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.reservation-availableplanesgrid',
    itemId: 'reservation-availableplanesgrid',

    title: 'Available Planes',

    autoScroll: true,

    store: 'Ares.store.AvailablePlanes',

    flex: 1,
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
                text: 'Plane type',
                dataIndex: 'planetype',
                renderer: function (v) {
                    // TODO - same as in planes.js controller
                    var planetypes = {
                        'type_01': 'P-Type 01',
                        'type_02': 'P-Type 02',
                        'type_03': 'P-Type 03'
                    };
                    return planetypes[v];
                }
            }
        ];
    }
});