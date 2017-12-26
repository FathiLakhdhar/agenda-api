dateStr = "2017-01-30"
bool = /^([0-9]{4})-([0][1-9]|[1][0-2])-([0-2][0-9]|[3][0-1])$/.test(dateStr)
date = new Date(dateStr)
console.log(bool && date.toString()!='Invalid Date')
