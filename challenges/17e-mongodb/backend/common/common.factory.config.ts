import express from 'express';
import config from 'config';
import { ICrud } from './types/crud.interface';

const userMap = {
  mongo: 'Developer',
  mysql: 'Manager',
};

type availebleTypes = keyof typeof userMap; // 'dev' | 'manager'

export default abstract class CommonFactoryConfig {
  // private readonly factoryType: availebleTypes;
  private readonly factory: ICrud;

  constructor(factory: ICrud) {
    // this.factoryType = config.get<availebleTypes>('server.domain');
    this.factory = factory;
  }

  public abstract configureRoutes(): ICrud.putById;
}
