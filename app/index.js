require('babel/register')

var React = require('react')
var shuffle = require('lodash/collection/shuffle')
var times = require('lodash/utility/times')
var io = require('socket.io-client')()

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
      visibility: this.props.visible ? 'visible' : 'hidden',
      backgroundColor: this.props.fill ? '#c50202' : 'white'
    }

    return <div style={styles}></div>
  }
})

var Row = React.createClass({
  render() {
    var self = this

    var styles = {
      display: 'flex',
      alignItems: 'stretch',
      flex: 1
    }

    var pixels = this.props.data.map(function (cell, key) {
      return <Pixel {... cell} key={key}/>
    })
    return <div style={styles}>{pixels}</div>
  }
})

var Screen = React.createClass({
  componentDidMount() {
    var self = this

    io.on('uconnect', function (data) {
      console.log('connect')
      if (!coordinates.length) return
      times(200, self.makePixelVisible)
      self.setState(self.state)
    })
  },

  makePixelVisible() {
    var pixel = coordinates.pop()

    this.state.rows[pixel.x][pixel.y].visible = true
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

    var rows = this.state.rows.map(function (row, key) {
      return <Row data={row} key={key}/>
    })

    return <div style={styles}>{rows}</div>
  }
})

React.render(<Screen/>, document.querySelector('body'))
