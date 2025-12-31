
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, nominalId, paymentId, userId, serverId } = body;

    // 1. Validasi Input
    if (!slug || !nominalId || !paymentId || !userId) {
      return NextResponse.json(
        { error: 'Mohon lengkapi semua data' },
        { status: 400 }
      );
    }

    // 2. Ambil Data Game & Nominal dari DB (Biar harga valid, gak dimanipulasi dari frontend)
    const game = await prisma.game.findUnique({
      where: { slug },
      include: {
        nominals: {
          where: { id: nominalId }
        }
      }
    });

    if (!game || game.nominals.length === 0) {
      return NextResponse.json(
        { error: 'Item tidak ditemukan atau tidak tersedia' },
        { status: 404 }
      );
    }

    const selectedNominal = game.nominals[0];

    // 3. Ambil Data Payment Method dari DB
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { code: paymentId }
    });

    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Metode pembayaran tidak valid' },
        { status: 400 }
      );
    }

    // 4. Hitung Total (Harga Item + Admin Fee)
    const totalPrice = selectedNominal.price + paymentMethod.adminFee;

    // 5. Generate Invoice Number (Contoh: TRX-17042023-1234)
    const invoice = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 6. Simpan ke Database
    const transaction = await prisma.transaction.create({
      data: {
        invoice: invoice,
        userId: undefined, // Belum ada login, jadi null dulu
        targetUserId: userId, 
        targetZoneId: serverId,
        totalPrice: totalPrice,
        status: 'PENDING',
        nominalId: selectedNominal.id,
        paymentId: paymentMethod.id,
      }
    });

    return NextResponse.json({
      success: true,
      invoice: transaction.invoice,
      status: transaction.status,
      message: 'Transaksi berhasil dibuat'
    });

  } catch (error) {
    console.error('Transaction Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
