import React from 'react'
import {shallow, render, mount} from 'enzyme'
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
import {CurrencyCardList} from './currency-card-list'

describe('CurrencyCardList', () => {
	test('renders without issues', () => {
		expect(() => render(<CurrencyCardList />)).not.toThrow()
	})

	test('add a card', () => {
		const List = mount(<CurrencyCardList/>);
		List.find('button').simulate('click');

		expect(List.length).toEqual(1)
	})
	test('delete a card')
	test('convert amount')
	test('set rate')
})
