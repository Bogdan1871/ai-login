import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Role, RoleDocument } from '../schemas/role.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(username: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, email, password: hashedPassword });
    await newUser.save();

    // Send confirmation email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      template: './confirmation', // Path to the email template
      context: {
        username: username,
        token: 'confirmation_token', // Generate a real token here
      },
    });

    return newUser;
  }

  async confirmEmail(email: string, token: string): Promise<string> {
    // Implement email confirmation logic here
    return 'Email confirmed successfully';
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async resetPassword(email: string, newPassword: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return 'Password reset successfully';
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
}
