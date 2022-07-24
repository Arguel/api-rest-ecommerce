import express from 'express';

export abstract class CommonRoutesConfig {
  private app: express.Application;
  private name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }
  getName(): string {
    return this.name;
  }
  abstract configureRoutes(): express.Application;
}
