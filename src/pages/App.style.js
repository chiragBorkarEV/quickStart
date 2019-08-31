export default theme => ({
  buttonPanel: {
    position: 'absolute',
    right: 250
  },
  multiSelect: {
    position: 'absolute',
    width: '275px',
    fontsize: '14px',
    fontfamily : 'DinProRegular, sans-serif',
    right: 615
  },
  content: {
    marginTop: 104,
    padding: `${theme.spacing.unit * 2}px 24px`,
    width: '100%',
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2
  },
  showCell: {
    background: 'white',
    borderLeft: {
      width: '1px',
      style: 'solid',
      color: 'lightgrey'
    },
    borderRight: {
      width: 1,
      style: 'solid',
      color: 'lightgrey'
    },
    borderBottom: {
      width: 1,
      style: 'solid',
      color: 'lightgrey'
    },
  },

  showClientName: {
    fontWeight: 'bold'
  },

  showClientProperties: {
    fontStyle: 'italic'
  },

  gridPostion: {
    alignItems: 'center'
  }

});