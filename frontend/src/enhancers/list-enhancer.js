import {withStateHandlers} from 'recompose';
import {when, curry, assoc, propEq, map} from 'ramda';
import {generate} from 'shortid';

const availableCurrencies = ['USD', 'EUR', 'GBP'];

const alter = curry((id, key, value, items) => map(
 when(propEq('id', id), assoc(key, value)),
 items
))

const withConverterState = withStateHandlers(
  () => ({
    converters: [],
    currency: null
  }),
  {
    onChangeAmount: ({converters}) => (id, amount) => ({
      converters: alter(id, 'amount', amount, converters)
    }),
    setCurrency: () => (id, currency) => ({
      converters: alter(id, 'currency', currency, converters)
    }),
    onChangeRate: ({converters}) => (id, rate) => ({
      converters: alter(id, 'rate', rate, converters)
    }),
    onDelete: ({converters}) => id => ({
      converters: [...converters.filter(c => c.id !== id)]
    }),
    onCreate: ({converters}) => () => ({
      converters: [...converters, {
        id: generate(),
        currency: 'USD',
        amount: 0,
        rate: 1,
        availableCurrencies
      }]
    })
  }
)

export default withConverterState;
