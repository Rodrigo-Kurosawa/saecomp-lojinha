import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeProps {
  value: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ value }) => {
  return (
    <div>
      <h2>Pagamento</h2>
      <QRCode value={value} />
      <p>Escaneie o QR Code para realizar o pagamento.</p>
    </div>
  );
};

export default QRCodeComponent;