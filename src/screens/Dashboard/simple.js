import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Alluser from '../Alluser/alluser'
import Graph from '../graph/graph'
import Catagories from '../catogeries/catogeries'
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};



function SimpleTabs() {
//   const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div >
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="All Users" />
          <Tab label="Service's" />
          <Tab label="App Progress" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer><Alluser/></TabContainer>}
      {value === 1 && <TabContainer><Catagories/></TabContainer>}
      {value === 2 && <TabContainer><Graph/></TabContainer>}
    </div>
  );
}

export default SimpleTabs;