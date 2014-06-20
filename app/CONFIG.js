Ext.define('Ares.CONFIG', {
    singleton: true,

    requires: ['Ext.state.*'],

    URL: {
        users: {
            url: '/WebService/users'
        },
        planes: {
            url: '/WebService/planes',
            types: '/WebService/planes/types'
        }
    },

    REASONS: {
        'invalid_credentials': 'Invalid credentials'
    },

    CURRENT_USER: {},

    WORKFLOW: {
        start: 'reserved',
        status: {
            reserved: {
                value: 'Reserved'
            },
            cancelled: {
                value: 'Cancelled',
                next: false
            },
            lent: {
                value: 'Lent',
                next: ['cancelled', 'returned']
            },
            returned: {
                value: 'Returned',
                next: false
            }
        }
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