
//分割含有空格的字符 2018-2-1 15:00
function splitStr(params) {
  if (params != null && params != "") {
    if (params.indexOf(" ")) {
      var result = params.split(" ")
      return result[1]
    }
  }
  return params
}

//按-分割 2018-2-13
function splitTime(params){
  if (params != null && params != "") {

    if (params.indexOf("-") != -1) {
      var result = params.split("-")
      return result[1] + "/" + result[2]
    }
  }
  return params
}

//拼上指定字符串
function appendStr(params){
  params = String(params)
  if (params != null && params != "") {
    if (params.indexOf("-") != -1 || !isNaN(params)) {
      return params + "级"
    }
  }
  return params
}

module.exports = {
  splitStr: splitStr,
  splitTime: splitTime,
  appendStr: appendStr,
}