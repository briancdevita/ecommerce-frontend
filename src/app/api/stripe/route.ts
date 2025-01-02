import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Instancia de Stripe (usa tu clave secreta)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {});

// POST: Crear una Checkout Session (pago único)
export async function POST(request: NextRequest) {
  try {
    // Obtenemos los lineItems que envías desde el frontend
    const { lineItems, orderId } = await request.json();

    // Creamos la sesión de Checkout en modo 'payment'
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: 'http://localhost:3000/cancel',
    });

    // Devolvemos la URL para redirigir al usuario a Stripe Checkout
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// GET: Obtener el 'receipt_url' de la Charge asociada al PaymentIntent (pago único)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
    }

    // Recupera la sesión de Stripe y expande el latest_charge
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent.latest_charge'],
    });

    let receiptUrl = null;

    // Extrae el receipt_url del latest_charge
    if (
      session.payment_intent &&
      typeof session.payment_intent !== 'string' &&
      session.payment_intent.latest_charge &&
      typeof session.payment_intent.latest_charge !== 'string'
    ) {
      const charge = session.payment_intent.latest_charge;
      receiptUrl = charge.receipt_url || null;
    }

    return NextResponse.json({ receiptUrl });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}