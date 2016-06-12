(function() {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {

        function linker(scope, element, attributes) {

            var data = scope.data;
            var startIndex, endIndex;
            startIndex = endIndex = -1;

            $(element)
                .sortable({
                    start: function(event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function(event, ui) {
                        endIndex = ui.item.index();

                        var sortedElement = scope.data.splice(startIndex, 1)[0];        // Reference to moved element
                        scope.data.splice(endIndex, 0, sortedElement);                  // Put it in correct place

                        scope.$apply();                   // Hey angular, stuff happened c:

                        scope.reorder({start: startIndex, end: endIndex});
                    }
                })


        }

        return {

            scope: {
                data: "=",
                reorder: "&sorted"
            },
            link: linker

        };

    }

})();