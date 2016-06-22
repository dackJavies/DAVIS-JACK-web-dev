(function() {
    angular
        .module("SearchScape")
        .controller("NewPuzzleController", NewPuzzleController)
        .controller("PuzzleListController", PuzzleListController)
        .controller("SolvePuzzleController", SolvePuzzleController);

    function NewPuzzleController(PuzzleService, $routeParams, $location) {

        var vm = this;

        vm.assignWords = assignWords;
        vm.backToAssign = backToAssign;

        function init() {

            vm.userId = $routeParams["uid"];

            vm.choosing = true;
            vm.building = false;

            vm.word1 = vm.word2 = vm.word3 = vm.word4 = vm.word5 = null;

        }

        init();

        function assignWords() {

            vm.words = [vm.word1, vm.word2, vm.word3, vm.word4, vm.word5];

            vm.choosing = false;
            vm.building = true;

            $location.url("/user/" + vm.userId + "/puzzle/new");

        }

        function backToAssign() {

            vm.choosing = true;
            vm.building = false;

        }

    }

    function PuzzleListController(PuzzleService, $location, $routeParams) {

        var vm = this;

        vm.deletePuzzle = deletePuzzle;

        function init() {

            vm.userId = $routeParams["uid"];

            PuzzleService
                .findAllPuzzlesForUser(vm.userId)
                .then(
                    function(succ) {
                        vm.puzzles = succ.data;
                    },
                    function(err) {
                        vm.error = "Could not retrieve puzzles.";
                    }
                )

        }

        init();

        function deletePuzzle(puzzleId) {

            PuzzleService
                .deletePuzzle(puzzleId)
                .then(
                    function(succ) {
                        $location.url("/user/" + vm.userId + "/puzzle");
                    },
                    function(err) {
                        vm.error = "Could not delete puzzle.";
                    }
                )

        }

    }

    function SolvePuzzleController(PuzzleService) {



    }

})();