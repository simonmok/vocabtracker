angular.module('starter.services', [])

.factory('Dictionary', function($q, $http) {

  var dictionary;

  return {

    all: function() {
    	if (dictionary !== undefined) {
    		return dictionary;
    	}
		var deferred = $q.defer();
		$http.get('data/dictionary.json').then(function(response) {
			dictionary = response.data;
			deferred.resolve(dictionary);
        });
		return deferred.promise;
    },
    
    search: function(word) {
    	for (var i = 0; i < dictionary.length; i++) {
			if (dictionary[i].name === word) {
				return i;
			}
		}
    	return null;
    },
    
    addWord: function(word) {
    	var id = dictionary.length === 0 ? 1 : dictionary[dictionary.length - 1].id + 1;
    	var object = {
		    "id": id,
		    "name": word.text,
		    "meaning": [{
			  "type": word.type,
			  "desc": word.meaning
			}],
			"complete": false
		  };
    	if (word.examples !== undefined && word.examples.length > 0) {
    		object.examples = [ word.examples ]
    	}
    	dictionary.push(object);
    },

    remove: function(word) {
		var position = this.search(word);
    	if (position != null) {
    		dictionary.splice(position, 1);
    	}
//		$cordovaFile.writeFile(cordova.file.dataDirectory, "dictionary.json", JSON.stringify(json), true).then(function(success) {
//				console.log('Success creating');
//			}, function(error) {
//				// error
//				console.log(error); // error mappings are listed in the
//									// documentation
//			});
    },

	length: function() {
		return dictionary.length;
	},

	countComplete: function() {
	  var count = 0;
	  for (var i = 0; i < dictionary.length; i++) {
        if (dictionary[i].complete) {
          count++;
        }
      }
      return count;
	},

    get: function(wordId) {
      for (var i = 0; i < dictionary.length; i++) {
        if (dictionary[i].id === parseInt(wordId)) {
          return dictionary[i];
        }
      }
      return null;
    }
  };
});
