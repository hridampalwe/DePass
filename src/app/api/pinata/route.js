import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const options = JSON.stringify({
      cidVersion: 0,
    });
    
    const res = await fetch(
      `https://${process.env.PINATA_API}/pinning/pinFileToIPFS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT_KEY}`, // No NEXT_PUBLIC_ prefix
        },
        body: formData,
      }
    );

    const resData = await res.json();
    
    if (!res.ok) {
      throw new Error(`Pinata API error: ${resData.error || 'Unknown error'}`);
    }
    
    return NextResponse.json({ IpfsHash: resData.IpfsHash });
  } catch (error) {
    console.error('Pinata upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload to IPFS' },
      { status: 500 }
    );
  }
}
