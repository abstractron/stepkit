(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.Bumpkit=e()}}(function(){return function e(t,n,r){function i(a,u){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!u&&c)return c(a,!0);if(o)return o(a,!0);throw new Error("Cannot find module '"+a+"'")}var f=n[a]={exports:{}};t[a][0].call(f.exports,function(e){var n=t[a][1][e];return i(n?n:e)},f,f.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t){var n=function(){var e=this,t=e.createAnalyser();t.fftSize=32;var n=t.frequencyBinCount,r=new Uint8Array(n);return t.amp=function(){return t.getByteTimeDomainData(r),r[0]},t};t.exports={createAmplitudeAnalyser:n}},{}],2:[function(e,t){var n=function(e){var t=this,e=e||{},n=function(){this.duration=e.duration||.0625,this.output=e.connect||t.destination,this.envelope=function(){t.createGain()};var n=e.frequency||256;this.frequency=function(e){return e?(n=e,this):n},this.connect=function(e){return this.output=e,this},this.play=function(e){var e=e||t.currentTime,n=t.createOscillator(),r=t.createEdgeFader({when:e,duration:this.duration});return n.type=0,n.frequency.value=this.frequency(),n.connect(r),r.connect(this.output),t.trigger(n,{when:e,duration:this.duration}),this}};return new n};t.exports={createBeep:n}},{}],3:[function(e,t){var n=function(e){var e=e||{},t={};return t.output=e.connect||0,t.active=e.active||!0,t.pattern=e.pattern||[],t.connect=function(e){return t.output=e,t},t.play=function(e){return t.output.play(e),t},t.toggle=function(){return t.active=!t.active,t},window.addEventListener("step",function(e){var n=e.detail.step,r=e.detail.when;t.active&&1==t.pattern[n]&&t.play(r)}),t};t.exports={createClip:n}},{}],4:[function(e,t){var n=function(){var e=this;this.tempo=120,this.isPlaying=!1,this.loopLength=null,this.timeSignature=[4,4],this.stepResolution=16;var t=function(){return 60/e.tempo/4},n=0,r=0,i=0,o=new CustomEvent("step",{detail:{}}),a=function(t){if(!e.currentTime){e.createBufferSource()}o.detail.step=r,o.detail.when=t,window.dispatchEvent(o)},u=function(){for(var o=.1,c=25;n<e.currentTime+o;)a(n),n+=t(),r++,r==e.loopLength&&(r=0);i=setTimeout(function(){u()},c)},c=function(){e.isPlaying=!1,window.clearTimeout(i)};return this.playPause=function(){return e.isPlaying?c():(r=0,n=e.currentTime,u(),e.isPlaying=!e.isPlaying),this},this};t.exports=n},{}],5:[function(e,t){var n=function(e){var e=e||{},t=e.when||0,n=e.duration||0,r=e.fadeDuration||.005,i=this.createGain();return i.gain.linearRampToValueAtTime(0,this.currentTime+t),i.gain.linearRampToValueAtTime(1,this.currentTime+t+r),i.gain.linearRampToValueAtTime(1,this.currentTime+t+n-r),i.gain.linearRampToValueAtTime(0,this.currentTime+t+n),i};t.exports={createEdgeFader:n}},{}],6:[function(e,t){var n=e("./clock"),r=e("./mixer"),i=e("./clip"),o=e("./edge-fader"),a=e("./beep"),u=e("./sampler"),c=e("./peak-analyser"),f=e("./analyser"),s=function(){var e=new(window.AudioContext||window.webkitAudioContext);return e.trigger=function(e,t){var t={when:t.when||0,offset:t.offset||0,duration:t.duration||0};return e.start(t.when,t.offset||0),t.duration&&e.stop(t.when+t.duration),this},e.buffers={},e.loadBuffer=function(e,t){function n(n){i.decodeAudioData(n,function(n){i.buffers[e]=n,t&&t(n)})}function r(e,t){var n=new XMLHttpRequest;n.responseType="arraybuffer",n.open("GET",e,!0),n.send(),n.onload=function(){n.response||console.error("Could not load"),t(n.response)}}var i=this;return this.buffers[e]&&t&&t(this.buffers[e]),r(e,function(e){n(e)}),this},e.initClock=n,e.initClock(),e.createMixer=r.createMixer,e.createEdgeFader=o.createEdgeFader,e.createBeep=a.createBeep,e.createSampler=u.createSampler,e.createClip=i.createClip,e.createAmplitudeAnalyser=f.createAmplitudeAnalyser,e.analysePeaks=c.analysePeaks,e};t.exports=s},{"./analyser":1,"./beep":2,"./clip":3,"./clock":4,"./edge-fader":5,"./mixer":7,"./peak-analyser":8,"./sampler":9}],7:[function(e,t){var n=function(){var e=this,t={},n=function(){var t=e.createGain();return t.effectsNode=e.createGain(),t.mute=e.createGain(),t.volume=e.createGain(),t.effects=[],t.connect(t.effectsNode),t.effectsNode.connect(t.mute),t.mute.connect(t.volume),t.updateConnections=function(){if(t.effectsNode.disconnect(0),t.effects.length>0){t.effectsNode.connect(t.effects[0]);for(var e=0;e<t.effects.length-1;e++){console.log("multiple effects",e);var n=t.effects[e+1];t.effects[e].disconnect(0),t.effects[e].connect(n)}t.effects[t.effects.length-1].disconnect(0),t.effects[t.effects.length-1].connect(t.mute)}else t.effectsNode.connect(t.mute);return t},t.addEffect=function(e,n){var r=n||t.effects.length;return t.effects.splice(r,0,e),t.updateConnections(),t},t.removeEffect=function(e){return t.effects.splice(e,1),t.updateConnections(),t},t.connect=function(e){return t.volume.disconnect(0),t.volume.connect(e),t},t.toggleMute=function(){return t.mute.gain.value=1-t.mute.gain.value,t},t};return t.master=new n,t.master.connect(e.destination),t.tracks=[],t.addTrack=function(){var e=new n;return e.connect(t.master),t.tracks.push(e),t},t.removeTrack=function(e){return t.tracks.splice(e,1),t},t};t.exports={createMixer:n}},{}],8:[function(e,t){var n=function(e){for(var t=256,n=e.length/t,r=~~(n/10)||1,i=e.numberOfChannels,o=new Float32Array(t),a=0;i>a;a++)for(var u=e.getChannelData(a),c=0;t>c;c++){for(var f=~~(c*n),s=~~(f+n),l=0,d=f;s>d;d+=r){var p=u[d];p>l?l=p:-p>l&&(l=-p)}(0==a||l>o[c])&&(o[c]=l)}return o};t.exports={analysePeaks:n}},{}],9:[function(e,t){var n=function(e){var t=this,e=e||{},n=function(){this.output=e.connect||t.destination,this.offset=e.offset||0,this.duration=e.duration||.6;var n=e.buffer||0;this.buffer=function(e){return e?(n=e,this):n},this.connect=function(e){return this.output=e,this},this.play=function(e){var e=e||t.currentTime,n=t.createBufferSource(),r=t.createEdgeFader({when:e,duration:this.duration});return n.buffer=this.buffer(),n.connect(r),r.connect(this.output),t.trigger(n,{when:e,duration:this.duration}),this}};return new n};t.exports={createSampler:n}},{}]},{},[6])(6)});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
!function(L){if("object"==typeof exports)module.exports=L();else if("function"==typeof define&&define.amd)define(L);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Geomicons=L()}}(function(){return function L(e,A,t){function M(n,o){if(!A[n]){if(!e[n]){var i="function"==typeof require&&require;if(!o&&i)return i(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var a=A[n]={exports:{}};e[n][0].call(a.exports,function(L){var A=e[n][1][L];return M(A?A:L)},a,a.exports,L,e,A,t)}return A[n].exports}for(var r="function"==typeof require&&require,n=0;n<t.length;n++)M(t[n]);return M}({1:[function(L,e){var A=L("./paths"),t=L("./inject"),M={inject:function(L){var e=function(L){return L.replace(/-([a-z])/g,function(L){return L[1].toUpperCase()})};L.length||(L=[L]);for(var M=0;M<L.length;M++){var r=L[M].getAttribute("data-icon");r=e(r);var n=A[r];if(n)t(L[M],n);else{var o=[];for(var i in A)o.push(i);o=o.join(),console.error("No icon found for "+r+".\nGeomicons Open includes the following icons: \n"+o)}}}};e.exports=M},{"./inject":2,"./paths":3}],2:[function(L,e){e.exports=function(L,e){var A,t=document.createElementNS("http://www.w3.org/2000/svg","path");if("svg"==L.tagName)A=L.cloneNode(!0);else{A=document.createElementNS("http://www.w3.org/2000/svg","svg");for(var M=0;M<L.attributes.length;M++)A.setAttribute(L.attributes[M].name,L.attributes[M].value)}A.setAttribute("viewBox","0 0 32 32"),A.setAttribute("style","fill:currentcolor"),t.setAttribute("d",e),A.appendChild(t),L.parentNode.replaceChild(A,L)}},{}],3:[function(L,e){e.exports={bookmark:"M6 2 L26 2 L26 30 L16 24 L6 30 Z  ",calendar:"M2 4 L6 4 L6 2 A2 2 0 0 1 10 2 L10 4 L22 4 L22 2 A2 2 0 0 1 26 2 L26 4 L30 4 L30 10 L2 10 M2 12 L30 12 L30 30 L2 30  ",camera:"M0 6 L8 6 L10 2 L22 2 L24 6 L32 6 L32 28 L0 28 z M9 17 A7 7 0 0 0 23 17 A7 7 0 0 0 9 17  ",chat:"M32 16 A16 12 0 0 0 0 16 A16 12 0 0 0 16 28 L18 28 C20 30 24 32 28 32 C27 31 26 28 26 25.375 L26 25.375 A16 12 0 0 0 32 16  ",check:"M1 14 L5 10 L13 18 L27 4 L31 8 L13 26 z ",chevronDown:"M1 12 L16 26 L31 12 L27 8 L16 18 L5 8 z ",chevronLeft:"M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z ",chevronRight:"M12 1 L26 16 L12 31 L8 27 L18 16 L8 5 z ",chevronUp:"M1 20 L16 6 L31 20 L27 24 L16 14 L5 24 z ",clock:"M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 28 16 A12 12 0 0 1 16 28 A12 12 0 0 1 4 16 A12 12 0 0 1 16 4 M14 6 L14 17.25 L22 22 L24.25 18.5 L18 14.75 L18 6z ",close:"M4 8 L8 4 L16 12 L24 4 L28 8 L20 16 L28 24 L24 28 L16 20 L8 28 L4 24 L12 16 z ",cloud:"M7 14 A7 7 0 0 0 0 21 A7 7 0 0 0 7 28 H27 A5 5 0 0 0 32 23 A5 5 0 0 0 27 18 A10 10 0 0 0 28 14 A10 10 0 0 0 18 4 A10 10 0 0 0 8 14 A7 7 0 0 0 7 14  ",cog:"M14 0 H18 L19 6 L20.707 6.707 L26 3.293 L28.707 6 L25.293 11.293 L26 13 L32 14 V18 L26 19 L25.293 20.707 L28.707 26 L26 28.707 L20.707 25.293 L19 26 L18 32 L14 32 L13 26 L11.293 25.293 L6 28.707 L3.293 26 L6.707 20.707 L6 19 L0 18 L0 14 L6 13 L6.707 11.293 L3.293 6 L6 3.293 L11.293 6.707 L13 6 L14 0 z M16 10 A6 6 0 0 0 16 22 A6 6 0 0 0 16 10 ",compose:"M4 4 L16 4 L16 8 L8 8 L8 24 L24 24 L24 16 L28 16 L28 28 L4 28 z M26 2 L30 6 L16 20 L12 20 L12 16 z ",dribbble:"M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M5 11.5 A12 12 0 0 1 11 5 A46 46 0 0 1 13.5 9.25 A46 46 0 0 1 5 11.5 M15 4 A12 12 0 0 1 21.5 5.25 A46 46 0 0 1 17 7.75 A50 50 0 0 0 15 4 M4 16 A50 50 0 0 0 15 13 A46 46 0 0 1 16 15.5 A26 26 0 0 0 6 22.5 A12 12 0 0 1 4 16 M18.5 11.5 A50 50 0 0 0 25 8 A12 12 0 0 1 28 13.75 A26 26 0 0 0 19.75 14.5 A50 50 0 0 0 18.5 11.5 M17 19.5 A46 46 0 0 1 18 28 A12 12 0 0 1 8.75 25.5 A22 22 0 0 1 17 19.5 M20.75 18.25 A22 22 0 0 1 28 17.75 A12 12 0 0 1 22 26.5 A50 50 0 0 0 20.75 18.25 ",expand:"M16 4 L28 4 L28 16 L24 12 L20 16 L16 12 L20 8z M4 16 L8 20 L12 16 L16 20 L12 24 L16 28 L4 28z ",external:"M4 4 L12 4 L12 8 L8 8 L8 24 L24 24 L24 20 L28 20 L28 28 L4 28 z M16 4 L28 4 L28 16 L24 12 L16 20 L12 16 L20 8z ",facebook:"M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z ",file:"M4 2 L4 30 L28 30 L28 10 L20 2 z  ",folder:"M0 4 L0 28 L32 28 L32 8 L16 8 L12 4 z  ",geolocation:"M2 18 L30 2 L14 30 L14 18z ",github:"M0 18 C0 12 3 10 3 9 C2.5 7 2.5 4 3 3 C6 3 9 5 10 6 C12 5 14 5 16 5 C18 5 20 5 22 6 C23 5 26 3 29 3 C29.5 4 29.5 7 29 9 C29 10 32 12 32 18 C32 25 30 30 16 30 C2 30 0 25 0 18 M3 20 C3 24 4 28 16 28 C28 28 29 24 29 20 C29 16 28 14 16 14 C4 14 3 16 3 20 M8 21 A1.5 2.5 0 0 0 13 21 A1.5 2.5 0 0 0 8 21 M24 21 A1.5 2.5 0 0 0 19 21 A1.5 2.5 0 0 0 24 21 z ",grid:"M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z ",heart:"M0 10 C0 6, 3 2, 8 2 C12 2, 15 5, 16 6 C17 5, 20 2, 24 2 C30 2, 32 6, 32 10 C32 18, 18 29, 16 30 C14 29, 0 18, 0 10  ",home:"M16 0 L32 16 L28 16 L28 30 L20 30 L20 20 L12 20 L12 30 L4 30 L4 16 L0 16 Z ",info:"M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6  ",link:"M0 16 A8 8 0 0 1 8 8 L14 8 A8 8 0 0 1 22 16 L18 16 A4 4 0 0 0 14 12 L8 12 A4 4 0 0 0 4 16 A4 4 0 0 0 8 20 L10 24 L8 24 A8 8 0 0 1 0 16z M22 8 L24 8 A8 8 0 0 1 32 16 A8 8 0 0 1 24 24 L18 24 A8 8 0 0 1 10 16 L14 16 A4 4 0 0 0 18 20 L24 20 A4 4 0 0 0 28 16 A4 4 0 0 0 24 12z  ",list:"M3 8 A3 3 0 0 0 9 8 A3 3 0 0 0 3 8 M12 6 L28 6 L28 10 L12 10z M3 16 A3 3 0 0 0 9 16 A3 3 0 0 0 3 16 M12 14 L28 14 L28 18 L12 18z M3 24 A3 3 0 0 0 9 24 A3 3 0 0 0 3 24 M12 22 L28 22 L28 26 L12 26z ",lock:"M22 16 L22 12 A6 6 0 0 0 10 12 L10 16 z M4 16 L6 16 L6 12 A10 10 0 0 1 26 12 L26 16 L28 16 L28 30 L4 30 z  ",mail:"M0 6 L16 16 L32 6 z M0 9 L0 26 L32 26 L32 9 L16 19 z  ",musicNote:"M0 24 A6 6 0 0 0 12 24 V8 H26 V18 A6 6 0 0 0 18 24 A6 6 0 0 0 30 24 V2 H8 V18 A6 6 0 0 0 0 24 ",next:"M4 4 L24 14 V4 H28 V28 H24 V18 L4 28 z ",no:"M16 0 A16 16 0 0 0 0 16 A16 16 0 0 0 16 32 A16 16 0 0 0 32 16 A16 16 0 0 0 16 0 M16 6 A10 10 0 0 1 20.675 7 L7 20.675 A10 10 0 0 1 6 16 A10 10 0 0 1 16 6 M26 16 A10 10 0 0 1 16 26 A10 10 0 0 1 11.325 25 L25 11.325 A10 10 0 0 1 26 16 ",pause:"M4 4 H12 V28 H4 z M20 4 H28 V28 H20 z ",picture:"M0 4 L0 28 L32 28 L32 4 z M4 24 L10 10 L15 18 L18 14 L24 24z M25 7 A4 4 0 0 1 25 15 A4 4 0 0 1 25 7  ",pin:"M4 12 A12 12 0 0 1 28 12 C28 20, 16 32, 16 32 C16 32, 4 20 4 12 M11 12 A5 5 0 0 0 21 12 A5 5 0 0 0 11 12 Z  ",play:"M4 4 L28 16 L4 28 z ",previous:"M4 4 H8 V14 L28 4 V28 L8 18 V28 H4 z ",refresh:"M16 2 A14 14 0 0 0 2 16 A14 14 0 0 0 16 30 A14 14 0 0 0 26 26 L 23.25 23 A10 10 0 0 1 16 26 A10 10 0 0 1 6 16 A10 10 0 0 1 16 6 A10 10 0 0 1 23.25 9 L19 13 L30 13 L30 2 L26 6 A14 14 0 0 0 16 2 ",repost:"M7 7 L14 14 L9 14 L9 20 L16 20 L16 24 L5 24 L5 14 L0 14 z M16 8 L27 8 L27 18 L32 18 L25 25 L18 18 L23 18 L23 12 L16 12z ",search:"M12 0 A12 12 0 0 0 0 12 A12 12 0 0 0 12 24 A12 12 0 0 0 18.5 22.25 L28 32 L32 28 L22.25 18.5 A12 12 0 0 0 24 12 A12 12 0 0 0 12 0 M12 4 A8 8 0 0 1 12 20 A8 8 0 0 1 12 4  ",shoppingCart:"M0 4 L5 4 L6 8 L30 8 L28 22 L6 22 L3.5 6 L0 6z M10 24 A3 3 0 0 0 10 30 A3 3 0 0 0 10 24 M24 24 A3 3 0 0 0 24 30 A3 3 0 0 0 24 24 ",skull:"M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12 ",speakerVolume:"M2 12 L8 12 L16 6 L16 26 L8 20 L2 20 z M32 16 A16 16 0 0 1 27.25 27.375 L25.25 25.25 A13 13 0 0 0 29 16 A13 13 0 0 0 25.25 6.75 L27.25 4.625 A16 16 0 0 1 32 16 M25 16 A9 9 0 0 1 22.375 22.375 L20.25 20.25 A6 6 0 0 0 22 16 A6 6 0 0 0 20.25 11.75 L22.375 9.625 A9 9 0 0 1 25 16  ",speaker:"M2 12 L8 12 L16 6 L16 26 L8 20 L2 20 z  ",star:"M16 0 L21 11 L32 12 L23 19 L26 31 L16 25 L6 31 L9 19 L0 12 L11 11 ",tag:"M0 18 L16 2 L29 3 L30 16 L14 32 z M20 9 A3 3 0 0 0 26 9 A3 3 0 0 0 20 9  ",trash:"M4 4 L10 4 L12 2 L20 2 L22 4 L28 4 L29 8 L3 8 z M5 10 L27 10 L26 30 L6 30 z  ",triangleDown:"M4 8 H28 L16 26 z ",triangleLeft:"M24 4 V28 L6 16 z ",triangleRight:"M8 4 V28 L26 16 z ",triangleUp:"M4 24 H28 L16 6 z ",twitter:"M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4 ",user:"M10 8 A6 6 0 0 1 22 8 L22 12 A6 6 0 0 1 10 12 z M2 26 C3 23 10 20 14 20 L18 20 C22 20 29 23 30 26 L30 28 L2 28 z ",video:"M0 6 L0 26 L24 26 L24 19 L32 23 L32 9 L24 13 L24 6 z  ",warning:"M15 0 H17 L32 29 L31 30 L1 30 L0 29 z M19 8 L13 8 L14 20 L18 20 z M16 22 A3 3 0 0 0 16 28 A3 3 0 0 0 16 22  "}},{}]},{},[1])(1)});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){

module.exports = ['$scope', '$window', 'bumpkit', function($scope, $window, bumpkit) {

  $scope.bumpkit = bumpkit;

  $scope.currentStep = 0;

  $window.addEventListener('step', function(e) {
    if(!$scope.$$phase) {
      $scope.$apply(function() {
        $scope.currentStep = e.detail.step;
      });
    }
  });


}];

},{}],4:[function(require,module,exports){

module.exports = ['$scope', function($scope) {
  //console.log('TransportCtrl');
}];

},{}],5:[function(require,module,exports){

var Geomicons = require('geomicons-open');

module.exports = function() {
  return {
    scope: true,
    link: function(scope, element, attributes) {
      Geomicons.inject(element[0]);
    }
  }
};

},{"geomicons-open":2}],6:[function(require,module,exports){

module.exports = function() {
  return {
    scope: 'true',
    //controller: 'SequencerCtrl',
    templateUrl: 'templates/sequencer.html',
    link: function(scope, element, attributes) {
    }
  }
};

},{}],7:[function(require,module,exports){

module.exports = function() {
  return {
    scope: 'true',
    controller: 'TransportCtrl',
    templateUrl: 'templates/transport.html',
    link: function(scope, element, attributes) {
    }
  }
};

},{}],8:[function(require,module,exports){

'use strict';

var Bumpkit = require('bumpkit');

var app = angular.module('app', ['ngTouch']);

app.service('bumpkit', require('./services/bumpkit'));

app.directive('transport', require('./directives/transport'));
app.directive('sequencer', require('./directives/sequencer'));
app.directive('icon', require('./directives/geomicons'));


app.controller('MainCtrl', require('./controllers/main'));
app.controller('TransportCtrl', require('./controllers/transport'));


},{"./controllers/main":3,"./controllers/transport":4,"./directives/geomicons":5,"./directives/sequencer":6,"./directives/transport":7,"./services/bumpkit":9,"bumpkit":1}],9:[function(require,module,exports){

var Bumpkit = require('bumpkit');

module.exports = function($http) {

  bumpkit = new Bumpkit();

  bumpkit.kits = [];

  bumpkit.mixer = bumpkit.createMixer();

  bumpkit.tracks = [];

  for (var i = 0; i < 8; i++) {
    bumpkit.mixer.addTrack();
    bumpkit.tracks[i] = {};
    //bumpkit.tracks[i].sampler = bumpkit.createSampler({ connect: bumpkit.mixer.tracks[i] });
    bumpkit.tracks[i].sampler = bumpkit.createSampler({ });
    bumpkit.tracks[i].clip = bumpkit.createClip({ connect: bumpkit.tracks[i].sampler });
    bumpkit.tracks[i].clip.pattern = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  }

  bumpkit.metronome = {};
  bumpkit.metronome.beep = bumpkit.createBeep().frequency(512);
  bumpkit.metronome.clip = bumpkit.createClip({ connect: bumpkit.metronome.beep });
  bumpkit.metronome.clip.pattern = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];
  bumpkit.metronome.clip.active = false;

  bumpkit.loopLength = 16;


  $http.get('data/kits.json').success(function(response) {
    bumpkit.kits = response;
    loadKit(bumpkit.kits[0]);
  });

  function loadKit(kit) {
    for (var i = 0; i < kit.samples.length; i++) {
      (function(index) {
        bumpkit.loadBuffer(kit.samples[index].url, function(response) {
          bumpkit.tracks[index].sampler.buffer(response);
          //bumpkit.tracks[index].sampler.play();
          //console.log(index, bumpkit.tracks[index].sampler.buffer());
        })
      })(i);
    }
  }

  return bumpkit;

};

},{"bumpkit":1}]},{},[8])