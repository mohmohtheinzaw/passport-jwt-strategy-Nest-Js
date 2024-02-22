export class NotificationSender {
  environment: string;

  private async sendFcmNotification(
    registration_ids: string[] | string,
    title: string,
    body: string,
    data: any,
  ) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const authToken = process.env.fcmServerKey;
    const requestBody = {
      registration_ids,
      notification: {
        title,
        body,
        data,
      },
    };
    const config = {
      method: 'post',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      url,
      data: JSON.stringify(requestBody),
    };
  }

  public async send(
    to: string[] | string,
    title: string,
    body: string,
    data: any = {},
  ) {
    try {
      await this.sendFcmNotification(to, title, body, data);
    } catch (error) {
      throw error;
    }
  }
}
