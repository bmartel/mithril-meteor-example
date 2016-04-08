import m from 'mithril';
import { Tasks } from '../../api/tasks.js';


function controller(props) {
  return {
    deleteTask(taskId) {
      Tasks.remove(taskId);
    },
    toggleTask(task) {
      Tasks.update(task._id, {
       $set: {checked: !task.checked},
     });
    }
  }
}

function view(ctrl, props) {
  let {tasks} = props;

  if (props.hideCompleted()) {
    tasks = tasks.filter(task => !task.checked);
  }

  return m('.todo-list',
    m('ul', tasks.map(task =>
      m(`li${task.checked ? '.checked': ''}`, {key: task._id}, [
        m('button.delete', {
          onclick: () => ctrl.deleteTask(task._id)
        }, m.trust('&times;')),
        m('input', {
          type: 'checkbox',
          readonly: true,
          checked: task.checked,
          onclick: () => ctrl.toggleTask(task)
        }),
        m('span.text', task.title),
      ])
    ))
  )
}

export default {controller, view}
