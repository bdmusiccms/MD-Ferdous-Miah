
import React from 'react';

export const GENRES = [
  'Pop', 'Hip-Hop', 'Electronic', 'Rock', 'Jazz', 'Classical', 'R&B', 'Country', 'Lofi', 'Ambient'
];

export const APP_NAME = "FM Music Station";
export const LOGO_PATH = "logo.png";

export const ICONS = {
  Logo: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={LOGO_PATH} alt={APP_NAME} {...props} />
  ),
};
