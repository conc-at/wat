require('babel/register')

var React = require('react')
var shuffle = require('lodash/collection/shuffle')
var times = require('lodash/utility/times')

var coordinates = []
var cat = require('./cat.json').map(function (row, x) {
  return row.map(function (fill, y) {
    coordinates.push({x, y})
    return {
      fill,
      visible: false
    }
  })
})
coordinates = shuffle(coordinates)

var Pixel = React.createClass({
  render() {
    var styles = {
      float: 'left',
      flex: 1,
      transition: 'opacity 0.5s ease-in',
      opacity: this.props.visible ? '1' : '0',
      backgroundColor: this.props.fill ? '#c50202' : 'white'
    }

    return <div style={styles}></div>
  }
})

var Row = React.createClass({
  render() {
    var styles = {
      display: 'flex',
      alignItems: 'stretch',
      flex: 1
    }

    var pixels = this.props.data.map(function (cell) {
      return <Pixel {... cell}/>
    })
    return <div style={styles}>{pixels}</div>
  }
})

var Screen = React.createClass({
  componentWillMount() {
    var self = this
    var interval = setInterval(function () {
      if (!coordinates.length) return clearInterval(interval)

      times(200, function () {
        var pixel = coordinates.pop()

        self.state.rows[pixel.x][pixel.y].visible = true
      })
      self.setState(self.state)
    }, 500)
  },

  getInitialState() {
    return {
      rows: cat
    }
  },

  render() {
    var styles = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }

    var rows = this.state.rows.map(function (row) {
      return <Row data={row} />
    })

    return <div style={styles}>{rows}</div>
  }
})

React.render(<Screen/>, document.querySelector('body'))
