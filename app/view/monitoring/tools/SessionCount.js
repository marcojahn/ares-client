Ext.define('Ares.view.monitoring.tools.SessionCount', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.XTemplate'
    ],

    height: 250,
    width: 400,
    bodyPadding: 10,
    title: 'My Panel',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            tbar: [
                {
                    text: 'Refresh'
                }
            ],
            data: {
                sessionCount: 15
            },
            tpl: [
                'Active sessions: {sessionCount}'
            ]
        });

        me.callParent(arguments);
    }

});