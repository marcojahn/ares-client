Ext.define('Ares.model.Base', {
    extend: 'Ext.data.Model',

    /*fields: [
        {name: 'id', mapping: '_id', type: 'int'}
    ],*/

    schema: {
        namespace: 'Ares.model',
        urlPrefix: 'WebService',
        proxy: {
            type: 'rest',
            url: '/{prefix}/{entityName:uncapitalize}' + 's', // TODO write own formatter
            pageParam: '',
            startParam: '',
            limitParam: ''
        }
    }
});