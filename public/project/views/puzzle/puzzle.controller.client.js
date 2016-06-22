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
        vm.build = build;
        vm.goToNaming = goToNaming;
        vm.backToBuild = backToBuild;
        vm.finish = finish;

        function init() {

            vm.userId = $routeParams["uid"];

            vm.choosing = true;
            vm.building = false;
            vm.naming = false;

            vm.word1 = vm.word2 = vm.word3 = vm.word4 = vm.word5 = null;

            vm.grid = [];
            for (var i = 0; i < 6; i++) {
                vm.grid.push(["", "", "", "", ""]);
            }

            console.log(vm.grid);

        }

        init();

        function assignWords() {

            vm.words = [vm.word1, vm.word2, vm.word3, vm.word4, vm.word5];

            vm.choosing = false;
            vm.building = true;
            vm.naming = false;

        }

        function backToAssign() {

            vm.choosing = true;
            vm.building = false;
            vm.naming = false;

        }

        function backToBuild() {

            vm.choosing = false;
            vm.building = true;
            vm.naming = false;

        }

        function goToNaming() {

            vm.puzzle = {name: "", _user: vm.userId, grid: vm.grid, words: vm.words};

            vm.choosing = false;
            vm.building = false;
            vm.naming = true;

        }

        function build() {

            vm.error = null;

            console.log(vm.grid);

            for(var i = 0; i < vm.grid.length; i++) {

                for(var j = 0; j < vm.grid[i].length; j++) {

                    if (!vm.grid[i][j] || vm.grid[i][j] === '') {
                        vm.error = "Incomplete puzzle.";
                    }

                }

            }
            
            if (!vm.error) {
                
                vm.goToNaming();

            }

        }

        function finish() {

            if (scanForWords()) {

                PuzzleService
                    .createPuzzle(vm.userId, vm.puzzle)
                    .then(
                        function (succ) {
                            $location.url("/user/" + vm.userId + "/puzzle");
                        },
                        function (err) {
                            vm.error = "Could not create puzzle.";
                        }
                    );
            } else {
                vm.error = "This puzzle cannot be solved.";
            }

        }

        function scanForWords() {

            // Set up array of bools to make sure
            var verify = [];
            for(var i in vm.words) {
                verify.push(false);
            }

            for(var wordIndex in vm.words) { // Iterate through words

                for(var row = 0; row < vm.grid.length; row++) { // Iterate through rows

                    for(var col = 0; col < vm.grid[row].length; col++) { // Iterate through columns

                        if (vm.grid[row][col] === vm.words[wordIndex].charAt(0)) { // Check if this is the beginning of word

                            if (scanAllDirections(row, col, wordIndex) === true) {
                                verify[wordIndex] = true;
                            }

                        }

                    }

                }

            }

            for(var j in verify) {
                if (verify[j] === false) {
                    return false;
                }
                return true;
            }

        }

        function scanAllDirections(row, col, wordIndex) {

            // 1 : East
            // 2 : SouthEast
            // 3 : South
            // 4 : SouthWest
            // 5 : West
            // 6 : NorthWest
            // 7 : North
            // 8 : NorthEast
            directionCodes = [1, 2, 3, 4, 5, 6, 7, 8];

            word = vm.words[wordIndex];

            // Scan in each direction one at a time
            for(var dir = 0; dir < directionCodes.length; dir++) {

                if (searchInLine(word, directionCodes[dir], row, col)) {
                    return true;
                }

            }

            return false;

        }

        function searchInLine(word, dir, row, col) {

            console.log("word: " + word);

            var myRow = row;
            var myCol = col;

            for(var c = 0; c < word.length; c++) {

                if (vm.grid[myRow][myCol] === word.charAt(word.length-1)) { // Base case

                    return true;

                } else {

                    console.log("Comparing " + word.charAt(c) + " and " + vm.grid[myRow][myCol]);
                    if (word.charAt(c) === vm.grid[myRow][myCol]) {
                        var nextCoords = nextInDir(dir, myRow, myCol);

                        console.log("Moving from " + myRow + ", " + myCol + " to " + nextCoords[0] + ", " + nextCoords[1] + "\n\n");

                        if (nextCoords[0] < 6 && nextCoords[1] < 5) {
                            myRow = nextCoords[0];
                            myCol = nextCoords[1];
                        } else {
                            return false;
                        }

                    } else {
                        return false;
                    }

                }

            }

        }

        function nextInDir(dir, row, col) {

            var returnPckg = [];

            switch(dir) {

                case 1:
                    returnPckg = [row, col+1];
                    break;

                case 2:
                    returnPckg = [row+1, col+1];
                    break;

                case 3:
                    returnPckg = [row+1, col];
                    break;

                case 4:
                    returnPckg = [row+1, col-1];
                    break;

                case 5:
                    returnPckg = [row, col-1];
                    break;

                case 6:
                    returnPckg = [row-1, col-1];
                    break;

                case 7:
                    returnPckg = [row-1, col];
                    break;

                case 8:
                    returnPckg = [row-1, col+1];
                    break;

            }

            return returnPckg;

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