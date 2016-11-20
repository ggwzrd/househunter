'use strict';

angular.module('houseHunterApp')

 .filter('divideByCategories', function(){
   return function(array, scope){
     if(array){
       var offers = [], requests = [];
          var index = 0;
          angular.forEach(array, function(item) {
              if(item.message){
                var words = item.message.split(" "), word="";
                var rating = 0, counter = 0, i=0, maxRating = words.length/10;  // percentuage of possibility that the post in for sale (from 1 to 5)
                var w = [];
                do{
                  word = words[i];
                  if((word[word.length-1]==="?")||(word[word.length-1]=== ".")||(word[word.length-1]=== ":")||(word[word.length-1]=== "!")){
                    word = word.slice(0, -1);
                    counter=0;
                  }else if(word[word.length-1]===","){
                    word = word.slice(0, -1);
                  }
                  word = word.toLowerCase();
                  switch(word){
                    case "i":
                      (counter>0) ? rating+=2 : rating ++;
                      w.push(word)
                    break;
                    case "im":
                      (counter>0) ? rating+=2 : rating ++;
                      w.push(word);
                    break;
                    case "i'm":
                      (counter>0) ? rating+=2 : rating ++;
                      w.push(word);
                    break;
                    case "am":
                      (counter>0) ? rating+=2 : rating ++;
                      w.push(word);
                    break;
                    case "iam":
                      (counter>0) ? rating+=2 : rating ++;
                      w.push(word);
                    break;
                    case "afford":
                      if(words[i-2] !== "you") rating +=2;
                      w.push(word);
                    break;
                    case "looking":
                      if(counter>0){
                        if(words[i+1] === "forward")
                          rating+=0;
                        else
                          if(rating >= 3) rating *=(maxRating/2); else rating+=3;
                      }else{
                        rating ++;
                      }
                      w.push(word);
                    break;
                    case "searching":
                      if(counter>0){
                        if(rating >= 3) rating *=(maxRating/2); else rating+=3;
                      }else{
                        rating ++;
                      }
                      w.push(word);
                    break;
                    case "finding":
                      if(counter>0){
                        if(rating >= 3) rating *=(maxRating/2); else rating+=3;
                      }else{
                        rating ++;
                      }
                      w.push(word);
                    break;
                    case "lookout":
                      if(counter>0){
                        if(rating >= 3) rating *=(maxRating/2); else rating+=3;
                      }else{
                        rating ++;
                      }
                      w.push(word);
                    break;
                    case "seeking":
                      if(counter>0){
                        if(rating >= 3) rating *=2; else rating+=3;
                      }else{
                        rating ++;
                      }
                      w.push(word);
                    break;
                    case "budget":
                      if(words[i-1] === "your") rating -= 2; else rating +=(maxRating-rating);
                      w.push(word);
                    break;
                    case "help": rating ++;
                      w.push(word);
                    break;
                    case "renting": rating=0;
                      w.push(word);
                    break;
                    case "rent":
                      if(words[i+1] === "out") rating = 0;
                      else if(words[i-1] === "to") rating+=2;
                      w.push(word);
                    break;
                    case "new":
                      if(counter>0){ if(rating > 0) rating +=2; else rating ++; }
                      w.push(word);
                    break;
                    case "moved":
                      (counter>0) ? rating+=4 : rating ++;
                      w.push(word);
                    break;
                    case "desperate":
                      if(counter>0){ if(rating > 0) rating +=2; else rating ++; }
                      w.push(word);
                    break;
                    case "studying":
                      if(counter>0){ if(rating > 0) rating +=2; else rating ++; }
                      w.push(word);
                    break;
                    case "tenant": rating=0;
                      w.push(word);
                    break;
                  }
                  counter++;
                  i++;
                }while((rating<maxRating)&&(words.length > i));
                var ids = item.id.split("_");
                item.group_id = ids[0];
                item.post_id = ids[1];
                if(rating<maxRating){
                  item.rating = rating;
                  item.maxRating = maxRating;
                  item.words = w;
                  item.picture = scope.pictures[index];
                  // offers[item.id] = item;
                  offers.push(item);
                }else{
                  item.rating = rating;
                  item.maxRating = maxRating;
                  item.words = w;
                  item.picture = scope.pictures[index];
                  // requests[item.id]= item;
                  requests.push(item);
                }
              }else{
                scope.feedData.splice(index, 1);
                scope.pictures.splice(index, 1);
              }
              index ++;
            });
          scope.offers = offers;
          scope.requests = requests;
          console.log("filtration Compleated");
          return offers;
        }else{
          console.log("Empty array");
          return false;
        }
   };
 });
