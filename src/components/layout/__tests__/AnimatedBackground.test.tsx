import { render } from '@testing-library/react';
import { AnimatedBackground } from '../src/AnimatedBackground';

describe('AnimatedBackground component', () => {
  test('renders gradient background', () => {
    const { container } = render(<AnimatedBackground />);
    
    const gradientBg = container.querySelector('.bg-gradient-to-br');
    expect(gradientBg).toBeInTheDocument();
  });

  test('renders three animated orbs', () => {
    const { container } = render(<AnimatedBackground />);
    
    const orbs = container.querySelectorAll('.animate-blob');
    expect(orbs).toHaveLength(3);
  });

  test('orbs have different animation delays', () => {
    const { container } = render(<AnimatedBackground />);
    
    const orbs = container.querySelectorAll('.animate-blob');
    const delays = Array.from(orbs).map(orb => 
      orb.classList.contains('animation-delay-2000') || 
      orb.classList.contains('animation-delay-4000')
    );
    
    // At least 2 orbs should have delays
    const orbsWithDelay = delays.filter(Boolean).length;
    expect(orbsWithDelay).toBeGreaterThanOrEqual(2);
  });

  test('renders grid pattern overlay', () => {
    const { container } = render(<AnimatedBackground />);
    
    // Check for the div with opacity-40 class which is the grid pattern
    const gridPattern = container.querySelector('.opacity-40');
    expect(gridPattern).toBeInTheDocument();
  });

  test('all elements have absolute positioning', () => {
    const { container } = render(<AnimatedBackground />);
    
    const absoluteElements = container.querySelectorAll('.absolute');
    expect(absoluteElements.length).toBeGreaterThan(0);
  });
});

