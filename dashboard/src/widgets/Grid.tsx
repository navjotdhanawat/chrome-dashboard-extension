import React, { FC } from 'react';

type GridProps = {
  columns: number;
  children: any;
};

const Grid: FC<GridProps> = ({ children, columns }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        padding: 50,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
