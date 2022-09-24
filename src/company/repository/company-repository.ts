import { CompanyDocument } from '../documents/company';
import Company from '../models/company';

export class CompanyRepository {
  public create(company: CompanyDocument): Promise<CompanyDocument> {
    return new Company(company).save();
  }
  public findByEmail = (email: string) => Company.findOne({ email }).exec();

  public findById = (id: string) => Company.findOne({ _id: id }).exec();
}
