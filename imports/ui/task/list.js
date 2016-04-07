import m from 'mithril';
import { Tasks } from '../../api/tasks.js';
import {reactive} from '../../helper/reactive';

const controller = reactive(function(props) {
  return {
    getData() {
      return {
        tasks: Tasks.find({}).fetch()
      }
    }
  }
})

function view(ctrl, props) {
  const {data} = ctrl;
  const {tasks} = data();

  return m('.stuff',
    m('ul', tasks.map(task => m('li', task.title)))
  )
}

export default {controller, view}
