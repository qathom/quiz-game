import * as types from '../mutation-types'
import config from '@/config'
import data from '@/data'

const initialState = () => {
  return {
    gameState: null,
    current: data[0].id,
    score: config.score,
    timeLeft: config.time,
    userAnswers: []
  }
}

const state = initialState()

const getters = {
  gameState: state => state.gameState,
  current: state => state.current,
  score: state => state.score,
  timeLeft: state => state.timeLeft,
  userAnswers: state => state.userAnswers
}

const actions = {
  setState ({ commit }, gameState) {
    if (gameState === 'started') {
      // reset
      commit(types.GAME_RESET)
    }
    commit(types.GAME_SET_STATE, gameState)
  },
  reduceTime ({ commit }) {
    commit(types.GAME_REDUCE_TIME_LEFT)
  },
  answerQuestion ({ commit }, payload) {
    // update the score
    commit(types.GAME_UPDATE_SCORE, payload.points)

    // add user answer
    const bestPoints = Math.max(...data.find(question => question.id === payload.from).answers.map(answer => answer.points))
    const bestAnswerId = data.find(question => question.id === payload.from).answers.find(answer => answer.points === bestPoints).id
    commit(types.GAME_ADD_USER_ANSWER, { questionId: payload.from, userAnswerId: payload.answerId, bestAnswerId: bestAnswerId })

    // update current view
    const index = data.findIndex(question => question.id === payload.from)

    if (payload.to === '@finish') {
      return
    }

    if (payload.to === '@prev') {
      commit(types.GAME_UPDATE_CURRENT, data[index - 1].id)
      return
    }

    if (payload.to === '@next') {
      commit(types.GAME_UPDATE_CURRENT, data[index + 1].id)
      return
    }

    const next = data.find(question => question.id === payload.to)

    commit(types.GAME_UPDATE_CURRENT, next.id)
  }
}

const mutations = {
  [types.GAME_SET_STATE] (state, gameState) {
    state.gameState = gameState
  },
  [types.GAME_UPDATE_SCORE] (state, points) {
    state.score += points
  },
  [types.GAME_UPDATE_CURRENT] (state, current) {
    state.current = current
  },
  [types.GAME_REDUCE_TIME_LEFT] (state) {
    state.timeLeft--
  },
  [types.GAME_RESET] (state) {
    // @todo
    const initial = initialState()
    for (let s in initial) {
      state[s] = initial[s]
    }
  },
  [types.GAME_ADD_USER_ANSWER] (state, payload) {
    state.userAnswers.push({
      questionId: payload.questionId,
      userAnswerId: payload.userAnswerId,
      bestAnswerId: payload.bestAnswerId
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
