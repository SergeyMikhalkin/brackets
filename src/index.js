module.exports = function check(str, bracketsConfig) {

  let stack = [];
  let str_length = str.length;
  if (str_length % 2 != 0) return false;

  for (let i = 0; i < str_length; i++) {
    if (bracketsConfig.find(item => item[0] == str[i]) != undefined) {
      if (!isMirror(str[i], bracketsConfig)) stack.push(str[i]); // find open bracket 
      else {
        if (stack.includes(str[i]) == false) stack.push(str[i]);
        else {
          if (str[i] != stack[stack.length - 1]) return false;
          else stack.pop();
        }
      }
    }
    else { // if bracket is closed index of subarray should be the same as the last one  
      if (stack.length == 0) return false;
      let lastOpen = stack.pop();
      let opositToCurrent = bracketsConfig.find(item => item[0] == lastOpen)[1];
      if (str[i] != opositToCurrent) return false;
    }
  }

  return stack.length == 0 ? true : false;

}

function isMirror(char, bracketsConfig) {
  let item = bracketsConfig.find(item => item[0] == char);
  if (item == undefined) return false;
  return item[0] == item[1];
}