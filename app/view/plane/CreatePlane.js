Ext.define('Ares.view.plane.CreatePlane', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox'
    ],

    height: 245,
    itemId: 'plane-createplane',
    width: 400,
    bodyPadding: 15,
    title: 'Create plane',

    autoShow: true,
    modal: true,

    config: {
        planeForm: null
    },

    initComponent: function() {
        this.buildPlaneForm();

        this.items = [
            this.getPlaneForm()
        ];

        this.callParent(arguments);
    },

    buildPlaneForm: function () {
        this.setPlaneForm(Ext.create('Ext.form.Panel', {
            buttons: [
                {
                    text: 'Save',
                    action: 'action',
                    formBind: true,
                    disabled: true
                }
            ],
            itemId: 'plane-createplane-form',
            defaults: {
                labelWidth: 150
            },
            bodyPadding: 10,
            header: false,
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'plane',
                    fieldLabel: 'Plane',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Select type',
                    displayField: 'name',
                    valueField: 'type',
                    allowBlank: false,
                    forceSelection: true,
                    name: 'planetype',
                    store: {
                        fields: ['type', 'name'],
                        proxy: {
                            type: 'ajax',
                            url: Ares.CONFIG.URL.planes.types
                        },
                        autoLoad: true
                    },
                    minChars: 0
                }
            ]
        }));
    }

});