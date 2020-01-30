import React from 'react';
import { render } from '@testing-library/react-native';
import Temp from './Temp';

describe('<Temp />', () => {
  test('should render temp', () => {
    const { queryByTestId } = render(<Temp/>);
    expect(queryByTestId('text').children[0]).toEqual('Hello from Temp!');
  });
});
