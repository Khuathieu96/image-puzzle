import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Piece, zoomState } from '../../types/types';
import { MiniBar } from './components/MiniBar';

type MiniMapProps = {
  miniBoard: { miniBoardScale: number; width: number; height: number };
  pieces: Piece[];
  stageScale: number;
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
  zoom: zoomState;
  handleSetCoordinateZoom: (e: zoomState) => void;
};

const MiniMap = ({
  miniBoard,
  pieces,
  zoom,
  handleSetCoordinateZoom,
  handleDragStart,
  handleDragEnd,
  stageScale,
}: MiniMapProps) => {
  const handleClickZoom = (e: any) => {
    if (e.target.getType() === 'Stage')
      handleSetCoordinateZoom({
        ...zoom,
        hidden: false,
        x: e.evt.offsetX - 100 / 2,
        y: e.evt.offsetY - 100 / 2,
      });
  };
  const minStarX = Math.min(...pieces.map((item) => item.x));
  const minStarY = Math.min(...pieces.map((item) => item.y));

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        boxShadow: '0 8px 16px 0 rgb(0 0 0 / 12%)',
        background: 'white',
        borderRadius: 4,
        bottom: 20,
        right: 20,
      }}
    >
      <div
        style={{
          width: 300,
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stage
          width={miniBoard.width}
          height={miniBoard.height}
          scaleX={miniBoard.miniBoardScale}
          scaleY={miniBoard.miniBoardScale}
          draggable={true}
        >
          <Layer>
            {pieces.map((piece) => (
              <Rect
                key={piece.id}
                id={piece.id}
                x={piece.x - minStarX}
                y={piece.y - minStarY}
                width={piece.width}
                height={piece.height}
                fill={piece.fillColor}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <Stage
        style={{ position: 'absolute', top: 0, left: 0 }}
        width={300}
        height={150}
        onClick={handleClickZoom}
      >
        <Layer>
          <Rect
            key={zoom.id}
            id={zoom.id}
            x={zoom.x}
            y={zoom.y}
            width={
              zoom.hidden
                ? 0
                : (window.innerWidth * miniBoard.miniBoardScale) / stageScale
            }
            height={
              zoom.hidden
                ? 0
                : (window.innerHeight * miniBoard.miniBoardScale) / stageScale
            }
            stroke={'black'}
            strokeWidth={1}
            draggable
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>

      <div>
        <MiniBar />
      </div>
    </div>
  );
};

export default MiniMap;
