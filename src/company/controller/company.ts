import { Request, Response, Router } from 'express';
import { generate as generateJwt } from '../../functions/jwt';
import { AcessTokenException } from '../exceptions/acess-token-exception';
import { CompanyEmailAlreadyExistsException } from '../exceptions/company-email-already-exists-exception';
import { InvalidPayloadException } from '../exceptions/invalid-payload-exception';
import { CompanyService } from '../service/company-service';
import { CompanyCredentialsDto } from './dto/company-credentials-dto';
import { CompanyRequestDto, toDocument } from './dto/company-request-dto';
import { validateCompanyPayload } from './validations/company-creation';
import { validateCompanyLoginPayload } from './validations/company-login';
export class CompanyController {
  private _router = Router();
  private companyService = new CompanyService();

  public get router() {
    return this._router;
  }

  constructor() {
    this._router.post('/', this.create);
    this._router.post('/login', this.login);
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
      res.location(`/api/company/${persistedCompany._id}`).sendStatus(201);
    } catch (error) {
      if (error instanceof CompanyEmailAlreadyExistsException) {
        res.status(422).send(error.message);
        return;
      }

      if (error instanceof InvalidPayloadException) {
        res.status(422).send(error.message);
        return;
      }
      res.status(500).send('Internal Server Error');
    }
  };

  private login = async (req: Request, res: Response) => {
    const companyCredentials: CompanyCredentialsDto = req.body;
    try {
      validateCompanyLoginPayload(companyCredentials);
      const companyLoginResult = await this.companyService.executeLogin(
        companyCredentials.email,
        companyCredentials.password
      );

      if (companyLoginResult) {
        generateJwt(companyCredentials.email, (error, jwtToken) => {
          if (error != null) {
            throw new AcessTokenException('Could not generate JWT token');

            return;
          } else {
            res.status(200).send({ accessToken: jwtToken });
          }
        });
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  };
}
