import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { ticketNumber, email } = await request.json()

    if (!ticketNumber || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate QR code data
    const qrData = {
      ticketNumber,
      email,
      timestamp: new Date().toISOString(),
      venue: 'The Underground',
      date: '2024-06-30',
    }

    const qrCodeData = JSON.stringify(qrData)

    return NextResponse.json({
      success: true,
      qrCodeData,
      ticketNumber,
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
