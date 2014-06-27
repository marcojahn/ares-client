Ext.define('Ares.view.ContentTabPanel', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ares.view.user.TabPanel',
        'Ares.view.plane.TabPanel',
        'Ares.view.monitoring.TabPanel',
        'Ares.view.reservation.TabPanel'
    ],

    alias: 'widget.contenttabpanel',

    itemId: 'contenttabpanel',

    title: 'Content',

    tabBar: {
        hidden: true
    },

    defaults: {
        bodyPadding: 10
    },

    activeTab: 1,

    items: [
        {
            title: 'Home',
            itemId: 'home-tabpanel',
            html: 'Ares client'
        },
        {
            xtype: 'reservation-tabpanel'
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