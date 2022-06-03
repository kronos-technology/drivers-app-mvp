import { mainModule } from 'process';
import { Checkin } from './checkin';
import { Checkpoint } from './checkpoint';
import { Company } from './company';
import { Driver } from './driver';
import { Route } from './route';
import { Vehicle } from './vehicle';

class DbAdapter {
  separator: string = '-';
  queryName: string;
  entity: string;
  action: string;
  params: object;
  handlerEntity;
  handlerMethod;

  constructor(queryName: string) {
    const idx = queryName.indexOf(this.separator);
    this.queryName = queryName;
    this.entity = queryName.slice(0, idx);
    this.action = queryName.slice(idx + 1);
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
