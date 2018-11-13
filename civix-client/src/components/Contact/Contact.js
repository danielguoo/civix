import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

export default props => (
  <fragment>
  <List>
    <ListItem
      primaryText="foo1"
      secondaryText="bar1"/>
    <ListItem
      primaryText="foo2"
      secondaryText="bar2"/>
  </List>
  </fragment>
)
