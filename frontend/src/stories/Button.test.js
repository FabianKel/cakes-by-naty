import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories'; 

const { Default, WithAction } = composeStories(stories);

describe('Button component', () => {
    test('renders Default Button', () => {
        render(<Default />);  
        expect(screen.getByText(/Ver más/i)).toBeInTheDocument();  
    });

    test('fires onClick action', () => {
        render(<WithAction />);
        const button = screen.getByText(/Ver más/i);
        fireEvent.click(button);  
        expect(button).toBeInTheDocument(); 
    });
});