
export interface Email {
  id: number;
  subject: string;
  sent_date: string;
  sender_email: string;
  content: string | null;
}
