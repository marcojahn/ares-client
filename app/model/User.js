Ext.define('Ares.model.User', {
    extend: 'Ares.model.Base',

    idProperty: 'userId',

    statics: {
        getGroupname: function(group) {
            return this.prototype.groupNames[group];
        }
    },

    fields: [
        {name: 'userId', mapping: '_id', defaults: null},
        'firstname',
        'lastname',
        'username',
        'usergroup',
        'email',
        'created',
        'lastmodified'
    ],

     groupNames: {
         admin: 'Administrators',
         user: 'Users'
     }

    /*manyToMany: 'Group'*/
});
