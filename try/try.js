let str = "abcabcd";
let substr = "bc";
let removed ="";
// console.log(str.indexOf(substr)); 
while(str.indexOf(substr)>-1){
    let start = str.indexOf(substr)
     removed = str.slice(0,start) + str.slice(substr.length , str.length)
}


console.log(removed); // "abcdefghijklmnoprstuv"