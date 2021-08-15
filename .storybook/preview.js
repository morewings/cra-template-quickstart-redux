export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Intro',
        'Install',
        'Redux',
        'Code quality tools',
        'Style options',
        'Testing',
        'Absolute imports',
      ],
    },
  },
};
