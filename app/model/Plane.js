Ext.define('Ares.model.Plane', {
    extend: 'Ares.model.Base',

    idProperty: 'planeId',

    fields: [
        {name: 'planeId', mapping: '_id', defaults: null},
        'plane',
        'type'
    ]
});
