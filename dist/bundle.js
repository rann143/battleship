(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,i(r.key),r)}}function r(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function i(e){var n=function(e,n){if("object"!=t(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var i=r.call(e,"string");if("object"!=t(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==t(n)?n:n+""}var o=function(){return r((function t(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];e(this,t),this.length=n,this.hits=r,this.sunk=i}),[{key:"hit",value:function(){return this.hits++,this.isSunk(),this.hits&&this.sunk}},{key:"isSunk",value:function(){return this.hits===this.length?(this.sunk=!0,this.sunk):this.sunk}}])}(),a=function(){return r((function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;e(this,t),this.missedAttacks=n,this.attempted=r,this.numberOfShips=i,this.board=this.buildBoard()}),[{key:"placeShip",value:function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=new o(e);if(!0===n){for(var i=t[1],a=0;a<e;a++){if(!1===this.isOnBoard([t[0],i]))return"Can't Reach [".concat(t[0],", ").concat(i,"]: not on board");i++}i=t[1];for(var u=0;u<e;u++){if(!1===this.isEmpty([t[0],i]))return"A Ship Is Already At [".concat(t[0],", ").concat(i,"]");i++}i=t[1];for(var c=0;c<e;c++)this.board[t[0]][i]=r,i++}if(!1===n){for(var s=t[0],l=0;l<e;l++){if(!1===this.isOnBoard([s,t[1]]))return"Can't Reach [".concat(s,", ").concat(t[1],"]: not on board");s++}s=t[0];for(var h=0;h<e;h++){if(!1===this.isEmpty([s,t[1]]))return"A Ship Is Already At [".concat(s,", ").concat(t[1],"]");s++}s=t[0];for(var f=0;f<e;f++)this.board[s][t[1]]=r,s++}return this.board}},{key:"receiveAttack",value:function(t,e){if(!0===this.attempted.includes("[".concat(t,", ").concat(e,"]")))return"Already Tried This Coordinate";if(this.attempted.push("[".concat(t,", ").concat(e,"]")),!0===this.isEmpty([t,e]))return this.missedAttacks.push([t,e]),this.missedAttacks;var n=this.board[t][e];return n.hit(),!0===n.sunk?(this.numberOfShips--,this.numberOfShips):n}},{key:"isEmpty",value:function(t){return null===this.board[t[0]][t[1]]}},{key:"isOnBoard",value:function(t){return!(t[0]<0||t[0]>10||t[1]<0||t[1]>10)}},{key:"areAllShipsSunk",value:function(){return this.numberOfShips<=0}},{key:"buildBoard",value:function(){for(var t=[],e=0;e<10;e++){t[e]=[];for(var n=0;n<10;n++)t[e].push(null)}return t}}])}(),u=function(){return r((function t(n){e(this,t),this.name=n,this.attemptedMap=this.buildAttemptedMap()}),[{key:"takeShotCPU",value:function(){var t=this.filter(this.attemptedMap),e=t[Math.floor(Math.random()*t.length)];return this.attemptedMap[e[0]][e[1]]="x",e}},{key:"takeShotHuman",value:function(t,e){return[t,e]}},{key:"buildAttemptedMap",value:function(){for(var t=[],e=0;e<10;e++){t[e]=[];for(var n=0;n<10;n++)t[e].push(null)}return t}},{key:"filter",value:function(t){for(var e=[],n=0;n<t.length;n++)for(var r=0;r<t.length;r++)null===t[n][r]&&e.push([n,r]);return e}}])}();var c=document.createElement("h1");c.textContent="Hello There!",c.classList.add("blur-back"),document.body.appendChild(c);var s=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new u("You"),e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new u("CPU"),n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new a,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new a;n.placeShip([1,1],3),n.placeShip([0,5],5,!1),r.placeShip([1,1],3),r.placeShip([0,5],5,!1);var i=t;function o(){i=i===t?e:t}var c=function(){return i},s=r;function l(){s=s===r?n:r}var h=function(){return s};return{playRound:function(i,a){if(c()===t&&r.receiveAttack(i,a),c()===e){var u=e.takeShotCPU();n.receiveAttack(u[0],u[1])}if(1==!!h().areAllShipsSunk())return alert("".concat(c().name," has won!")),"Game has ended";o(),l()},switchPlayer:o,getActivePlayer:c,switchBoardUnderAttack:l,getBoardUnderAttack:h}}();console.log(s.getActivePlayer()),console.log(s.getBoardUnderAttack()),console.log(s.playRound(1,1)),console.log(s.getActivePlayer()),console.log(s.getBoardUnderAttack()),console.log(s.playRound()),console.log(s.getActivePlayer()),console.log(s.getBoardUnderAttack())})();