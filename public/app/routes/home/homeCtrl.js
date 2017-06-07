angular.module("app")
.controller("homeCtrl", function($scope) {

    var doors = [];

    $scope.carsWon = 0;
    $scope.goatsWon = 0;

    var timesSwitched = 0;
    var switchedAndWon = 0;
    var timesStayed = 0;
    var stayedAndWon = 0;
    $scope.switchSuccess = (switchedAndWon / timesSwitched)*100;
    $scope.staySuccess = (stayedAndWon / timesStayed)*100;

    $scope.check1;
    $scope.check2;
    $scope.check3;
    $scope.prize1 = '';
    $scope.prize2 = '';
    $scope.prize3 = '';

    var finalSelection;
    var originalChoice;
    var finalChoice;

    var $door = $('.door');
    var $instructions = $('#instructions');
    var $prize = $('.prize');

  //Door logic
    $scope.playGame = function(){
        //reset doors and door logic
        doors = ['goat', 'goat', 'goat'];
        var doorWithCar = Math.floor(Math.random()*3);
        doors[doorWithCar] = 'car';
        $scope.prize1 = doors[0];
        $scope.prize2 = doors[1];
        $scope.prize3 = doors[2];
        //reset animations
        $door.css('transform', 'rotateY(0deg)');
        $instructions.text('Pick a door');
        $instructions.css('border', 'none');
        $prize.css({'display': 'none', 'left': '10px'}).delay(2000).css('display', 'block');
        $scope.hideAllCheckMarks();
    }

    $scope.updateStats = function(num){
        if (doors[num-1] == 'car' && finalChoice == originalChoice){
            $scope.carsWon++;
            timesStayed++;
        }else if(doors[num-1] == 'car' && finalChoice != originalChoice){
            $scope.carsWon++;
            timesSwitched++;
        }else if(doors[num-1] != 'car' && finalChoice != originalChoice){
            $scope.goatsWon++;
            timesSwitched++;
        }else if(doors[num-1] != 'car' && finalChoice == originalChoice){
            $scope.goatsWon++;
            timesStayed++;
        }
    }

  //Visual effects
    $scope.pickDoor = function(num){
        let id = '#'+num;
        let prize = '#p'+num;
        if (finalSelection){
            $scope.hideAllCheckMarks();
            finalChoice = num;
            $scope.updateStats(num);
            $(id).css('transform', 'rotateY(-65deg)');
            $(prize).css('left', '75px');
            $instructions.text('Play Again?');
            $instructions.css('border', '2px solid black');
        }else{
            $scope.checkMark(num); 
            originalChoice = num;
        }
    }

    $scope.checkMark = function(num){
        if (num === 1){
            $scope.check1 = true;
        }else if (num === 2){
            $scope.check2 = true;
        }else if (num === 3){
            $scope.check3 = true;
        }        
        finalSelection = true;
    }

    $scope.hideAllCheckMarks = function(){
        $scope.check1 = false;
        $scope.check2 = false;
        $scope.check3 = false;
        finalSelection = false;
    }

//Initiate first iteration of the game
    $scope.playGame();

});
