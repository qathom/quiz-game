<template>
  <div id="app">
    <div class="welcome" v-show="gameState === null" :style="initialView.css && initialView.css.layout">
      <div class="d-flex align-items-center h-100">
        <div class="container text-white text-center">
          <h1 class="mb-4" v-text="initialView.title"></h1>
          <p class="mb-4" v-if="initialView.description" v-text="initialView.description"></p>
          <button class="btn btn-primary btn-lg" v-text="initialView.buttonText" :class="{'btn-primary': !initialView.css || !initialView.css.button}" :style="initialView.css && initialView.css.button" @click.prevent="start"></button>
        </div>
      </div>
    </div>

    <main class="questions" v-show="gameState === 'started'">
      <nav class="navbar navbar-dark bg-dark fixed-top">
        <span class="navbar-brand mb-0 h1">
          <span v-text="score"></span>
          <span class="score-animate-container">
            <transition-group :css="false" tag="span" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
              <span class="d-inline-block" v-for="(points, index) in currentPoints" v-bind:data-index="index" :key="index" v-text="points"></span>
            </transition-group>
          </span>
        </span>
        <div class="text-white float-left" v-text="timeLeftString"></div>
      </nav>

      <question v-for="question in questions" :key="question.id" :question=question :current=current />
    </main>

    <div class="finish text-white text-center" v-show="gameState === 'finish'" :style="resultView.css && resultView.css.layout">
      <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1" v-text="resultView.navbarTitle"></span>
        <form class="form-inline">
          <button class="btn btn-primary my-2 my-sm-0" @click.prevent="retry" v-text="resultView.retry"></button>
        </form>
      </nav>

      <div class="container mt-3">
        <h1 v-text="resultView.title.replace(':score', score)"></h1>

        <div class="results mt-3" v-if="userAnswers.length > 0">
          <h3 v-text="resultView.results"></h3>

          <div class="alert" role="alert" v-for="(answer, index) in userAnswers" :key="index" :class="answer.userAnswerId === answer.bestAnswerId ? 'alert-success' : 'alert-warning'">
            <h3>
              <span class="badge" :class="answer.userAnswerId === answer.bestAnswerId ? 'badge-success' : 'badge-warning'" v-text="(index + 1)"></span>
              {{ questions.find(question => question.id === answer.questionId).question }}
            </h3>

            <ul class="list-group list-group-answers mb-3">
              <li class="list-group-item" v-text="`${resultView.yourAnswer}: ${questions.find(question => question.id === answer.questionId).answers.find(a => a.id === answer.userAnswerId).title}`"></li>
              <li class="list-group-item" v-text="`${resultView.expectedAnswer}: ${questions.find(question => question.id === answer.questionId).answers.find(a => a.id === answer.bestAnswerId).title}`"></li>
            </ul>

            <p v-if="questions.find(question => question.id === answer.questionId).explanation" v-text="`Explanation: ${questions.find(question => question.id === answer.questionId).explanation}`"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import question from '@/components/Question'
import data from '@/data'
import config from '@/config'
import initialView from '@/data/initialView'
import resultView from '@/data/resultView'
import { timeToStr } from '@/utils'
import { mapGetters, mapActions } from 'vuex'
import Event from '@/events'

export default {
  name: 'app',
  data () {
    return {
      initialView: initialView,
      resultView: resultView,
      questions: data,
      timeInterval: null,
      currentPoints: [],
      inGame: false
    }
  },
  methods: {
    ...mapActions(['setState', 'answerQuestion', 'reduceTime']),
    triggerEvent (eventName, params = {}) {
      const fullEventName = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`
      const callback = config[fullEventName]

      if (typeof callback === 'function') {
        callback.apply(null, params)
      }
    },
    start () {
      if (this.timeInterval) {
        console.error('Warning! The game has already been started.')
      }

      this.setState('started')
      this.triggerEvent(Event.GAME_START)
      this.inGame = true
      this.timeInterval = setInterval(this.reduceTime, 1000)
    },
    finish () {
      this.setState('finish')
      this.triggerEvent(Event.GAME_FINISH)
      this.inGame = false
      clearInterval(this.timeInterval)
      this.timeInterval = null
      this.currentPoints = []
    },
    retry () {
      this.start()
    },
    preventReload (event) {
      event.preventDefault()

      const message = 'Are you sure you want to stop the game?'

      event.returnValue = message
      return message
    },
    animatePoints (points) {
      this.currentPoints.push(points >= 0 ? `+${points}` : `${points}`)
    },
    accomplishQuestion (from, to, points, answerId) {
      this.answerQuestion({ from, to, points, answerId })
      this.animatePoints(points)

      if (to === '@finish') {
        this.finish()
      }
    },
    beforeEnter (el) {
      el.style.position = 'absolute'
      el.style.left = 0
      el.style.transform = ''
      el.style.transition = ''
      el.style.opacity = 1
    },
    enter (el, done) {
      const delay = el.dataset.index
      const duration = 800
      setTimeout(() => {
        el.style.transition = `all ${duration}ms ease-in-out`

        setTimeout(() => {
          el.style.opacity = 0
          el.style.transform = 'translateY(-50px)'
          setTimeout(() => {
            el.style.display = 'none'
          })
        }, 1)
      }, delay)
    },
    afterEnter (el) {
      el.style.display = 'none'
    }
  },
  watch: {
    inGame () {
      // prevent reload while in game
      if (this.inGame) {
        window.addEventListener('beforeunload', this.preventReload)
      } else {
        window.removeEventListener('beforeunload', this.preventReload)
      }
    },
    timeLeft () {
      const minutes = Math.floor(this.timeLeft / 60)
      const seconds = this.timeLeft - minutes * 60
      if (minutes === 0 && seconds === 0) {
        this.finish()
      }
    }
  },
  computed: {
    ...mapGetters(['gameState', 'current', 'score', 'timeLeft', 'userAnswers']),
    timeLeftString () {
      const minutes = Math.floor(this.timeLeft / 60)
      const seconds = this.timeLeft - minutes * 60

      return `${timeToStr(minutes)}:${timeToStr(seconds)}`
    }
  },
  components: { question }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

html,
body,
#app,
.welcome,
.questions,
.finish {
  height: 100%;
  background-color: #333;
}

img {
  max-width: 100%;
}

.list-group-answers {
  background-color: transparent;

  .list-group-item {
    background-color: transparent;
  }
}

.score-animate-container {
  position: relative;
  margin-left: 12px;
}
</style>
