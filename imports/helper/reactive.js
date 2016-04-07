import m from 'mithril';
import { Tracker } from 'meteor/tracker'

export function reactive(controller) {
  return function(props) {
    let instance = controller(props);

    instance.data = m.prop({});

    const computation = Tracker.nonreactive(() => {
      return Tracker.autorun((c) => {
        m.startComputation();
        instance.data(instance.getData());
        m.endComputation();
      })
    });

    instance.onunload = function() {
      computation.stop();
    }

    return instance;
  }
}
