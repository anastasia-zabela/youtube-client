import $ from 'jquery';

class AppView {
  constructor() {
    this.data = [];
    this.indexClips = 0;
    this.clips = null;
  }

  set setData(data) {
    this.data = data;
  }

  set setIndex(index) {
    this.indexClips = index;
  }

  startRender() {
    $('<meta/>', {
      content: 'width=device-width, initial-scale=1',
      name: 'viewport',
    }).appendTo('head');
    $('<link/>', {
      rel: 'stylesheet',
      href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css',
      integrity: 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay',
      crossorigin: 'anonymous',
    }).appendTo('head');
    const search = $('<div/>')
      .addClass('search')
      .appendTo('body');
    $('<div/>')
      .addClass('fas fa-search')
      .appendTo('.search');
    $('<input/>', {
      placeholder: 'What do you want to find?',
      type: 'text',
    }).appendTo('.search');
    this.search = search;
  }

  renderClipContain() {
    if ($('.clips-contain').length) {
      $('.clips-contain').remove();
    }
    if ($('.error_message').length) {
      $('.error_message').remove();
    }
    const newClips = $('<div/>')
      .addClass('clips-contain')
      .insertAfter(this.search);
    this.clips = newClips;
    this.renderClipCards();
  }

  renderClipCards() {
    for (let i = 0; i < this.data.author.length; i += 1) {
      const title = $(`<a>${this.data.title[i]}</a>`, {
        href: this.data.url[i],
        target: '_block',
        rel: 'noopener noreferrer',
      });
      const picture = $('<img/>', {
        src: this.data.picture[i],
      });
      const descr = $(`<h3>${this.data.description[i]}</h4>`);
      const iconAuthor = $('<div/>').addClass('fas fa-user-circle');
      const author = $(`<h4>${this.data.author[i]}</h4>`);
      const iconDate = $('<div/>').addClass('fas fa-calendar-alt');
      const date = $(`<h4>${this.data.date[i].slice(0, 10)}</h4>`);
      const iconView = $('<div/>').addClass('fas fa-glasses');
      const views = $(`<h4>${this.data.views[i]}</h4>`);
      const clipInfo = $('<div/>')
        .addClass('clips-contain__clip-info')
        .append(iconAuthor, author, iconDate, date, iconView, views);
      const clip = $('<div/>')
        .addClass('clips-contain__clip')
        .append(picture, title, descr, clipInfo);
      this.clips.append(clip);
    }
  }

  renderPageButtons() {
    if ($('.slider-contain').length) {
      $('.slider-contain').remove();
    }

    const prevPrevNumPage = $('<button/>').addClass('slider__prev-prev-page');
    const prevNumPage = $('<button/>').addClass('slider__prev-page');
    const numPage = $('<button>1</button>').addClass('slider__current-page');
    const nextNumPage = $('<button>2</button>', {
      dataNumPage: 2,
    }).addClass('slider__next-page');

    const slider = $('<div/>')
      .addClass('slider-contain')
      .append(numPage, nextNumPage)
      .insertAfter(this.clips);

    this.slider = slider;
    this.sliderBtn = {
      prevPrevNumPage,
      prevNumPage,
      numPage,
      nextNumPage,
    };
  }

  static renderError() {
    if ($('div').is('.clips-contain') !== undefined) {
      $('.clips-contain').remove();
    }
    if ($('div').is('.slider-contain') !== undefined) {
      $('.slider-contain').remove();
    }
    if ($('div').is('.error_message') !== undefined) {
      $('.error_message').remove();
    }
    $('<div>Sorry, no results were found for your request</div>')
      .addClass('error_message')
      .appendTo('body');
  }
}

export default AppView;
