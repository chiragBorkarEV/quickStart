import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './ButtonPanel.style'

class ButtonPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedButtons: props.toggle ? 
        props.initialSelections : 
        [props.initialSelections[0]]
    }

    this.handleClick.bind(this)
  }

  handleClick(buttonName) {
    let newSelectedState
    if(this.props.toggle === true ) {
      const buttonIndex = this.state.selectedButtons.indexOf(buttonName)

      if(buttonIndex > -1) {
        newSelectedState = [
          ...this.state.selectedButtons.slice(0, buttonIndex),
          ...this.state.selectedButtons.slice(buttonIndex + 1)
        ]
      } else newSelectedState = [...this.state.selectedButtons, buttonName]
    } else newSelectedState = [buttonName]
    
    this.setState({
      selectedButtons: newSelectedState
    })

    this.props.onClick(buttonName, newSelectedState)
  }

  render() {
    const { classes, buttons, style, selectedColor, unselectedColor } = this.props
    const { selectedButtons } = this.state

    return (
      <div data-test="button-panel-container">
        { buttons.map(button => 
          <Button data-test="button"
            classes={ {
              root: classes.root,
              containedPrimary: classes.containedPrimary
            } }
            className={ `${selectedButtons.indexOf(button.name) > -1 ? classes.selected : null}
              ${classes.button}` }
            selected-test={ selectedButtons.indexOf(button.name) > -1 ? 'true' : 'false'}
            style={ {
              ...style,
              backgroundColor: selectedButtons.indexOf(button.name) > -1 ? selectedColor : unselectedColor
            }}
            key={ button.name }
            variant="contained"
            size="small"
            color="primary"
            disableRipple={ true }
            onClick={ () => this.handleClick(button.name) }>
            <Typography data-test="button-label"
              classes={ {
                colorTextPrimary: classes.textPrimary,
                colorTextSecondary: classes.textSecondary
              } }
              className={ `${classes.text}` }
              variant="body2"
              color={ selectedButtons.indexOf(button.name) > -1 ? 'textSecondary' : 'textPrimary' }>{ button.label }</Typography>
          </Button>
        ) }
      </div>
    )
  }
}

ButtonPanel.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string
  })).isRequired,
  toggle: PropTypes.bool.isRequired,
  initialSelections: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  selectedColor: PropTypes.string,
  unselectedColor: PropTypes.string
}

ButtonPanel.defaultProps = {
  toggle: false,
  initialSelections: [],
  onClick: () => {},
  selectedColor: '#555555',
  unselectedColor: 'white'
}

export default withStyles(styles)(ButtonPanel)