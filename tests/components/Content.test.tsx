import { render, screen } from '@testing-library/react';
import Content from '@/components/content/content';

describe('Content Component', () => {
  const defaultText = 'Test content goes here.';

  it('renders text content properly', () => {
    render(<Content>{defaultText}</Content>);
    expect(screen.getByText(defaultText)).toBeInTheDocument();
  });

  it('renders default placeholder image by default', () => {
    render(<Content>{defaultText}</Content>);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('/images/placeholders/image-placeholder-600x400.png'));
  });

  it('uses provided imageSrc and alt', () => {
    render(
      <Content imageSrc="/images/custom.jpg" imageAlt="Custom Alt Text">
        {defaultText}
      </Content>
    );
    const img = screen.getByAltText('Custom Alt Text');
    expect(img).toHaveAttribute('src', expect.stringContaining('/images/custom.jpg'));
  });

  it('applies reverse layout classes when reverse is true', () => {
    const { container } = render(<Content reverse>{defaultText}</Content>);
    expect(container.firstChild).toHaveClass('lg:flex-row-reverse');
  });

  it('applies width classes based on prop', () => {
    const { container } = render(<Content width="33-67">{defaultText}</Content>);
    expect(container.querySelector('.content-text')).toHaveClass('lg:w-1/3');
    expect(container.querySelector('.content-img')).toHaveClass('lg:w-2/3');
  });

  it('applies border, shadow, and rounded classes when props are true', () => {
    const { container } = render(
      <Content border rounded shadow>
        {defaultText}
      </Content>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('border', 'rounded-lg', 'shadow-lg');
  });

  it('renders background image div when useBackgroundImage is true', () => {
    const { container } = render(
      <Content imageSrc="/images/bg.jpg" useBackgroundImage>
        {defaultText}
      </Content>
    );
    const bgDiv = container.querySelector('.bg-cover');
    expect(bgDiv).toHaveStyle({ backgroundImage: `url(/images/bg.jpg)` });
  });
});
