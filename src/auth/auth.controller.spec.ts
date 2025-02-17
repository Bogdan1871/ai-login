import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn().mockImplementation((username, email, password) => {
      return { username, email, password };
    }),
    login: jest.fn().mockImplementation((email, password) => {
      return { accessToken: 'token' };
    }),
    resetPassword: jest.fn().mockImplementation((email, newPassword) => {
      return 'Password reset successfully';
    }),
    confirmEmail: jest.fn().mockImplementation((email, token) => {
      return 'Email confirmed successfully';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const result = await authController.register({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toEqual({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('should login a user', async () => {
    const result = await authController.login({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toEqual({ accessToken: 'token' });
  });

  it('should reset password', async () => {
    const result = await authController.resetPassword({
      email: 'test@example.com',
      newPassword: 'newpassword',
    });
    expect(result).toBe('Password reset successfully');
  });

  it('should confirm email', async () => {
    const result = await authController.confirmEmail({
      email: 'test@example.com',
      token: 'token',
    });
    expect(result).toBe('Email confirmed successfully');
  });
});
