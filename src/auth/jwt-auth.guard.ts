import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthenticatedRequest } from './types/expressRequest';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      const data = this.prisma.user.findUnique({
        where: {id: decoded.id},
        select: {id: true, username: true, email:true}
      });
      request.user = decoded; // Attach user data
      return true;
    } catch (error) {
      return false;
    }
  }
}
