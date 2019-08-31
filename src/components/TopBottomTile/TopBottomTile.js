import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import style from './TopBottomTile.style'

import { format } from 'd3-format'

import { BarChart } from '@lord-abbett/common-components';
import ButtonPanel from '../ButtonPanel/ButtonPanel'

class TopBottomTile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedDimension: 'CONSULTANT',
      buttons: [
        { name: "CONSULTANT", label: "Consultant" },
        { name: "CLIENT", label: "Client" },
        { name: "STRATEGY", label: "Strategy" },
        { name: "CHANNEL", label: "Channel" }
      ]
    }

    this.selectDimension = this.selectDimension.bind(this)
  }

  formatData(data) {
    data = data.map(d => ({
      ...d,
      text: format('($.2s')(d.value).replace(/G/, 'B')
    }))

    const descendingSortedData = data.sort((a, b) => (b.value - a.value))
    const top5 = descendingSortedData.slice(0, 5)
    const bottom5 = descendingSortedData.slice(descendingSortedData.length - 5).reverse()

    return {
      top5,
      bottom5
    }
  }

  selectDimension(name, state) {
    this.setState({
      selectedDimension: name
    })
  }

  render() {
    const { theme, classes, data } = this.props

    const selectedData = this.formatData(data[this.state.selectedDimension])
  
    return (
      <div>
        <Grid container spacing={ 32 }>
          <Grid item xs={ 12 }>
            <Typography
              className={ `${classes.tileTitle} ${classes.DinProBold}` }
              variant="body1"
              align="left">TOP 5/BOTTOM 5</Typography>
          </Grid>
  
          <Grid item xs={ 6 }>
            <BarChart
              data={ selectedData.top5 }
              dimLabel="Client"
              valueLabel="Top 5 AUM"
              valueColor={ theme.palette.gold[600] }
              barColor={ theme.palette.primary[300] } />
          </Grid>
  
          <Grid item xs={ 6 }>
            <BarChart
              data={ selectedData.bottom5 }
              dimLabel="Client"
              valueLabel="Bottom 5 AUM"
              valueColor={ theme.palette.gold[600] }
              barColor={ theme.palette.negative[300] } />
          </Grid>
  
          <Grid item xs={ 12 }>
            <ButtonPanel
              buttons={ this.state.buttons }
              initialSelections={ ['CONSULTANT'] }
              onClick={ this.selectDimension }
              style={ {
                // marginTop: 20,
                width: '20%',
                height: 25,
                paddingTop: 5,
                paddingBottom: 5,
                border: `1px solid ${theme.palette.grey[300]}`
              } } />
          </Grid>
        </Grid>
      </div>
    )
  }
}

TopBottomTile.propTypes = {
  data: PropTypes.shape({
    CONSULTANT: PropTypes.array,
    CLIENT: PropTypes.array,
    STRATEGY: PropTypes.array,
    CHANNEL: PropTypes.array
  }).isRequired
}

export default withStyles(style, { withTheme: true })(TopBottomTile)