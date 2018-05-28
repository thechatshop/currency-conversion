import React from 'react'
import {shallow, render, mount} from 'enzyme'
import {ConversionScreen} from './conversion-screen'

describe('ConversionScreen', () => {
	test('renders without issues')

	test('add a card', () => {
		const List = mount(<ConversionScreen/>);
		List.find('button').simulate('click');

		expect(List.length).toEqual(1)
	})
})
