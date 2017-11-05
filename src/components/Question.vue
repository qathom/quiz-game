<template>
  <div class="question h-100" :style="question.css && question.css.layout" v-show="current === question.id">
    <div class="d-flex h-100 align-items-center">
      <div class="container text-center">
        <img v-if="question.image" :class="{'rounded-circle': question.image.round}" :width="question.image.width" :height="question.image.height" :src="question.image.url">
        <h1 v-text="question.title"></h1>
        <h2 v-text="question.question"></h2>
        <div class="btn-group btn-group-vertical mt-4">
          <button type="button" class="btn btn-lg" :class="{'btn-primary': !question.css || !question.css.answers}" :style="question.css && question.css.answers" v-for="answer in question.answers" :key="answer.title" v-text="answer.title" @click.prevent="$parent.accomplishQuestion(question.id, answer.redirect, answer.points, answer.id)"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
  props: {
    current: String,
    question: Object
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

.question {
  color: $white;

  img {
    max-height: 400px;
    margin-top: $spacer * 5;
    margin-bottom: $spacer * 2;
  }
}
</style>
