import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import StyledFind from './stylefind'
import { Link, Redirect } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import TelegramIcon from '@material-ui/icons/Telegram'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      className="tabpanel"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.isRequired,
  value: PropTypes.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  indicator: {
    backgroundColor: 'white',
  },
}))

function Find() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const { handleSubmit } = useForm()
  const [values, setValues] = useState({
    userId: '',
    userPassword: '',
    userPhoneNumber: '',
    showPassword: false,
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleFind = data => {}
  return (
    <StyledFind onFinish={handleSubmit(handleFind)} size="large">
      <div className={classes.root}>
        <div className="box">
          <AppBar position="static" id="appbar">
            <Tabs
              scrollable
              // centered
              classes={{
                indicator: classes.indicator,
              }}
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              id="tabs">
              <Tab icon={<TelegramIcon />} label="????????? ??????" {...a11yProps(0)}></Tab>
              <Tab icon={<VpnKeyIcon />} label="???????????? ??????" {...a11yProps(1)}></Tab>
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <InputLabel htmlFor="standard-adornment-userphonenumber">????????????</InputLabel>
            <Input
              id="standard-adornment-userphonenumber"
              className="input-find"
              type="text"
              value={values.userPhoneNumber || ''}
              name="userPhoneNumber"></Input>
            <Button className="btn-find">????????????</Button>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InputLabel htmlFor="standard-adornment-userid">?????????</InputLabel>
            <Input
              id="standard-adornment-userid"
              className="input-find"
              type="text"
              value={values.userId || ''}
              name="userid"></Input>
            <InputLabel htmlFor="standard-adornment-userphonenumber">????????????</InputLabel>
            <Input
              id="standard-adornment-userphonenumber"
              className="input-find"
              type="text"
              value={values.userPhoneNumber || ''}
              name="userPhoneNumber"></Input>
            <Button className="btn-find">????????????</Button>
            <Button className="btn-find">???????????? ??????</Button>
          </TabPanel>
        </div>
      </div>
    </StyledFind>
  )
}

export default Find
