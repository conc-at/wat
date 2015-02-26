var fs = require('fs')
var join = require('path').join

var cat = (fs.readFileSync(join(__dirname, 'cat.txt')) + '').split('\n').filter(function (line) {
  return !!line.trim()
})
.map(function (line) {
  return line.split('').map(function (char) {
    // return char === '+' ? '█' : ' '
    return char === '+' ? true : false
  })
})

fs.writeFileSync(join(__dirname, '../app/cat.json'), JSON.stringify(cat, null, 2))
