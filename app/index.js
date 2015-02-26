require('babel/register')

var React = require('react')

var Pixel = React.createClass({
  render: function () {
    var styles = {
      float: 'left',
      width: 10,
      height: 10,
      visibility: 'visible'
    }

    return <div style={styles}>{this.props.char}</div>
  }
})

var Row = React.createClass({
  render: function () {
    var styles = {
      color: '#c50202',
      display: 'flex',
      width: '100%',
      height: 10
    }

    var pixels = this.props.data.map(function (char) {
      return <Pixel char={char} />
    })
    return <div style={styles}>{pixels}</div>
  }
})

var Screen = React.createClass({
  render: function () {
    var styles = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }

    var rows = this.props.rows.map(function (row) {
     return <Row data={row} />
    })

    return <div style={styles}>{rows}</div>
  }
})

React.render(<Screen rows={require('./cat.json')}/>, document.querySelector('body'))
