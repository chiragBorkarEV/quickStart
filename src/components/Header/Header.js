import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './Header.styles'

import {MaterialDatePicker} from '@lord-abbett/common-components';


const Header = props => {
  const { classes, children, title, showCalendar, calendarDates } = props

  return (
    <div data-test="header-container">
      <AppBar data-test="app-bar"
        position="fixed" 
        classes={{
          root: classes.root
        }}>
        <Toolbar data-test="toolbar" className={ classes.toolbar }>
          <Typography data-test="header-label"
            className={ classes.title }
            variant="h5" 
            color="inherit">{ title }</Typography>

          { children }

          { showCalendar ?
              <div className={classes.calendar}>
            <MaterialDatePicker data-test="calendar"
              defaultValue={ calendarDates.selectedDate }
              minDate={ calendarDates.minDate }
              maxDate={ calendarDates.maxDate } />  </div> :
              null }
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  showCalendar: PropTypes.bool.isRequired,
  calendarDates: PropTypes.shape({
    selectedDate: PropTypes.string.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired
  }).isRequired
}

Header.defaultProps = {
  showCalendar: false,
  calendarDates: {
    selectedDate: new Date().toString(),
    minDate: '2000-01-01',
    maxDate: '2099-12-31'
  }
}

export default withStyles(styles)(Header)
