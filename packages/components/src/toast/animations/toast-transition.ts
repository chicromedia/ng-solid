import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const TOAST_ANIMATION = trigger('translate', [
  state(
    'display',
    style({
      opacity: 1,
      transform: 'translateY(-0%)'
    })
  ),
  state(
    'destroy',
    style({
      opacity: 0,
      transform: 'translateY(100%)'
    })
  ),
  transition('* => display', [animate('300ms')]),
  transition('display => destroy', [animate('300ms')])
]);
