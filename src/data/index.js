const questions = [
  {
    id: 'firstQuestion', // define the id if you need t redirect to this step
    title: 'Let\'s go!',
    question: 'In which country is Geneva?',
    explanation: 'Try again!',
    answers: [
      {
        title: 'France',
        points: -5,
        redirect: 'simplerQuestion'
      },
      {
        title: 'Germany',
        points: -5,
        redirect: 'simplerQuestion'
      },
      {
        title: 'Switzerland',
        points: +5,
        redirect: 'normalQuestion'
      }
    ],
    css: {
      layout: {
        color: '#333',
        backgroundImage: 'url(https://c1.staticflickr.com/5/4118/4744738523_fa62543e01_b.jpg)',
        backgroundSize: 'cover'
      },
      answers: {
        color: '#fff',
        backgroundColor: '#333'
      }
    }
  },
  {
    id: 'simplerQuestion',
    title: 'No! It is your last chance.',
    question: 'In which part of the world is Geneva?',
    explanation: 'Try again!',
    answers: [
      {
        title: 'South of America',
        points: -5,
        redirect: '@finish'
      },
      {
        title: 'Europa',
        points: +5,
        redirect: '@next'
      },
      {
        title: 'Africa',
        points: -5,
        redirect: '@finish'
      }
    ]
  },
  {
    id: 'normalQuestion',
    question: 'In which area is Geneva?',
    explanation: 'Try again!',
    answers: [
      {
        title: 'Canton de Genève',
        points: +10,
        redirect: '@next'
      },
      {
        title: 'Near Versoix',
        points: +5,
        redirect: '@next'
      },
      {
        title: 'Near Coppet',
        points: +3,
        redirect: '@next'
      },
      {
        title: 'Near Lausanne',
        points: -5,
        redirect: 'simplerQuestion'
      }
    ]
  },
  {
    title: 'Last one!',
    question: 'What is his name?',
    explanation: 'John Calvin was an influential French theologian, pastor and reformer in Geneva during the Protestant Reformation.',
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Johannes_calvin.jpg/440px-Johannes_calvin.jpg',
      round: false,
      width: 100
    },
    css: {
      layout: {
        color: '#333',
        backgroundColor: '#fff'
      }
    },
    answers: [
      {
        title: 'John Calvin',
        points: +8,
        redirect: '@finish'
      },
      {
        title: 'Guillaume Farel',
        points: -5,
        redirect: '@finish'
      },
      {
        title: 'John Knox',
        points: -8,
        redirect: '@finish'
      }
    ]
  }
]

const setId = () => {
  return Math.random().toString(36).substring(7)
}

// set dynamic ids
questions.forEach(question => {
  if (typeof question.id !== 'string') {
    question.id = setId()
  }
  question.answers.forEach(answer => {
    answer.id = setId()
  })
})

export default questions
