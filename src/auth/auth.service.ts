import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      return { message: 'User created successfully', user };
    } catch (error) {
      throw new Error('Username or email already exists');
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = this.jwtService.sign({ userId: user.id, role: user.role,});
    return { message: 'Login successful', token, role: user.role, email: user.email, username: user.username, id: user.id };
  }


  async details(id: string) {
    const user =await this.prisma.user.findUnique({where: {id}});
    return { message: "User Details", role: user?.role, email: user?.email, username: user?.username, id: user?.id};
  }
}