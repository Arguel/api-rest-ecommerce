export interface ICrud {
  create: (resource: any) => Promise<any>;
  list: (limit?: number, page?: number) => Promise<any>;
  readById: (id: string) => Promise<any>;
  patchById: (id: string, resource: any) => Promise<any>;
  deleteById: (id: string) => Promise<any>;
}
