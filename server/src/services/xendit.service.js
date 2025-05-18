import Invoice from '../config/xendit.js'

export const createXenditInvoice = async ({ pembayaranSurveiId, jumlahTagihan, penggunaEmail, judulSurvei }) => {
  try {
    const invoice = await Invoice.createInvoice({
      externalID: pembayaranSurveiId,
      amount: jumlahTagihan,
      payerEmail: penggunaEmail,
      description: `Pembayaran Survei: ${judulSurvei}`,
      successRedirectURL: `${process.env.CLIENT_URL}/pembayaran-survei/success`,
      failureRedirectURL: `${process.env.CLIENT_URL}/pembayaran-survei/failed`,
      currency: 'IDR',
      invoice_duration: 3600
    });

    console.info('[XENDIT_INVOICE_CREATED]', {
      externalId: pembayaranSurveiId,
      penggunaEmail,
      jumlahTagihan
    });

    return {
      invoiceUrl: invoice.invoice_url,
      xenditId: invoice.id
    };
  } catch (error) {
    throw { status: 503, message: `Payment gateway error: ${error.message}`};
  }
};

export const validateWebhook = (payload) => {
  if (!payload?.callback_token) {
    throw { status: 401, message: 'Missing callback token'};
  }

  if (payload.callback_token !== process.env.XENDIT_CALLBACK_TOKEN) {
    throw { status: 403, message: 'Invalid webhook token'};
  }

  return {
    pembayaranSurveiId: payload.external_id,
    status: payload.status?.toLowerCase() || 'failed',
    paidAmount: payload.paid_amount || 0,
    paymentMethod: payload.payment_method || null
  };
};
