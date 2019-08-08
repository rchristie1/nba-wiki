import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShowLeaders from '../../leaders/showLeaders';

const createExpansionPanel = (...args) => {
  const inlineRoot = {
    boxShadow: 'none',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  };

  const summaryStyles ={
    borderBottom: '2px solid gray',
  }

  const output = args[0].map((data, i) => {
    return (
      <div key={i} style={{ width: '100%' }}>
        {i === 0 ? (
          <ExpansionPanel style={inlineRoot} expanded={args[1][0]} onClick={args[1][1]}>
            <ExpansionPanelSummary style={summaryStyles} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <h1>{data[0]} Leaders</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
              <ShowLeaders leaders={data[1]} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : (
          <ExpansionPanel style={inlineRoot}>
            <ExpansionPanelSummary style={summaryStyles} expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <h1>{data[0]} Leaders</h1>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
              <ShowLeaders leaders={data[1]} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    );
  });

  return <>{output}</>;
};

export default createExpansionPanel;
