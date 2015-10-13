angular.module('starter.services', [])

.factory('Dictionary', function($q, $http) {

  var dictionary = [{
    "id": 1,
    "name": "extemporaneous",
    "meaning": [{
	  "type": "adj",
	  "desc": "即興的﹐無準備的"
	}],
	"complete": false
  }, {
    "id": 2,
    "name": "blatant",
	"meaning": [{
	  "type": "adj",
	  "desc": "明顯的, 露骨的, 公然的"
	}, {
	  "type": "adj",
	  "desc": "喧鬧的"
	}],
	"complete": false
  }, {
    "id": 3,
    "name": "detrimental",
    "meaning": [{
	  "type": "adj",
	  "desc": "有害的"
	}],
	"complete": true
  }, {
    "id": 4,
    "name": "obviate",
    "meaning": [{
	  "type": "vt",
	  "desc": "取消, 排除, 避免"
	}],
	"complete": false
  }, {
    "id": 5,
    "name": "poignant",
    "meaning": [{
	  "type": "adj",
	  "desc": "辛酸的, 慘痛的"
	}],
	"examples": [
	  "poignant memories of an unhappy childhood"
	],
	"complete": false
  }, {
    "id": 6,
    "name": "brazen",
    "meaning": [{
	  "type": "adj",
	  "desc": "無恥的, 厚臉皮的"
	}],
	"examples": [
	  "I saw the boy stealing money; but he is so brazen that he tried to say that I had stolen it.",
	  "How can you believe such a brazen lie? 你怎能相信如此厚顏無恥的謊言?"
	],
	"complete": false
  }];

  return {

    all: function() {
		// TODO: External URL does not work in Android
		
		/*var deferred = $q.defer();
		$http.get('/data/dictionary.json').then(function(response) {
			dictionary = response.data;
			deferred.resolve(dictionary);
        });
		return deferred.promise;*/
		return dictionary;
    },

    remove: function(word) {
		// Delete from json
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
