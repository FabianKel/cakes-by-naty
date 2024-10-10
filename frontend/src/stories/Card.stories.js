import React from 'react';
import Card from './Card';
import data from './data.json';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  productonombre: 'Card Title',
  src: 'This is a description.',
  alt: 'Imagen',
};

export const FromJSON = Template.bind({});
const index = 0;
FromJSON.args = {
  productonombre: data[index].productonombre,
  src: data[index].src,
  alt: data[index].alt,
};