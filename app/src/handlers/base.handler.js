import autoBind from 'auto-bind';
export class BaseHandler {
  constructor() {
    autoBind(this);
  }
}
