Ext.define('Ares.CONFIG', {
    singleton: true,

    requires: ['Ext.state.*'],

    URL: {
        users: {
            url: '/WebService/Users'
        }
    },

    REASONS: {
        'invalid_credentials': 'Invalid credentials'
    },

    getReason: function (key) {
        return this.REASONS[key] || 'unknown key {' + key + '}';
    }
}, function () {
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    Ext.Ajax.defaultHeaders = {
        'Content-Type': 'application/json; charset=UTF-8'/*,
         'Accept-Charset': 'UTF-8'*/
    };
});