
var qs = function(par){return document.querySelector(par)};
var qsa = function(par){return document.querySelectorAll(par)};

function basicSub(code) {
  return code.replace(/\(\.(\w{0,20})\)/g,'<span class="$1">$1</span>').
  replace(/\(\,(\w{0,20})\)/g,'<ol class="$1">$1</ol>').
    replace(/\(\:(\w{0,20})\)/g,'<input text class="$1">').
  //      replace(/\(\;(\w{0,20})\)/g,'<input text class="$1">') //
        replace(/\(\;(\w{0,20})\)/g,'<textarea class="$1">$1</textarea>')
}

function removeDuplicates(arr){
  return arr.reduce(function(c,x){
    if(c.indexOf(x) < 0){
       c.push(x)
       return c;
     }
    else{return c};
  },[])
}

function eventSetup(id){
  var a = qs("input." + id);
  var b = qs("span." + id);

  a.addEventListener("input", function() { b.textContent = a.value;  });
};

function eventSetup2(id){
  var a = qs("input." + id) || qs("textarea." + id);
  var b = Array.from(qsa("span." + id)).concat(  Array.from(qsa("ol." + id)));

  for(var iter1 = 0; iter1 < b.length; iter1++){
    console.log(b[iter1].tagName + "   " + id + " " + b.length + "  " + iter1 + "  " +id + "  " + b[iter1].textContent);
    (function(newb){

    if(newb.tagName==="OL"){a.addEventListener("input", function() {
      console.log("OL");
      var olstr = a.value.split("\n").map(function(x){return "<li>" + x + "</li>"}).join("")
       newb.innerHTML = olstr; });
     }
    else{a.addEventListener("input", function() { newb.textContent = a.value; });}

    newb.addEventListener("click", function() { a.focus() });
    a.addEventListener("focus", function() { newb.classList.add("focus") });
    a.addEventListener("blur", function() { newb.classList.remove("focus") });

  //  classList.remove("CLASS_NAME");
  }(b[iter1]))

  }
};

function doit(){
var all = document.body//qs("div");
var reg = /\(\.(\w{0,20})\)/g;
var reg2 = /\(\,(\w{0,20})\)/g;
var match, matches = [];


while (match = reg.exec(all.innerHTML)){
  matches.push(match[1]);
}
while (match = reg2.exec(all.innerHTML)){
  matches.push(match[1]);
}
matches =  removeDuplicates(matches);
console.log(matches);

all.innerHTML= basicSub(all.innerHTML);

console.log(all.innerHTML);

matches.forEach(function(x){
    try{eventSetup2(x)}
    catch(e){console.log(e)}
});
}
