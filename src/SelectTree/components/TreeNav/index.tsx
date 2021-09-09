import React, { FC, useEffect, useRef, useState, useMemo } from 'react';
import classnames from 'classnames';
import { SelectTreeDataSource } from '../../PropTypes';

interface TreeNavProps {
  pages?: (SelectTreeDataSource | string)[];
  color?: string;
  currentIndex: number;
  onChange?: (idx: number) => void;
}

const prefixCls = 'tree-nav';
const TreeNav: FC<TreeNavProps> = props => {
  const {
    pages = [],
    color = '#1989fa',
    currentIndex = 0,
    onChange = () => {},
  } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);
  useEffect(() => {
    const dom: HTMLDivElement | null = wrapperRef.current;
    const style: React.CSSProperties = { backgroundColor: color };
    setTimeout(() => {
      if (dom) {
        const childNodes = dom.childNodes;
        if (childNodes.length > currentIndex) {
          const node: any = childNodes[currentIndex];
          const x = node.offsetLeft + node.offsetWidth / 2;
          setOffsetX(x);
        }
      }
    }, 30);
  }, [currentIndex]);

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-wrapper`} ref={wrapperRef}>
        {pages.map((p, index) =>
          typeof p === 'object' ? (
            <div
              className={`${prefixCls}-item`}
              key={p.value}
              onClick={() => {
                onChange(index);
              }}
            >
              {p.title}
            </div>
          ) : (
            <div
              key={p}
              onClick={() => {
                onChange(index);
              }}
              className={classnames(
                `${prefixCls}-item`,
                `${prefixCls}-unselected`,
              )}
            >
              {p || '请选择'}
            </div>
          ),
        )}
        <div
          className={`${prefixCls}-line`}
          style={{
            backgroundColor: color,
            transform: `translateX(${offsetX}px) translateX(-50%)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TreeNav;
