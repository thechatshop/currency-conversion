import React from 'react'
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import {generate} from 'shortid';
import {CurrencyCard} from './currency-card';
import {withConverterState} from '../enhancers'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

export const CardList = props => {
  const { classes } = props;

  return (
    <List>
      {props.converters.map(converterOpts => (
        <CurrencyCard key={generate()} {...converterOpts} {...props}/>
      ))}
      <Button
        variant="fab"
        color="primary"
        aria-label="add"
        onClick={props.onCreate}
        className={classes.button}>
        <AddIcon />
      </Button>
    </List>
  );
}

export const CurrencyCardList = withConverterState(withStyles(styles)(CardList));
