import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EndUserService } from 'src/end-user/end-user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationSender } from './notification.sender';
let userService: EndUserService;
@Injectable()
export class NotificationService {
  static runningService: any;
  static totalUsers: number;
  static currentUserSkip: number = 0;
  static userCountPerSend: number = 20;
  static title: string | null;
  static body: string | null;
  static data: any;
  static notificationSender: NotificationSender | null;

  private static async sendNotification(skip: number, limit: number) {
    const users = await userService.getAllUser(skip, limit);

    let tokens: string[] = [];
    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      tokens.push(...element.fcm_token);
    }

    if (tokens.length > 0 && this.notificationSender) {
      try {
        await this.notificationSender.send(
          tokens,
          this.title as string,
          this.body as string,
          this.data,
        );
      } catch (error) {
        throw error;
      }
    }
  }

  private static async startNotificationInterval() {
    try {
      this.totalUsers = await userService.total();
    } catch (error) {
      throw error;
    }

    this.currentUserSkip = 0;
    this.runningService = setInterval(async () => {
      if (this.currentUserSkip >= this.totalUsers) {
        this.currentUserSkip = this.totalUsers;
        this.clearCurrentService();
      } else {
        try {
          await this.sendNotification(
            this.currentUserSkip,
            this.userCountPerSend,
          );
        } catch (error) {
          console.log(error);
        }

        if (this.totalUsers > this.userCountPerSend) {
          this.currentUserSkip += this.userCountPerSend;
        } else {
          this.currentUserSkip += this.totalUsers;
        }
      }
    }, 3000);
  }

  // Delete the current sending service

  private static clearCurrentService() {
    clearInterval(this.runningService);
    this.runningService = null;
    this.totalUsers = 0;
    this.currentUserSkip = 0;
    this.title = null;
    this.body = null;
    this.notificationSender = null;
  }

  // get current status
  public static getCurrentStatus() {
    if (this.runningService) {
      const progress =
        Math.floor(this.currentUserSkip / this.totalUsers) * 100 + '%';

      const data = {
        progress,
        totalUsers: this.totalUsers,
        currentUserSkip: this.currentUserSkip,
        title: this.title,
        body: this.body,
        data: this.data,
      };
      return data;
    } else {
      return null;
    }
  }

  public static async sendToOneUser(
    userId: string,
    title: string,
    body: string,
    data: any = {},
  ) {
    const user = await userService.get(userId);
    if (user.fcm_token) {
      const notificationSender = new NotificationSender();
      try {
        await notificationSender.send(user.fcm_token, title, body, data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public static async sendToAllUsers(
    title: string,
    body: string,
    data: any = {},
  ) {
    if (this.runningService) {
      throw new HttpException('already running service', HttpStatus.CONFLICT);
    } else {
      this.title = title;
      this.body = body;
      this.data = data;
      this.notificationSender = new NotificationSender();
      this.startNotificationInterval();
    }
  }
}
