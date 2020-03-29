import React, { useCallback, useState } from 'react';
import useMount from 'react-use/lib/useMount';
import useToggle from 'react-use/lib/useToggle';
import styles from './NavTop.module.css';

type Link = {
  label: string;
  location: string;
};

type IconLink = {
  label: string;
  icon: string;
  classNames?: string[];
  style?: React.CSSProperties;
  location?: string;
};

const COLOR = {
  BLUE: '#5086ec',
  GREEN: 'rgb(78, 160, 105)',
  YELLOW: 'rgb(237, 187, 67)',
  ORANGE: 'rgb(242, 160, 60)',
};

const NavTop = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [services, setServices] = useState<IconLink[]>([]);
  const [products, setProducts] = useState<IconLink[]>([]);
  const [showApps, toggleShowApps] = useToggle(false);

  const [signin] = useState<Link>({
    label: 'Sign in',
    location: 'https://accounts.google.com/ServiceLogin',
  });

  const openLocation = useCallback(
    (link: Link | IconLink) => () => {
      link.location && window.open(link.location, '_blank');
    },
    []
  );

  useMount(() => {
    const data: Link[] = [
      { label: 'Gmail', location: 'https://mail.google.com/mail/' },
      { label: 'Images', location: 'https://www.google.com/imghp' },
    ];
    setLinks(data);
  });

  useMount(() => {
    const data: IconLink[] = [
      {
        label: 'Account',
        icon: 'fas fa-user-shield',
        style: { color: COLOR.BLUE },
      },
      {
        label: 'Search',
        icon: 'fab fa-google',
        classNames: [styles.serviceSearch],
      },
      {
        label: 'Maps',
        icon: 'fas fa-map-marker-alt',
        classNames: [styles.serviceMaps],
      },
      { label: 'YouTube', icon: 'fab fa-youtube', style: { color: 'red' } },
      {
        label: 'Play',
        icon: 'fab fa-google-play',
        classNames: [styles.servicePlay],
      },
      {
        label: 'Gmail',
        icon: 'far fa-envelope',
        classNames: [styles.serviceMail],
      },
      {
        label: 'Contacts',
        icon: 'fas fa-user-circle',
        style: { color: COLOR.BLUE },
      },
      {
        label: 'Drive',
        icon: 'fab fa-google-drive',
        classNames: [styles.serviceDrive],
      },
      {
        label: 'Calendar',
        icon: 'fas fa-calendar',
        style: { color: COLOR.BLUE },
      },
      {
        label: 'Translate',
        icon: 'fas fa-language',
        style: { color: COLOR.BLUE },
      },
      {
        label: 'Photos',
        icon: 'fas fa-fan',
        classNames: [styles.servicePhotos],
      },
      { label: 'Duo', icon: 'fas fa-video', style: { color: COLOR.BLUE } },
    ];
    setServices(data);
  });

  useMount(() => {
    const data: IconLink[] = [
      {
        label: 'Finance',
        icon: 'fas fa-chart-line',
        style: { color: COLOR.GREEN },
      },
      { label: 'Docs', icon: 'fas fa-file-alt', style: { color: COLOR.BLUE } },
      {
        label: 'Sheets',
        icon: 'fas fa-file-excel',
        style: { color: COLOR.GREEN },
      },
      {
        label: 'Slides',
        icon: 'fas fa-file-invoice',
        style: { color: COLOR.YELLOW },
      },
      {
        label: 'Blogger',
        icon: 'fab fa-blogger',
        style: { color: COLOR.ORANGE },
      },
      {
        label: 'Hangouts',
        icon: 'fas fa-comment-dots',
        style: { color: COLOR.GREEN },
      },
      {
        label: 'Keep',
        icon: 'fas fa-lightbulb',
        style: { color: COLOR.YELLOW },
      },
      { label: 'Jamboard', icon: 'fas fa-question' },
      { label: 'Earth', icon: 'fas fa-globe', style: { color: COLOR.BLUE } },
      {
        label: 'Collections',
        icon: 'fas fa-bookmark',
        style: { color: COLOR.YELLOW },
      },
      { label: 'Arts and Culture', icon: 'fas fa-landmark' },
    ];
    setProducts(data);
  });

  return (
    <div className={styles.NavTop}>
      {links.map((link) => (
        <div
          key={link.label}
          className={styles.link}
          onClick={openLocation(link)}
        >
          {link.label}
        </div>
      ))}
      <div className={styles.apps} onClick={toggleShowApps}>
        <i className="fas fa-th"></i>
      </div>
      <div
        className={styles.appsMenu}
        style={{ visibility: showApps ? 'visible' : 'hidden' }}
      >
        <div className={styles.services}>
          {services.map((service) => (
            <div
              key={service.label}
              className={styles.item}
              onClick={openLocation(service)}
            >
              <i
                className={[service.icon]
                  .concat(service.classNames || [])
                  .join(' ')}
                style={service.style || {}}
              />
              <span>{service.label}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className={styles.products}>
          {products.map((product) => (
            <div
              key={product.label}
              className={styles.item}
              onClick={openLocation(product)}
            >
              <i
                className={[product.icon]
                  .concat(product.classNames || [])
                  .join(' ')}
                style={product.style || {}}
              />
              <span>{product.label}</span>
            </div>
          ))}
        </div>
        <div className={styles.more}>More From Google</div>
      </div>
      <div className={styles.signin} onClick={openLocation(signin)}>
        {signin.label}
      </div>
    </div>
  );
};

export default NavTop;
