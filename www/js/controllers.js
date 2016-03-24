angular.module('starter.controllers', [])

.controller('VocabCtrl', function($scope, $ionicModal, words, $ionicPopup, Dictionary) {
  $scope.dictionary = words;
  $scope.newWord = {};
  $scope.addWord = function(word) {
	if (word.text === undefined || word.text.length === 0) {
	  $ionicPopup.alert({
		title: 'Add Word',
		template: 'Please fill in the word.'
	  });
	  return;
	}
	
	if (word.type === undefined || word.type.length === 0) {
	  $ionicPopup.alert({
		title: 'Add Word',
		template: 'Please fill in word type (e.g. adj).'
	  });
	  return;
	}

	if (word.meaning === undefined || word.meaning.length === 0) {
	  $ionicPopup.alert({
		title: 'Add Word',
		template: 'Please fill in meaning.'
	  });
	  return;
	}

	if (Dictionary.search(word.text)) {
	  $ionicPopup.alert({
		title: 'Add Word',
		template: 'The word "' + word.text + '" already exists.'
	  });
	  return;
	}

	Dictionary.addWord(word);
	$scope.newWord = {};
	$scope.modal.hide();
	$ionicPopup.alert({
	  title: 'Word added',
	  template: 'The word "' + word.text + '" is added.'
	});
  };
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
})

.controller('WordDetailCtrl', function($scope, $stateParams, $ionicPopup, Dictionary) {
  $scope.word = Dictionary.get($stateParams.wordId);
  $scope.deleteWord = function(word) {
	var confirmPopup = $ionicPopup.confirm({
     title: 'Confirm Deletion',
     template: 'Are you sure to delete this word?'
    });
    confirmPopup.then(function(result) {
      if (result) {
        Dictionary.remove(word);
		$ionicPopup.alert({
			title: 'Delete Word',
			template: 'The word "' + $scope.word.name + '" is deleted.'
		});
		//$scope.tabBarControllers().tabs("#tab-vocab").select();
		history.go(-1);
		//location.href = '/#/tab/vocab';
      }
    });
  };
})

.controller('QuizCtrl', function($scope, Dictionary) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('StatsCtrl', function($scope, $stateParams, Dictionary) {
	$scope.wordCount = Dictionary.length();
	$scope.countComplete = Dictionary.countComplete();
	$scope.completePercent = Math.round($scope.countComplete / $scope.wordCount * 10000) / 100;
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableSetting: true
  };
});
