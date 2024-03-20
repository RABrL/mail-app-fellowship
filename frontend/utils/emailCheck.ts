const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function validReceiver(receiver: string): boolean {
  return emailRegex.test(receiver);
}
