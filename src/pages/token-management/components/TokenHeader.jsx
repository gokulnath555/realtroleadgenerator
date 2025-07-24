import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TokenHeader = ({ token, shareableUrl, onRegenerateToken, onCopyUrl }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      onCopyUrl();
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your Unique Lead Capture Link</h2>
          <p className="text-muted-foreground">
            Share this link on social media, email, or any platform to capture leads automatically.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleQRCode}
            iconName="QrCode"
            iconPosition="left"
          >
            QR Code
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerateToken}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Regenerate
          </Button>
        </div>
      </div>

      {/* URL Display */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              value={shareableUrl}
              readOnly
              className="font-mono text-sm bg-muted"
            />
          </div>
          <Button
            variant="default"
            onClick={handleCopyToken}
            iconName="Copy"
            iconPosition="left"
          >
            Copy Link
          </Button>
        </div>

        {/* Token Info */}
        <div className="text-xs text-muted-foreground">
          <p>Token ID: {token}</p>
          <p>Created: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* QR Code Display */}
      {showQRCode && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg border">
              <div className="w-48 h-48 bg-muted rounded flex items-center justify-center">
                <div className="text-center">
                  <Icon name="QrCode" size={48} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">QR Code</p>
                  <p className="text-xs text-muted-foreground">for sharing</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Scan to access your lead capture form
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenHeader;