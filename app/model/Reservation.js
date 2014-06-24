Ext.define('Ares.model.Reservation', {
    extend: 'Ares.model.Base',

    idProperty: 'reservationId',

    fields: [
        {name: 'reservationId', mapping: '_id', defaults: null},
        'plane',
        'planetype',
        'start',
        'until',
        'by',
        {name: 'created', persist: false},
        {name: 'lastmodified', persist: false},
        {name: 'status'}
    ]
});
