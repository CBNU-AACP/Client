import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import StyedLogin from './stylefind'
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
    showPassword: false,
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleFind = data => {}
  return (
    <StyedLogin onFinish={handleSubmit(handleFind)} size="large">
      <div className={classes.root}>
        <div className="login">
          <AppBar position="static" id="appbar">
            <Tabs
              scrollable
              centered
              classes={{
                indicator: classes.indicator,
              }}
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              id="tabs">
              <Tab label="아이디 찾기" {...a11yProps(0)} />
              <Tab label="비밀번호 찾기" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <InputLabel htmlFor="standard-adornment-userid">아이디</InputLabel>
            <Input
              id="standard-adornment-userid"
              className="input-login"
              type="text"
              value={values.userId || ''}
              name="userId"
              //   onChange={handleChange('userId')}
              //   {...field}
            ></Input>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InputLabel htmlFor="standard-adornment-userpassword">비밀번호</InputLabel>
            <Input
              id="standard-adornment-userpassword"
              className="input-login"
              type="text"
              value={values.userpassword || ''}
              name="userpassword"
              //   onChange={handleChange('userId')}
              //   {...field}
            ></Input>
          </TabPanel>
        </div>
      </div>
    </StyedLogin>
  )
}

export default Find
