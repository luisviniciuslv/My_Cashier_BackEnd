import { Request, Response, Router } from 'express';
import { CompanyEmailAlreadyExistsException } from '../exceptions/company-email-already-exists-exception';
import { InvalidPayloadException } from '../exceptions/invalid-payload-exception';
import { CompanyService } from '../service/company-service';
import { CompanyRequestDto, toDocument } from './dto/company-request-dto';
import { validateCompanyPayload } from './validations/company-creation';
export class CompanyController {
  private _router = Router();
  private companyService = new CompanyService();

  public get router() {
    return this._router;
  }

  constructor() {
    this._router.post('/', this.create);
  }

  private create = async (req: Request, res: Response) => {
    const company: CompanyRequestDto = {
      ...req.body,
      email: req.body.email?.toLowerCase()
    };
    try {
      validateCompanyPayload(company);
      const persistedCompany = await this.companyService.createCompany(
        toDocument(company)
      );
      res
        .location(`/api/company/${persistedCompany._id}`)
        .sendStatus(201);
    } catch (error) {
      if (error instanceof CompanyEmailAlreadyExistsException) {
        res.status(422).send(error.message);
        return;
      }
      
      if(error instanceof InvalidPayloadException) {
        res.status(422).send(error.message);
        return;
      }
      res.status(500).send('Internal Server Error');
    }
  };
}
