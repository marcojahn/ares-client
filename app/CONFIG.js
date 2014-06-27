Ext.define('Ares.CONFIG', {
    singleton: true,

    requires: ['Ext.state.*'],

    formattings: {
        dateLong: 'Y-m-d H:i:sO'
    },

    URL: {
        users: {
            url: '/WebService/users'
        },
        planes: {
            url: '/WebService/planes',
            types: '/WebService/planes/types'
        },
        reservation: {
            url: '/WebService/reservations',
            availablePlanes: '/WebService/reservations/planes',
            processWorkflow: '/WebService/reservations/workflowstep'
        },
        monitoring: {
            sessions: '/WebService/monitoring/sessions',
            resourceAggregation: {
                read: '/WebService/monitoring/aggregate',
                delete: '/WebService/monitoring/route',
                purge: '/WebService/monitoring/purge'
            }
        }
    },

    REASONS: {
        'invalid_credentials': 'Invalid credentials',
        'not_authorized': 'Not authorized',
        'not_authenticated': 'Not authenticated'
    },

    CURRENT_USER: {},

    WORKFLOW: {
        start: 'reserved',
        status: {
            reserved: {
                value: 'Reserved',
                next: ['lent', 'cancelled']
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

    PERMISSIONS: {
        admin: {
            all: true
        },
        user: {
            all: false,
            views: {
                reservation: true,
                plane: true,
                user: false,
                monitoring: false
            },
            actions: {
                plane: {
                    reload: true,
                    create: false,
                    remove: false,
                    edit: false
                }
            }
        },
        guest: {
            all: false,
            views: {
                reservation: true,
                plane: false,
                user: false,
                monitoring: false
            },
            actions: {
                reservation: {
                    processWorkflow: false
                }
            }
        }
    },

    getReason: function (key) {
        return this.REASONS[key] || 'unknown key {' + key + '}';
    },

    hasPermission: function (view, action) {
        var skipChecks = false,
            retVal = false,
            curUserGroup = Ares.CONFIG.CURRENT_USER.usergroup;

        // check "all" permission
        if (this.PERMISSIONS[curUserGroup] && this.PERMISSIONS[curUserGroup].all === true) {
            retVal = true;
            skipChecks = true;
        }

        // check if user has permission on "view"
        if (skipChecks === false) {
            if (this.PERMISSIONS[curUserGroup].views[view]) {

                // check given action for view
                if (typeof action !== "undefined") {

                    if (this.PERMISSIONS[curUserGroup].actions
                        && this.PERMISSIONS[curUserGroup].actions[view]
                        && this.PERMISSIONS[curUserGroup].actions[view][action]
                        ) {
                        retVal = true;
                    }
                } else {
                    retVal = true;
                }
            }
        }

        return retVal;
    }
}, function () {
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
    Ext.Ajax.defaultHeaders = {
        'Content-Type': 'application/json; charset=UTF-8'/*,
         'Accept-Charset': 'UTF-8'*/
    };
});