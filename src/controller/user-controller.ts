import { Request, Response, Router } from 'express';

export class UserController {
  private _router = Router();

  public get router() {
    return this._router;
  }

  constructor() {
    this._router.get('/', this.test);
  }
  private test = async (req: Request, res: Response) => {
    res.send('test');
  };
}
