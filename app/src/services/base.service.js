import autoBind from 'auto-bind';

export class BaseService {
  constructor() {
    autoBind(this);
  }
}
