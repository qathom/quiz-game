import Vue from 'vue'
import Question from '@/components/Question'

describe('Question.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Question)
    const vm = new Constructor().$mount()
    expect(vm.$options.name).to.be.a('string')
    expect(vm.$options.name).to.equal('question')
  })
})
