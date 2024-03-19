import { validReceiver } from "@/utils/emailCheck";
import apiClient from "./api-client";

export async function sendEmail(formData: FormData, sender_email: string) {
  const receiver = formData.get("receiver")?.toString();
  const content = formData.get("content")?.toString();
  const subject = formData.get("subject")?.toString();

  if (!receiver || !content || !subject)
    return [new Error("Todos los campos son requeridos"), null];

  if (!validReceiver(receiver))
    return [new Error("El correo no es valido"), null];

  const res = await apiClient.post(`/mail/`, {
    subject,
    content,
    sender_email,
    receiver_email: receiver,
  });

  if (res.status === 404) {
    return [new Error(`The recipient's e-mail does not exist`), null];
  }

  if (res.status !== 201) {
    return [new Error("Error sendig mail"), null];
  }

  const data = await res.data;

  return [null, data];
}
