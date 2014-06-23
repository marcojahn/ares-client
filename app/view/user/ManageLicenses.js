Ext.define('Ares.view.user.ManageLicenses', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Date'
    ],

    height: 350,
    itemId: 'user-managelicenses',
    alias: 'widget.user-managelicenses',
    width: 550,
    bodyPadding: 15,
    title: 'Manage licenses',

    autoShow: true,
    modal: true,

    config: {
        licenseForm: null,
        licenseFormContainer: null,
        user: null,
        planetypeStore: null
    },

    initComponent: function() {
        this.buildLicenseForm();

        this.items = [
            this.getLicenseForm()
        ];

        this.callParent(arguments);

        this.on('show', function () {
            this.setLoading(true);
        }, this);
    },

    dataLoaded: function () {
        this.generateForm();

        this.setLoading(false);
    },

    getCurrentLicenseForPlaneType: function (planetype) {
        var i, license,
            result = {
                isValid: false,
                validUntil: null
            },
            userLicenses = Ext.isArray(this.getUser().get('licenses')) ? this.getUser().get('licenses') : [],
            iLen = userLicenses.length;

        for (i = 0; i < iLen; i++) {
            license = userLicenses[i];
            if (license.planetype === planetype) {
                result.isValid = true;
                result.validUntil = license.validUntil;
            }
        }

        return result;
    },

    generateForm: function () {
        var i, planetype,
            formContainerItems = [],
            iLen = this.getPlanetypeStore().getCount();

        for (i = 0; i < iLen; i++) {
            planetype = this.getPlanetypeStore().getAt(i);
            formContainerItems.push(this.buildFieldContainer(planetype));
        }

        this.getLicenseFormContainer().add(formContainerItems);
    },

    buildFieldContainer: function (planetype) {
        var currentLicense = this.getCurrentLicenseForPlaneType(planetype.get('type'));

        return {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'License for type - ' + planetype.get('name') + '',
            labelWidth: 200,
            planetype: planetype.get('type'),
            items: [
                {
                    xtype: 'checkboxfield',
                    name: 'checkbox_' + planetype.get('type'),
                    flex: 1,
                    checked: currentLicense.isValid
                },
                {xtype: 'splitter'},
                {
                    xtype: 'datefield',
                    flex: 1,
                    name: 'datefield_' + planetype.get('type'),
                    fieldLabel: 'valid until',
                    minValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, 0),
                    maxValue: Ext.Date.add(new Date(), Ext.Date.YEAR, 2),
                    value: (currentLicense.isValid) ? new Date(currentLicense.validUntil) : undefined
                }
            ]
        };
    },

    buildLicenseForm: function () {
        this.setLicenseFormContainer(Ext.create('Ext.Container', {
            xtype: 'container',
            height: 250,
            autoScroll: true,
            items: []
        }));

        this.setLicenseForm(Ext.create('Ext.form.Panel', {
            xtype: 'form',
            buttons: [
                {
                    text: 'save',
                    action: 'savelicenses',
                    formBind: true,
                    disabled: true
                }
            ],
            items: [
                this.getLicenseFormContainer()
            ]
        }));
    }
});