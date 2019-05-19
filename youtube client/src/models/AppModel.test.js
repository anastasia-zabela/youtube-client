import AppModel from './AppModel';

describe('ExstractClipNames', () => {
  it('It is an instance of function', () => {
    expect(AppModel.exstractClipNames).toBeInstanceOf(Function);
  });

  it('Function return array of string that contains clip titles', () => {
    const data = {
      items: [{
        snippet: {
          title: 'cat1',
        },
      },
      {
        snippet: {
          title: 'cat2',
        },
      },
      {
        snippet: {
          title: 'cat3',
        },
      }],
    };

    const result = AppModel.exstractClipNames(data);

    expect(result).toEqual(['cat1', 'cat2', 'cat3']);
  });
});

describe('ExstractClipDescriptions', () => {
  it('Function return array of clips\' descriptions', () => {
    const data = {
      items: [{
        snippet: {
          description: 'Hello!',
        },
      },
      {
        snippet: {
          description: 'Pam-pam',
        },
      },
      {
        snippet: {
          description: 'Zhopa',
        },
      }],
    };

    const result = AppModel.exstractClipDescriptions(data);

    expect(result).toEqual(['Hello!', 'Pam-pam', 'Zhopa']);
  });

  it('Function return "No description" if description is empty', () => {
    const data = {
      items: [{
        snippet: {
          description: '',
        },
      },
      {
        snippet: {
          description: 'Pam-pam',
        },
      },
      {
        snippet: {
          description: '',
        },
      }],
    };

    const result = AppModel.exstractClipDescriptions(data);

    expect(result).toEqual(['No description', 'Pam-pam', 'No description']);
  });
});

describe('ExstractClipAuthor', () => {
  it('Function return array of clips\' authors', () => {
    const data = {
      items: [{
        snippet: {
          channelTitle: 'author1',
        },
      },
      {
        snippet: {
          channelTitle: 'author2',
        },
      },
      {
        snippet: {
          channelTitle: 'author3',
        },
      }],
    };

    const result = AppModel.exstractClipAuthor(data);

    expect(result).toEqual(['author1', 'author2', 'author3']);
  });
});
