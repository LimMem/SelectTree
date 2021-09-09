import React, { FC } from 'react';
import SelectTree from '../';
import { dataSource } from './data';

interface DemoProps {}

const Demo: FC<DemoProps> = props => {
  return (
    <div style={{ height: '100vh' }}>
      <SelectTree
        show
        data={dataSource}
        type="multiple"
        value={['2', '3740']}
        onChange={v => console.log(v)}
      />
    </div>
  );
};

export default Demo;
