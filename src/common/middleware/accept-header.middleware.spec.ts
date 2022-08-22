import { Request, Response, NextFunction } from 'express';
import { AcceptHeaderMiddleware } from './accept-header.middleware';

describe('accept header middleware', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return 406 if accept header is not set to application/json', async () => {
    const { req, res, next } = getMiddlewareArgs('application/xml');
    const middleware = new AcceptHeaderMiddleware();
    await middleware.use(req, res, next);
    expect(res.status).toHaveBeenCalledWith(406);
    expect(res.json).toHaveBeenCalledWith({
      status: 406,
      Message: "Accept header must be 'application/json'",
    });
  });

  it('should call next if accept header is set to application/json', async () => {
    const { req, res, next } = getMiddlewareArgs('application/json');
    const middleware = new AcceptHeaderMiddleware();
    await middleware.use(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

function getMiddlewareArgs(accept) {
  const req = {
    headers: {
      accept,
    },
  } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;
  return {
    req,
    res,
    next,
  };
}
