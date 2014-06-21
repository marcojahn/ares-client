Ext.define('Ares.view.user.ManageLicenses', {
    extend: 'Ext.window.Window',

    requires: [
    ],

    height: 350,
    itemId: 'user-managelicenses',
    width: 550,
    bodyPadding: 15,
    title: 'Manage licenses',

    autoShow: true,
    modal: true,

    config: {
        licenseForm: null
    },

    initComponent: function() {
        this.buildLicenseForm();

        this.items = [
            this.getLicenseForm()
        ];

        this.callParent(arguments);
    },

    buildLicenseForm: function () {
        this.setLicenseForm(Ext.create('Ext.form.Panel', {
            xtype: 'form',
            buttons: [
                {
                    text: 'save'
                }
            ],
            items: [
                {
                    xtype: 'container',
                    height: 250,
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            fieldLabel: 'License Plane 1 and valid until',
                            labelWidth: 250,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1
                                },
                                {xtype: 'splitter'},
                                {
                                    xtype: 'datefield',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    }
});