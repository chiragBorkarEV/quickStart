export default theme => ({
  root: {
    margin: '0 5px',
    boxShadow: 'none'
  },
  containedPrimary: {
    backgroundColor: theme.palette.primary[300],
    '&:hover': {
      backgroundColor: theme.palette.primary[300]
    }
  },
  selected: {
    backgroundColor: theme.palette.primary[700],
    '&:hover': {
      backgroundColor: theme.palette.primary[700]
    },
  },
  textPrimary: {
    color: theme.palette.grey[700]
  },
  textSecondary: {
    color: 'white'
  },
  text: {
    lineHeight: '16px'
  },
  button: {
    minHeight: 0
  }
})