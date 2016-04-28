$(document).ready(function () {

    var colorObjects;
    var gObjects;
    var bObjects;
    var rObjects;


    $.getJSON('/api/objects', function (data) {

        colorObjects = data;
        populateModels();

    });


    var greenObjects = Backbone.Model.extend({});

    var blueObjects = Backbone.Model.extend({});

    var redObjects = Backbone.Model.extend({});

    var GreenView = Backbone.View.extend({
        el: $('#gBox'),
        initialize: function () {
            this.render();
            this.model.on('change', this.render, this);
        },
        render: function () {

            var idList = this.model.get('ids');
            var idString = "";
            for (var i = 0; i < idList.length; i++) {
                idString += "<p class = 'cObj' id=" + idList[i] + ">Object id: " + idList[i] + "</p><br/>";

            }
            var html = idString;
            $(this.el).html(html);
        }
    });

    var BlueView = Backbone.View.extend({
        el: $('#bBox'),
        initialize: function () {
            this.render();

            this.model.on('change', this.render, this);
        },
        render: function () {
            var idList = this.model.get('ids');
            var idString = "";
            for (var i = 0; i < idList.length; i++) {
                idString += "<p class = 'cObj'id=" + idList[i] + ">Object id:" + idList[i] + "</p><br/>";

            }
            var html = idString;
            $(this.el).html(html);
        }
    });

    var RedView = Backbone.View.extend({
        el: $('#rBox'),
        initialize: function () {
            this.render();
            //re-render after model has changed
            this.model.on('change', this.render, this);
        },
        render: function () {
            var idList = this.model.get('ids');
            var idString = "";
            for (var i = 0; i < idList.length; i++) {
                idString += "<p class = 'cObj' id=" + idList[i] + ">Object id:" + idList[i] + "</p><br/>";

            }
            var html = idString;
            $(this.el).html(html);
        }
    });


    function populateModels() {
        console.log(colorObjects);
        var green = [];
        var blue = [];
        var red = [];

        for (var i = 0; i < colorObjects.length; i++) {
            var currentObject = colorObjects[i];

            switch (currentObject['color']) {
            case 'green':
                green.push(currentObject['id']);
                break;
            case 'blue':
                blue.push(currentObject['id']);
                break;
            case 'red':
                red.push(currentObject['id']);
                break;
            }
        }


        gObjects = new greenObjects({
            ids: green
        });
        bObjects = new blueObjects({
            ids: blue
        });
        rObjects = new redObjects({
            ids: red
        });



        var greenView = new GreenView({
            model: gObjects
        });
        var blueView = new BlueView({
            model: bObjects
        });
        var redView = new RedView({
            model: rObjects
        });


    }


    $(".shift").click(function () {
        switch (this.id) {

        case 'g2b':
            var greenIds = _.clone(gObjects.get('ids'));
            var blueIds = _.clone(bObjects.get('ids'));
            var num = greenIds.pop();
            if (num !== undefined) {
                blueIds.push(num);
                //console.log(id);
                gObjects.set({
                    ids: greenIds
                });
                bObjects.set({
                    ids: blueIds
                });
            }
            break;


        case 'g2r':
            var greenIds = _.clone(gObjects.get('ids'));
            var redIds = _.clone(rObjects.get('ids'));
            var num = greenIds.pop();
            if (num !== undefined) {
                redIds.push(num);
                //console.log(id);
                gObjects.set({
                    ids: greenIds
                });
                rObjects.set({
                    ids: redIds
                });
            }
            break;

        case 'b2g':
            var blueIds = _.clone(bObjects.get('ids'));
            var greenIds = _.clone(gObjects.get('ids'));
            var num = blueIds.pop();
            if (num !== undefined) {
                greenIds.push(num);
                //console.log(id);
                bObjects.set({
                    ids: blueIds
                });
                gObjects.set({
                    ids: greenIds
                });
            }
            break;


        case 'b2r':
            var blueIds = _.clone(bObjects.get('ids'));
            var redIds = _.clone(rObjects.get('ids'));
            var num = blueIds.pop();
            if (num !== undefined) {
                redIds.push(num);
                //console.log(id);
                bObjects.set({
                    ids: blueIds
                });
                rObjects.set({
                    ids: redIds
                });
            }
            break;

        case 'r2g':
            var redIds = _.clone(rObjects.get('ids'));
            var greenIds = _.clone(gObjects.get('ids'));
            var num = redIds.pop();
            if (num !== undefined) {
                greenIds.push(num);
                //console.log(id);
                rObjects.set({
                    ids: redIds
                });
                gObjects.set({
                    ids: greenIds
                });
            }
            break;


        case 'r2b':
            var redIds = _.clone(rObjects.get('ids'));
            var blueIds = _.clone(bObjects.get('ids'));
            var num = redIds.pop();
            if (num !== undefined) {
                blueIds.push(num);
                //console.log(id);
                rObjects.set({
                    ids: redIds
                });
                bObjects.set({
                    ids: blueIds
                });
            }
            break;


        };

    });
});