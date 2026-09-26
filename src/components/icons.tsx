import { LayeredIcon } from '@/components/layered-icon';

// Field icons from Figma. Layer insets are copied from the design.

export const MailIcon = () => (
  <LayeredIcon size={20} layers={[{ source: require('../../assets/images/icon-mail.svg') }]} />
);

export const LockIcon = () => (
  <LayeredIcon size={20} layers={[{ source: require('../../assets/images/icon-lock.svg') }]} />
);

export const PersonIcon = () => (
  <LayeredIcon
    size={20}
    layers={[
      {
        source: require('../../assets/images/icon-person.png'),
        inset: ['8.33%', '12.5%', '8.33%', '12.5%'],
      },
    ]}
  />
);

export const HeadphonesIcon = () => (
  <LayeredIcon
    size={20}
    layers={[
      {
        source: require('../../assets/images/icon-headphones.png'),
        inset: ['8.33%', '8.33%', '8.33%', '8.33%'],
      },
    ]}
  />
);

export const EnvelopeIcon = () => (
  <LayeredIcon
    size={20}
    layers={[
      {
        source: require('../../assets/images/icon-envelope-base.png'),
        inset: ['16.67%', '4.17%', '16.67%', '4.17%'],
      },
      {
        source: require('../../assets/images/icon-envelope-flap.svg'),
        inset: ['30.66%', '19.41%', '47.5%', '19.41%'],
      },
    ]}
  />
);

export const PadlockIcon = () => (
  <LayeredIcon
    size={20}
    layers={[
      {
        source: require('../../assets/images/icon-padlock-base.png'),
        inset: ['8.33%', '12.08%', '7.92%', '12.5%'],
      },
      {
        source: require('../../assets/images/icon-padlock-keyhole.svg'),
        inset: ['62.92%', '45.83%', '22.08%', '45.83%'],
      },
    ]}
  />
);

export const ImageIcon = ({ size = 31.429 }: { size?: number }) => (
  <LayeredIcon
    size={size}
    layers={[
      {
        source: require('../../assets/images/icon-image-base.png'),
        inset: ['29.17%', '4.17%', '8.33%', '4.17%'],
      },
      {
        source: require('../../assets/images/icon-image-sun.svg'),
        inset: ['4.17%', '58.33%', '62.5%', '8.33%'],
      },
    ]}
  />
);

export const BellIcon = () => (
  <LayeredIcon
    size={24}
    layers={[
      {
        source: require('../../assets/images/icon-bell.png'),
        inset: ['4.17%', '4.17%', '4.17%', '4.15%'],
      },
    ]}
  />
);

export const PencilIcon = () => (
  <LayeredIcon
    size={20}
    layers={[
      {
        source: require('../../assets/images/icon-pencil-base.png'),
        inset: ['4.17%', '4.17%', '16.67%', '16.67%'],
      },
      {
        source: require('../../assets/images/icon-pencil-tip.svg'),
        inset: ['66.67%', '66.67%', '4.17%', '4.17%'],
      },
    ]}
  />
);

export const VenueIcon = () => (
  <LayeredIcon
    size={20}
    layers={[
      {
        source: require('../../assets/images/icon-venue-base.png'),
        inset: ['8.33%', '7.5%', '8.75%', '35%'],
      },
      {
        source: require('../../assets/images/icon-venue-a.svg'),
        inset: ['8.33%', '54.58%', '32.92%', '8.33%'],
      },
      {
        source: require('../../assets/images/icon-venue-b.svg'),
        inset: ['54.58%', '34.58%', '8.33%', '8.33%'],
      },
    ]}
  />
);
