import { moeglicheSlots } from '@/lib/slots';

export const dynamic = 'force-dynamic';

/**
 * Liefert die buchbaren Terminfenster.
 *
 * Bewusst ohne Kalender-Abgleich je Slot (das wären dutzende Anfragen):
 * Die Feinprüfung des einen gewählten Slots passiert beim Buchen. Kollisionen
 * sind dadurch selten statt unmöglich — und werden dort sauber abgefangen.
 */
export async function GET() {
  const slots = moeglicheSlots().map((s) => s.iso);
  return Response.json({ slots });
}
