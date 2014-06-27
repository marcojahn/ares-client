Ext.define('Ares.controller.Viewport', {
    extend: 'Ext.app.Controller',

    config: {
        refs: [
            {
                ref: 'contentTabPanel',
                selector: 'contenttabpanel'
            }
        ],
        listen: {
            component: {
                '#app-header button[action=logout]': {
                    click: 'doLogout'
                },
                '#menuPanel > #sideMenu': {
                    click: 'onMenuClick'
                }
            }
        }
    },

    doLogout: function () {
        Ext.Ajax.request({
            url: '/WebService/anonymous/sessions',
            method: 'DELETE',
            scope: this,
            callback: function () {
                try{Ext.ComponentQuery.query('viewport')[0].destroy()} catch (e) {};
                window.location.href = 'http://pacdev.dev'
            }
        });
    },

    onMenuClick: function (menu, item, e, eOpts ) {
        this.getContentTabPanel().setActiveTab(item.target + '-tabpanel');
    }

});