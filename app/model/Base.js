Ext.define('Ares.model.Base', {
    extend: 'Ext.data.Model',

    /*fields: [
        {name: 'id', mapping: '_id', type: 'int'}
    ],*/

    schema: {
        namespace: 'Ares.model',
        proxy: {
            url: '{prefix}/{entityName:uncapitalize}',
            pageParam: '',
            startParam: '',
            limitParam: ''
        }
    }
});