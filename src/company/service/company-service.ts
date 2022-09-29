import { encryptStr } from '../../functions/encrypt';
import { CompanyDocument } from '../documents/company';
import { CompanyEmailAlreadyExistsException } from '../exceptions/company-email-already-exists-exception';
import { comparePlainText } from './../../functions/encrypt';
import { CompanyRepository } from './../repository/company-repository';
import { UserNotFoundException } from '../../exceptions/user-not-found-exception';
export class CompanyService {
  private CompanyRepository = new CompanyRepository();

  public async createCompany(
    company: CompanyDocument
  ): Promise<CompanyDocument> {
    const foundCompany = await this.CompanyRepository.findByEmail(
      company.email.toLocaleLowerCase()
    );
    if (foundCompany) {
      throw new CompanyEmailAlreadyExistsException(
        'Invalid e-mail: already exists!'
      );
    }
    const companyHashPass = {
      ...company,
      password: await encryptStr(company.password)
    } as CompanyDocument;

    return this.CompanyRepository.create(companyHashPass);
  }
  public findById = async (id: string) => {
    const user = await this.CompanyRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(`user not found: ${id}`);
    }

    return user;
  };
  public async executeLogin(email: string, password: string) {
    const foundCompany = await this.CompanyRepository.findByEmail(email);
    if (!foundCompany) {
      throw new Error('Invalid e-mail or password!');
    }

    const isValidPassword = await comparePlainText(
      password,
      foundCompany.password
    );
    console.log(isValidPassword);
    return isValidPassword;
  }
}
