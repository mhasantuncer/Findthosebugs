import { render, screen } from '@testing-library/react';
import Post from './Post';

describe('Bug 5: olika inlägg', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        const isSecondPost = url.endsWith('/2');

        return {
          json: async () =>
            isSecondPost
              ? {
                  id: 2,
                  userId: 1,
                  title: 'Andra inlägget',
                  body: 'Texten i det andra inlägget',
                }
              : {
                  id: 1,
                  userId: 1,
                  title: 'Första inlägget',
                  body: 'Texten i det första inlägget',
                },
        } as Response;
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('visar olika innehåll för olika efterfrågade id:n', async () => {
    render(
      <>
        <Post id={1} />
        <Post id={2} />
      </>,
    );

    expect(await screen.findByText('Första inlägget')).toBeInTheDocument();
    expect(await screen.findByText('Andra inlägget')).toBeInTheDocument();
    expect(
      screen.getByText('Texten i det första inlägget'),
    ).toBeInTheDocument();
    expect(screen.getByText('Texten i det andra inlägget')).toBeInTheDocument();
  });
});
