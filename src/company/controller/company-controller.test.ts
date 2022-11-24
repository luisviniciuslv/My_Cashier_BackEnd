const ROUTER_MOCK = { get: jest.fn(), post: jest.fn() };

import { CompanyController } from './company-controller';

jest.mock('express', () => ({
  ...jest.requireActual('express'),
  Router: () => ROUTER_MOCK
}));

describe('Company Controller Tests', () => {
  test('should set routes properly', () => {
    new CompanyController();
    expect(ROUTER_MOCK.post).toHaveBeenCalledTimes(2);
    expect(ROUTER_MOCK.post).toHaveBeenCalledWith('/', expect.any(Function));
    expect(ROUTER_MOCK.post).toHaveBeenCalledWith(
      '/login',
      expect.any(Function)
    );

    expect(ROUTER_MOCK.get).toHaveBeenCalledTimes(1);
    expect(ROUTER_MOCK.get).toHaveBeenCalledWith('/:id', expect.any(Function), expect.any(Function));
  });
});
