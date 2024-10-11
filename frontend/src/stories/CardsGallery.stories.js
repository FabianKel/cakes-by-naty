import React from 'react';
import CardsGallery from './CardsGallery';
import data from './data.json';

export default {
  title: 'Components/CardsGallery',
  component: CardsGallery,
};

const Template = (args) => <CardsGallery {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: data,
  category: 'Todos los Pasteles',
};
