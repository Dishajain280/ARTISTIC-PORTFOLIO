import React from 'react';
import { LandingView, LandingViewProps } from './LandingView';

export type HomeViewProps = LandingViewProps;

export const HomeView: React.FC<HomeViewProps> = (props) => {
  return <LandingView {...props} />;
};
