import React from 'react';
import { Shape } from 'react-konva';
import { WIDTH_TILE } from '../../types/constants';
import { Frame } from '../../types/types';
import { renderTiles } from '../../utils/frames';

type FrameProps = {
  frames: Frame[];
};

const Frames = ({ frames }: FrameProps) => {
  return (
    <>
      {frames.map((frame) => (
        <Shape
          key={frame.id}
          id={frame.id}
          fill={frame.fillColor}
          x={frame.x}
          width={WIDTH_TILE}
          height={WIDTH_TILE}
          y={frame.y}
          opacity={0.2}
          sceneFunc={(context, shape) => {
            const widthTile = WIDTH_TILE / 3;
            context.beginPath();
            context.moveTo(0, 0);
            renderTiles(context, widthTile, 0, 0, frame.edgeType);

            context.closePath();
            context.fillStrokeShape(shape);
          }}
          stroke={frame.strokeColor}
          strokeWidth={frame.strokeWidth}
        />
      ))}
    </>
  );
};

export default Frames;