import { faPlaystation } from '@fortawesome/free-brands-svg-icons/faPlaystation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DesktopIcon } from '@/components/Icons';
import type { Platform } from '@/data/gaming';

interface PlatformIconProps {
  platform: Platform;
  size?: number;
}

const PLATFORM_LABEL: Record<Platform, string> = {
  pc: 'PC',
  playstation: 'PlayStation',
};

export default function PlatformIcon({
  platform,
  size = 14,
}: PlatformIconProps) {
  return (
    <span className="platform-icon" title={PLATFORM_LABEL[platform]}>
      {platform === 'pc' ? (
        <DesktopIcon size={size} />
      ) : (
        <FontAwesomeIcon
          icon={faPlaystation}
          style={{ width: size, height: size }}
        />
      )}
      <span className="sr-only">{PLATFORM_LABEL[platform]}</span>
    </span>
  );
}
