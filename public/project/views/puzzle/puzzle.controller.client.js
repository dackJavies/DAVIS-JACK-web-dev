(function() {
    angular
        .module("SearchScape")
        .controller("NewPuzzleController", NewPuzzleController)
        .controller("PuzzleListController", PuzzleListController)
        .controller("SolvePuzzleController", SolvePuzzleController)
        .controller("PuzzleCommentController", PuzzleCommentController);

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
                vm.grid.push([]);
                for(var j = 0; j < 5; j++) {
                    vm.grid[i].push("");
                }
            }
        }

        init();

        function checkDiff() {

            vm.wordOneErr = vm.wordTwoErr = vm.wordThreeErr = vm.wordFourErr = vm.wordFiveErr = null;

            if (vm.words.length != 5) {
                return false;
            }

            for(var wordIndex in vm.words) {
                if (!vm.words[wordIndex]) {
                    return false;
                }
            }

            for(var i in vm.words) {
                for(var j = i+1; j < vm.words.length; j++) {
                    if (vm.words[i] === vm.words[j]) {
                        return false;
                    }
                }
            }

            return true;

        }

        function assignWords() {

            vm.words = [vm.word1, vm.word2, vm.word3, vm.word4, vm.word5];

            if (checkDiff()) {

                vm.choosing = false;
                vm.building = true;
                vm.naming = false;

            } else {

                if (!vm.word1) {
                    vm.wordOneErr = "You need a word there, buddyboy.";
                } else {
                    vm.wordOneErr = null;
                }

                if (!vm.word2) {
                    vm.wordTwoErr = "C'mon, just put a word there.";
                } else {
                    vm.wordTwoErr = null;
                }

                if (!vm.word3) {
                    vm.wordThreeErr = "Need word.";
                } else {
                    vm.wordThreeErr = null;
                }

                if (!vm.word4) {
                    vm.wordFourErr = "Need word.";
                } else {
                    vm.wordFourErr = null;
                }

                if (!vm.word5) {
                    vm.wordFiveErr = "A word would really tie the room together.";
                } else {
                    vm.wordFiveErr = null;
                }

            }

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

            // Set up array of bools to make sure all words are accounted for
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

            var myRow = row;
            var myCol = col;

            for(var c = 0; c < word.length; c++) {

                if (vm.grid[myRow][myCol] === word.charAt(word.length-1)) { // Base case

                    return true;

                } else {

                    if (word.charAt(c) === vm.grid[myRow][myCol]) {
                        var nextCoords = nextInDir(dir, myRow, myCol);

                        if (0 < nextCoords[0] && nextCoords[0] < 5 && 0 <= nextCoords[1] && nextCoords[1] < 4) {
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

    function PuzzleListController(PuzzleService, $routeParams) {

        var vm = this;

        vm.deletePuzzle = deletePuzzle;

        // vm.puzzles = [];

        function init() {

            vm.userId = $routeParams["uid"];

            PuzzleService
                .findAllPuzzlesForUser(vm.userId)
                .then(
                    function(succ) {
                        vm.puzzles = succ.data;
                        // initHelper(0);
                    },
                    function(err) {
                        vm.error = "Could not retrieve puzzles.";
                    }
                )

        }

        init();

        function initHelper(index) {

            if (index < vm.puzzleIds.length) {

                PuzzleService
                    .findPuzzleById(vm.puzzleIds[index])
                    .then(
                        function(succ) {
                            vm.puzzles.push(succ.data);
                            initHelper(index+1);
                        }
                    );

            }

        }

        function deletePuzzle(puzzleId) {

            PuzzleService
                .deletePuzzle(puzzleId)
                .then(
                    function(succ) {
                        init();
                    },
                    function(err) {
                        vm.error = "Could not delete puzzle.";
                    }
                )

        }

    }

    function SolvePuzzleController(PuzzleService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.log = log;
        vm.calculateLastPosition = calculateLastPosition;

        function init() {

            vm.userId = $routeParams["uid"];
            vm.puzzleId = $routeParams["pid"];

            vm.moveQueue = [];
            vm.checkList = [];

            PuzzleService
                .findPuzzleById(vm.puzzleId)
                .then(
                    function(succ) {
                        vm.puzzle = succ.data;
                        prepareGrid();
                    },
                    function(err) {
                        vm.error = "Could not load puzzle.";
                    }
                );

        }

        init();

        // SINCE MONGODB FEELS LIKE TURNING ARRAYS OF STRINGS INTO GIANT STRINGS, I HAVE TO FIX THAT >:(
        function prepareGrid() {

            for(var i in vm.puzzle.grid) {
                vm.puzzle.grid[i] = vm.puzzle.grid[i].split(",");
            }

        }

        function log(row, col) {

            if (authorizedMove(row, col)) {
                vm.moveQueue.push({row: row, col: col});
                checkWord();
            } else {
                clearQueue();
            }

            vm.cur = addUpWord();

        }

        function calculateLastPosition() {

            if (vm.userId === vm.puzzle._user) {

                $location.url("/user/" + vm.userId + "/puzzle");

            } else {
                
                $location.url("/user/" + vm.userId + "/friend/" + vm.puzzle._user);
                
            }

        }

        function authorizedMove(row, col) {

            if (vm.moveQueue.length == 0) {
                return true;
            } else {

                return adjacent(vm.moveQueue[vm.moveQueue.length-1], {row: row, col: col});

            }

        }

        function adjacent(moveOne, moveTwo) {

            return Math.abs(moveOne.row-moveTwo.row) <= 1 && Math.abs(moveOne.col-moveTwo.col) <= 1;

        }

        function checkWord() {

            for (var wordIndex in vm.puzzle.words) {

                if (vm.puzzle.words[wordIndex] === addUpWord()) {
                    vm.checkList.push(vm.puzzle.words[wordIndex]);
                    clearQueue();
                    if (checkWin()) {
                        win();
                    }
                }

            }

        }

        function addUpWord() {

            var result = "";

            for (var i in vm.moveQueue) {

                result += vm.puzzle.grid[vm.moveQueue[i].row][vm.moveQueue[i].col];

            }

            return result;

        }

        function checkWin() {

            return vm.checkList.length === vm.puzzle.words.length;

        }

        function clearQueue() {
            vm.moveQueue = [];
        }

        function win() {

            vm.success = "You won!";

        }

    }
    
    function PuzzleCommentController(UserService, CommentService, $routeParams) {
        
        var vm = this;
        
        vm.submitComment = submitComment;
        vm.deleteComment = deleteComment;

        vm.authorNames = [];

        function init() {
            
            vm.userId = $routeParams["uid"];
            vm.puzzleId = $routeParams["pid"];

            vm.myComment = "";
            
            CommentService
                .findAllCommentsForPuzzle(vm.puzzleId)
                .then(
                    function(succ) {
                        vm.comments = succ.data;
                        grabAuthorUsernames(0);
                    },
                    function(err) {
                        vm.error = "Could not load comments.";
                    }
                );

        }

        init();
        
        function submitComment() {

            if (vm.myComment) {

                var comment = {author: vm.userId, _puzzle: vm.puzzleId, text: vm.myComment, date: getTodayDate()};

                CommentService
                    .createComment(comment)
                    .then(
                        function(succ) {
                            init();
                        },
                        function(err) {
                            vm.error = "Could not submit comment.";
                        }
                    );

            } else {
                vm.error = "Need comment to submit.";
            }
            
        }

        function deleteComment(commentId) {

            CommentService
                .deleteComment(commentId)
                .then(
                    function(succ) {
                        init();
                    },
                    function(err) {
                        vm.error = "Could not delete comment.";
                    }
                );

        }

        function grabAuthorUsernames(index) {

            if (index < vm.comments.length) {

                UserService
                    .findUserById(vm.comments[index].author)
                    .then(
                        function(succ) {
                            vm.authorNames.push({id: vm.comments[index]._id, author: succ.data.username});
                            grabAuthorUsernames(index+1);
                        },
                        function(err) {
                            vm.error = "Could not load author usernames.";
                        }
                    );

            }

        }

        function getAuthorUsername(commentId) {

            for(var i in vm.authorNames) {

                if (vm.authorNames[i].id === commentId) {
                    return vm.authorNames[i].author;
                }

            }

        }

        // Ripped from: http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
        function getTodayDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            }

            if(mm<10) {
                mm='0'+mm
            }

            today = mm+'/'+dd+'/'+yyyy;
            return today;
        }
        
    }

})();