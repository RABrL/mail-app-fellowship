
export interface Email {
  mail_id: number;
  subject: string;
  sent_date: string;
  sender_email?: string;
  content: string | null;
}
