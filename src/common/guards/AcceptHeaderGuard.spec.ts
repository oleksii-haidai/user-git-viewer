import { AcceptHeaderGuard } from './AcceptHeaderGuard';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, NotAcceptableException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('AcceptHeaderGuard', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should return true if accept header is application/json', async () => {
    const guard = new AcceptHeaderGuard();
    const mockExecutionContext = getExecutionContextMock('application/json');
    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should return throw exception if accept header is not application/json', async () => {
    const guard = new AcceptHeaderGuard();
    const mockExecutionContext = getExecutionContextMock('application/xml');
    try {
      guard.canActivate(mockExecutionContext);
    } catch (error) {
      expect(error).toBeInstanceOf(NotAcceptableException);
      expect(error.status).toBe(406);
    }
  });
});

function getExecutionContextMock(acceptHeader: string) {
  const mockExecutionContext = createMock<ExecutionContext>();
  const mockHttpArgumentsHost = createMock<HttpArgumentsHost>();
  mockHttpArgumentsHost.getRequest.mockReturnValue({
    headers: {
      accept: acceptHeader,
    },
  });

  mockExecutionContext.switchToHttp.mockReturnValue(mockHttpArgumentsHost);
  return mockExecutionContext;
}
