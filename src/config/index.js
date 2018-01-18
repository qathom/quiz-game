export default {
  /**
   * navbar icon
   */
  icon: { // or null
    path: require('@/assets/logo.png'),
    width: 48,
    height: 48
  },

  /**
   * time to finish the game in seconds
   */
  time: 60,

  /**
   * default score when the game starts
   */
  score: 0,

  /**
   * callback event when the game starts
   */
  onStart: () => {

  },

  /**
   * callback event when the game finishes
   */
  onFinish: () => {

  },

  /**
   * callback event when a question is answered
   */
  onQuestionAnswered: (data) => {

  }
}
