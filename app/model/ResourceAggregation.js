Ext.define('Ares.model.ResourceAggregation', {
    extend: 'Ares.model.Base',

    idProperty: 'resourceId',

    fields: [
        {name: 'resourceId', mapping: '_id'},
        'total',
        'minDuration',
        'maxDuration',
        'avgDuration'
    ]
});