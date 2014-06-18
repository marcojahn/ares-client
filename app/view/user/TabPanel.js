Ext.define('Ares.view.user.TabPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ares.view.user.UserGrid',
        'Ares.view.user.CreateUser'
    ],

    config: {
        userGrid: null
    },

    itemId: 'user-tabpanel',

    alias: 'widget.user-tabpanel',

    title: 'User',

    layout: 'fit',

    initComponent: function () {
        this.buildUserGrid();

        this.items = [
            this.getUserGrid()
        ];

        this.callParent(arguments);

        this.on('activate', function () {
            this.getUserGrid().reloadData();
        }, this);
    },

    buildUserGrid: function () {
        this.setUserGrid(Ext.widget('user-usergrid'));
    }
});