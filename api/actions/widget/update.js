import {load} from './load';

export default function updateWidget(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject('Oh no! Widget save fails 20% of the time. Try again.');
      } else {
        const widgets = load(req);
        const widget = req.body;
        if (widget.id) {
          widgets[widget.id - 1] = widget;  // id is 1-based. please don't code like this in production! :-)
        }
        resolve(widget);
      }
    }, 2000); // simulate async db write
  });
}
