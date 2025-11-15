export class Notificador {
  enviarEmail(destinatario: string, assunto: string, corpo: string) {
    console.log(`[EMAIL] Para: ${destinatario} | ${assunto} -> ${corpo}`);
  }

  enviarSMS(numero: string, mensagem: string) {
    console.log(`[SMS] Para: ${numero} -> ${mensagem}`);
  }

  enviarWhatsApp(numero: string, mensagem: string) {
    console.log(`[WHATSAPP] Para: ${numero} -> ${mensagem}`);
  }
}
