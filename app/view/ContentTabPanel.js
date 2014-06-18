Ext.define('Ares.view.ContentTabPanel', {
    extend: 'Ext.tab.Panel',

    alias: 'widget.contenttabpanel',

    itemId: 'contenttabpanel',

    title: 'Content',

    /*tabBar: {
        hidden: true
    },*/

    defaults: {
        bodyPadding: 10
    },

    items: [
        {
            title: 'Home',
            itemId: 'tab-home',
            html: 'Ares client'
        },
        {
            title: 'Reservation',
            itemId: 'tab-reservation',
            html: 'reservation'
        },
        {
            title: 'Planes',
            itemId: 'tab-planes',
            html: 'reservation'
        },
        {
            title: 'User',
            itemId: 'tab-user',
            html: 'user'
        },
        {
            title: 'Monitoring',
            itemId: 'tab-monitoring',
            html: 'monitoring'
        }
    ]
});