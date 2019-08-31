import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import style from './TrendTile.style'

import { LineChart } from '@lord-abbett/common-components'

class TrendTile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { classes, theme, data } = this.props

    return (
      <div>
        <Grid container spacing={ 16 }>
          <Grid item xs={ 12 }>
            <Typography
              className={ `${classes.tileTitle} ${classes.DinProBold}` }
              variant="body1"
              align="left">TRENDS</Typography>
          </Grid>

          <Grid item xs={ 12 }>
            <LineChart
              lines={ [
                {
                  data: data.GROSS_FLOWS_MONTHLY_EXISTING,
                  label: 'Existing',
                  color: theme.palette.gold[500]
                },
                {
                  data: data.GROSS_FLOWS_MONTHLY_NEW,
                  label: 'New',
                  color: theme.palette.primary[500]
                }
              ] }
              height={ 221 }
              dataPoints={ true }/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

TrendTile.propTypes = {
  data: PropTypes.shape({
    AUM_MONTHLY: PropTypes.array,
    GROSS_FLOWS_MONTHLY_EXISTING: PropTypes.array,
    GROSS_FLOWS_MONTHLY_NEW: PropTypes.array
  }).isRequired
}

export default withStyles(style, { withTheme: true })(TrendTile)