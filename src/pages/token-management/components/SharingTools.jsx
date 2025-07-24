import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { generateSocialMediaContent } from '../../../utils/tokenUtils';

const SharingTools = ({ realtorName, shareableUrl }) => {
  const [copiedPlatform, setCopiedPlatform] = useState(null);
  const socialContent = generateSocialMediaContent(realtorName, shareableUrl);

  const handleCopyContent = async (platform, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedPlatform(platform);
      setTimeout(() => setCopiedPlatform(null), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: '#1877F2',
      content: socialContent.facebook,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      color: '#E4405F',
      content: socialContent.instagram,
      note: 'Copy text and paste in your Instagram post or story'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: '#0A66C2',
      content: socialContent.linkedin,
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: '#1DA1F2',
      content: socialContent.twitter,
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(socialContent.twitter)}`
    }
  ];

  const SocialCard = ({ platform }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${platform.color}15` }}
          >
            <Icon name={platform.icon} size={16} style={{ color: platform.color }} />
          </div>
          <span className="font-medium text-foreground">{platform.name}</span>
        </div>
      </div>

      <div className="mb-4">
        <textarea
          value={platform.content}
          readOnly
          rows={4}
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-muted text-foreground resize-none"
        />
        {platform.note && (
          <p className="text-xs text-muted-foreground mt-1">{platform.note}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCopyContent(platform.name, platform.content)}
          iconName={copiedPlatform === platform.name ? "Check" : "Copy"}
          iconPosition="left"
          className="flex-1"
        >
          {copiedPlatform === platform.name ? 'Copied!' : 'Copy Text'}
        </Button>
        
        {platform.shareUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(platform.shareUrl, '_blank')}
            iconName="ExternalLink"
            iconPosition="left"
          >
            Share
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Social Media Sharing Tools</h3>
        <p className="text-sm text-muted-foreground">
          Pre-written posts optimized for each platform. Copy and paste or share directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {socialPlatforms.map((platform) => (
          <SocialCard key={platform.name} platform={platform} />
        ))}
      </div>

      {/* Additional Sharing Options */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-md font-medium text-foreground mb-4">Additional Sharing Options</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              const subject = `Property Selling Consultation with ${realtorName}`;
              const body = `Hi there,\n\nI hope this email finds you well. I'm ${realtorName}, and I specialize in helping homeowners in our area get the best value for their properties.\n\nIf you're considering selling your home, I'd love to provide you with a free, no-obligation consultation. You can get started by filling out this quick form:\n\n${shareableUrl}\n\nI look forward to helping you with your real estate goals!\n\nBest regards,\n${realtorName}`;
              window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
            iconName="Mail"
            iconPosition="left"
            fullWidth
          >
            Email Template
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              const message = `Hi! I'm ${realtorName}, a local real estate agent. If you're thinking about selling your property, I'd love to help you get the best value. Fill out my quick form here: ${shareableUrl}`;
              window.location.href = `sms:?body=${encodeURIComponent(message)}`;
            }}
            iconName="MessageSquare"
            iconPosition="left"
            fullWidth
          >
            SMS Template
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Property Consultation with ${realtorName}`,
                  text: `Looking to sell your property? Get a free consultation with ${realtorName}`,
                  url: shareableUrl
                });
              } else {
                handleCopyContent('general', shareableUrl);
              }
            }}
            iconName="Share2"
            iconPosition="left"
            fullWidth
          >
            Native Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharingTools;