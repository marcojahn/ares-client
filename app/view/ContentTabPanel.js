Ext.define('Ares.view.ContentTabPanel', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ares.view.user.TabPanel',
        'Ares.view.plane.TabPanel',
        'Ares.view.monitoring.TabPanel'
    ],

    alias: 'widget.contenttabpanel',

    itemId: 'contenttabpanel',

    title: 'Content',

    /*tabBar: {
        hidden: true
    },*/

    defaults: {
        bodyPadding: 10
    },

    activeTab: 4,

    items: [
        {
            title: 'Home',
            itemId: 'home-tabpanel',
            html: 'Ares client'
        },
        {
            title: 'Reservation',
            itemId: 'reservation-tabpanel',
            html: 'reservation'
        },
        {
            xtype: 'plane-tabpanel'
        },
        {
            xtype: 'user-tabpanel'
        },
        {
            xtype: 'monitoring-tabpanel'
        }
    ]
});