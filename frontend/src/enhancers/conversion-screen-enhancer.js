import {withStateHandlers, withProps, compose} from 'recompose';
import {when, curry, assoc, propEq, map} from 'ramda';
import {generate} from 'shortid';

const availableCurrencies = ['USD', 'EUR', 'GBP'];

const alter = curry((id, key, value, items) => map(
 when(propEq('id', id), assoc(key, value)),
 items
))

const buildConverter = props => ({
  id: props.id,
  currency: 'USD',
  amount: 0,
  rate: 1,
  onDelete: () => props.handleDelete(props.id),
  onChangeRate: rate => props.handleChangeRate(props.id, rate),
  onChangeCurrency: currency => props.handleChangeCurrency(props.id, currency),
  onChangeAmount: amount => props.handleChangeAmount(props.id, amount),
  availableCurrencies
});

const withConverterState = withStateHandlers(
  () => ({
    converters: []
  }),
  {
    setConverters: () => converters => ({converters}),
    handleChangeAmount: ({converters}) => (id, amount) => ({
      converters: alter(id, 'amount', amount, converters)
    }),
    handleChangeCurrency: ({converters}) => (id, currency) => ({
      converters: alter(id, 'currency', currency, converters)
    }),
    handleChangeRate: ({converters}) => (id, rate) => ({
      converters: alter(id, 'rate', rate, converters)
    }),
    handleDelete: ({converters}) => id => ({
      converters: [...converters.filter(c => c.id !== id)]
    }),
  }
)

const withScreenProps = withProps(props => ({
  onCreate: () => {
    const id = generate();
    const converter = buildConverter({
      id: id,
      ...props
    })
    props.setConverters([...props.converters, converter]);
  }
}))
export default compose(
  withConverterState,
  withScreenProps
)
