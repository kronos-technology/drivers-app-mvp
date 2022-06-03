import { Checkin } from './checkin';
import { Checkpoint } from './checkpoint';
import { Company } from './company';
import { Driver } from './driver';
import { Route } from './route';
import { Vehicle } from './vehicle';

class DbAdapter {
  separator: string = '-';
  fieldName: string;
  args: object;
  entity: string;
  action: string;
  params: object;
  handlerEntity;
  handlerMethod;

  constructor(fieldName: string, args: object) {
    const idx = fieldName.indexOf(this.separator);
    this.fieldName = fieldName;
    this.args = args;
    this.entity = fieldName.slice(0, idx);
    this.action = fieldName.slice(idx + 1);
    this.handlerEntity = this.getEntity();
  }

  private getEntity() {
    const entityMap: object = {
      checkin: new Checkin(),
      checkpoint: new Checkpoint(),
      company: new Company(),
      driver: new Driver(),
      route: new Route(),
      vehicle: new Vehicle()
    };
    return entityMap[this.entity];
  }

  public handleRequest(params: object | undefined) {
    this.handlerMethod = this.handlerEntity[this.action];
    console.log(`Handler method: ${this.entity}.${this.handlerMethod.name}`);
    const result = this.handlerMethod(params);
    console.log(`Result ${JSON.stringify(result, null, 2)}`);
    return result;
  }
}

export { Vehicle } from './vehicle';
export { Route } from './route';
export { Driver } from './driver';
export { Company } from './company';
export { Checkpoint } from './checkpoint';
export { Checkin } from './checkin';
export { DbAdapter };
