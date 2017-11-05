# quiz-game

> A simple and interactive quiz game made with Vue.js.

## Table of Contents

- [Build Setup](#build-setup)
- [Quiz Configuration](#quiz-configuration)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Quiz configuration

### Config

In `config/index.js`, you can define the maximum time of play (in seconds) and the default score of the user.
```js
time: 60,
score: 0
```

### Questions

In `data/index.js`, you can edit the quiz questions.
For each question, you can define the following properties:

#### Question
|  Property | Description | Mandatory  |
|---|---|---|
|  id | The id of the question. | no  |
|  title |  The title of the question. | no  |
|  question |  The question. | yes  |
|  explanation | The explanation to give more information.  | yes  |
|  answers | The list of possible [answers](#answers).  |  no |
|  image | The [image](#image) to display.  | no  |
|  css |  The custom [css](#CSS) for the question view. | no  |

##### Answers

Example:
```js
...
question: 'My question',
answers: [
  {
    title: 'Answer 1',
    points: +8,
    redirect: '@next'
  },
  {
    title: 'Answer 2',
    points: -4,
    redirect: '@back'
  }
]
```

|  Property | Description | Mandatory  |
|---|---|---|
|  title | The title of the answer. | yes  |
|  points |  The number of points with the answer. | yes  |
|  redirect |  The redirection to another question. Redirect the user to the next question with `@next`, to the previous question with `@prev`, end the game with `@end` and redirect to a specific question with the id of the question `toMyQuestionId` | yes  |

##### Image

Example:
```js
...
question: 'My question',
image: {
  url: 'https://site.com/file.jpg',
  round: false,
  width: 100,
  height: 100
}
```

|  Property | Description | Mandatory  |
|---|---|---|
|  url | The url of the image. | yes  |
|  round |  Set to true if you want a rounded image, false otherwise. | no  |

##### CSS

Example:
```js
...
question: 'My question',
css: {
  // for the layout
  layout: {
    color: '#eee',
    backgroundImage: 'url(https://site.com/image.png)',
    backgroundSize: 'cover'
  },
  // for the answers (buttons)
  answers: {
    backgroundColor: 'red'
  }
}
```

### Initial View

In `data/initialView.js`, you can define the text and style to display.

```js
title: 'Quiz game',
description: 'v2.0',
buttonText: 'Start the game',
css: {
  layout: {
    backgroundColor: '#111'
  },
  button: {
    color: '#fff'
  }
}
```

### Result View

Like InitialView, in `data/resultView.js`, you can define the text and style to display.

```js
title: 'Your score is :score',
results: 'Results',
css: {
  layout: {
    backgroundColor: '#111'
  }
}
```