import { BackgroundLayout } from 'mapbox-gl';
import React from 'react';
import { Layer } from 'react-map-gl';

/*
  http://visgl.github.io/react-map-gl/docs/api-reference/layer
  """Note that layers are added by the order that they mount
  They are NOT reordered later if their relative positions in the JSX tree change
  If dynamic reordering is desired, you should manipulate beforeId for consistent behavior.

  Workaround involves consistently ordered layers that act as anchor
  points to order other dynamic layers 
  https://github.com/visgl/react-map-gl/issues/939#issuecomment-625290200
  */

const NO_VIS_LAYOUT: BackgroundLayout = { visibility: 'none' };

export type AnchorLayerProps = {
    id: string;
};

export const AnchorLayer = ({ id }: AnchorLayerProps) => <Layer id={id} type='background' layout={NO_VIS_LAYOUT} />;
