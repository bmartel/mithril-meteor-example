import m from 'mithril';
import TaskList from './task/list.js';

function controller(props) {
  return {
    title: m.prop('Mithril and Meteor')
  }
}

function view(ctrl, props) {
  return m('.stuff', [
    m('h1', ctrl.title()),
    m(TaskList)
  ])
}

export default {controller, view}
