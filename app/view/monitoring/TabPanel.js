Ext.define('Ares.view.plane.TabPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ares.view.plane.PlaneGrid',
        'Ares.view.plane.CreatePlane'
    ],

    config: {
        planeGrid: null
    },

    itemId: 'plane-tabpanel',

    alias: 'widget.plane-tabpanel',

    title: 'Plane',

    layout: 'fit',

    initComponent: function () {
        this.buildPlaneGrid();

        this.items = [
            this.getPlaneGrid()
        ];

        this.callParent(arguments);

        this.on('activate', function () {
            this.getPlaneGrid().reloadData();
        }, this);
    },

    buildPlaneGrid: function () {
        this.setPlaneGrid(Ext.widget('plane-planegrid'));
    }
});