Ext.define('Ares.view.user.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',

    formResetClicked: function () {
        var grid = this.lookupReference('usergrid'),
            sm = grid.getSelectionModel();

        sm.deselectAll();


    },

    onCreateClick: function () {
        var grid = this.lookupReference('usergrid'),
            sm = grid.getSelectionModel(),
            store = grid.getStore();

        var user = Ext.create('Ares.model.User', {
            username: 'user-' + new Date().getTime(),
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            group: 'user'
        });

        store.insert(0, user);

        sm.select(0);

    },

    onDeleteClick: function () {
        var grid = this.lookupReference('usergrid'),
            sm = grid.getSelectionModel(),
            store = grid.getStore();

        store.remove(sm.getSelection());
    },

    onSaveClick: function () {
        this.lookupReference('usergrid').getStore().sync();
    },

    onRefreshClick: function() {
        this.lookupReference('usergrid').getStore().load();
        console.log('usergrid refresh button clicked')
    },

    renderUsergroup: function (v) {
        return Ares.model.User.getGroupname(v);
    }


});
