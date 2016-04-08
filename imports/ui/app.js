import m from 'mithril';
import {reactive} from '../helper/reactive';
import { Tasks } from '../api/tasks.js';
import TaskList from './task/list.js';

const controller = reactive(function(props) {
  const newTask = m.prop('');
  const hideCompleted = m.prop(false);
  const title = m.prop('Mithril and Meteor');

  return {
    title,
    newTask,
    hideCompleted,

    toggleCompleted() {
      hideCompleted(!hideCompleted());
      m.redraw();
    },
    handleForm(e) {
      e.preventDefault();
      const title = newTask();

      // Insert task
      Tasks.insert({
        title,
        createdAt: new Date(), // current time
      });

      // Clear form input
      newTask('');
    },

    // Get Data reactively from mongo
    getData() {
      return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count()
      }
    }
  }
});

function view(ctrl, props) {
  const {data, hideCompleted} = ctrl;
  const {tasks, incompleteCount} = data();

  return m('.container', [
    m('header', [
      m('h1.title', `${ctrl.title()} ${incompleteCount}`),
      m('label.hide-completed', [
        m('input', {
          type: 'checkbox',
          readonly: true,
          checked: ctrl.hideCompleted(),
          onclick: ctrl.toggleCompleted
        }),
        'Hide Completed Tasks'
      ]),
      m('form.new-task', {onsubmit: ctrl.handleForm} , [
        m('input', {
          type: 'text',
          onchange: m.withAttr('value', ctrl.newTask),
          value: ctrl.newTask(),
          placeholder: 'Enter a new task'
        })
      ])
    ]),
    m(TaskList, {tasks, hideCompleted})
  ])
}

export default {controller, view}
