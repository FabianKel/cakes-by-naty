import React from 'react';
import Button from './Button';
import { action } from '@storybook/addon-actions';

export default {
  component: Button,
  argTypes: {
    onClick: { action: 'Button clicked' },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Ver más",
  svg:  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>,
};

export const WithAction = Template.bind({});
WithAction.args = {
  label: 'Button with Action',
  text: "Ver más",
  svg:  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>,
  onClick: action('Button clicked!'),  
};