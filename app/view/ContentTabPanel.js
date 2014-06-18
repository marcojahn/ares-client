Ext.define('Ares.view.ContentTabPanel', {
    extend: 'Ext.tab.Panel',

    requires: [
        'Ares.view.user.TabPanel'
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

    activeTab: 3,

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
            title: 'Planes',
            itemId: 'planes-tabpanel',
            html: 'reservation'
        },
        {
            xtype: 'user-tabpanel'
        },
        {
            title: 'Monitoring',
            itemId: 'monitoring-tabpanel',
            html: 'monitoring'
        }
    ]
});