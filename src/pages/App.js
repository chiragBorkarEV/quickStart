import React, {Component} from 'react'
import {connect} from 'react-redux'
import {actions} from '../actions/index'

import {Grid, Paper} from '@material-ui/core'

import {GlobalNavbar, DropdownWithAutosuggest} from '@lord-abbett/common-components';

import Header from '../components/Header/Header'
import ButtonPanel from '../components/ButtonPanel/ButtonPanel'
import TrendTile from '../components/TrendTile/TrendTile'
import TopBottomTile from '../components/TopBottomTile/TopBottomTile'

import buttons from '../../__mocks__/buttonPanel.json'

import styles from './App.style'
import {withStyles} from '@material-ui/core/styles';
import {hot} from "react-hot-loader"
import withRoot from '../assets/Jss/withRoot';
import '../../public/styles/global.css'

let globalNavbarData = {
    "appname": "React Quick Start Project",
    "showDropdownAppList": true
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedData: [],
        };
    }


    selectedOptions = (data) => {
        console.log("Found this guy: " + data.value);
    }

    componentDidMount() {
        this.props.dataConnect()
    }

    render() {
        const {theme, classes, data, selectedKPI, selectKPI} = this.props

        const {
            ACCOUNTS_MONTHLY,
            AUM_MONTHLY, GROSS_FLOWS_MONTHLY_EXISTING, GROSS_FLOWS_MONTHLY_NEW,
            CONSULTANT_AUM, CLIENT_AUM, STRATEGY_AUM, CHANNEL_AUM, MULTI_SELECT
        } = data

        return (
            <div data-test="component-app" className="App">
                <GlobalNavbar
                    appname={globalNavbarData.appname}
                    showDropdownAppList={globalNavbarData.showDropdownAppList}
                />

                <Header title="Quick Start Application"
                        showCalendar={true}
                        calendarDates={{
                            selectedDate: new Date().toString(),
                            minDate: '2017-10-01',
                            maxDate: '2019-09-30'
                        }}>
                    <div className={classes.multiSelect}>
                        <DropdownWithAutosuggest options={MULTI_SELECT.data}
                                                 isClearable={true}
                                                 isMulti={false}
                                                 defaultValue={{value: "", label: ""}}
                                                 onSelect={(data) => this.selectedOptions(data)}
                                                 placeholder={""}
                                                 selectStyles={{
                                                     control: {},
                                                     indicatorSeparator: {},
                                                     menu: {},
                                                     placeholder: {}
                                                 }}/>
                    </div>
                    <div className={classes.buttonPanel}>
                        <ButtonPanel
                            buttons={buttons}
                            initialSelections={['btn1']}
                            onClick={(name, state) => console.log(name, state)}
                            selectedColor={theme.palette.primary[700]}
                            unselectedColor={theme.palette.primary[300]}/>
                    </div>
                </Header>

                <div className={classes.content}>
                    <Grid container spacing={16}>

                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>
                                <TrendTile
                                    data={{
                                        AUM_MONTHLY: AUM_MONTHLY.data,
                                        GROSS_FLOWS_MONTHLY_EXISTING: GROSS_FLOWS_MONTHLY_EXISTING.data,
                                        GROSS_FLOWS_MONTHLY_NEW: GROSS_FLOWS_MONTHLY_NEW.data
                                    }}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper className={classes.paper}>
                                <TopBottomTile
                                    data={{
                                        CONSULTANT: CONSULTANT_AUM.data,
                                        CLIENT: CLIENT_AUM.data,
                                        STRATEGY: STRATEGY_AUM.data,
                                        CHANNEL: CHANNEL_AUM.data
                                    }}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }
}


export default hot(module)(connect(
    state => state,
    dispatch => ({
        dataConnect: () => dispatch(actions.dataConnect()),
        selectKPI: (name) => dispatch(actions.selectKPI(name))
    })
)(withRoot(withStyles(styles, {withTheme: true})(App))))

