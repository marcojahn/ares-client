Ext.define('Ares.model.User', {
    extend: 'Ares.model.Base',

    idProperty: 'userId',

    fields: [
        {name: 'userId', mapping: '_id'},
        'firstname',
        'lastname',
        'username',
        'usergroup',
        'email',
        'created',
        'lastmodified'
    ]/*,

    manyToMany: 'Group'*/
});
