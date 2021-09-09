import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  SelectTreeSingle,
  SelectTreeMultiple,
  SelectTreeBase,
  SelectTreeDataSource,
} from '../../PropTypes';
import TreeNav from '../TreeNav';
import TreeItem from '../TreeItem';
import '../../index.less';

const prefixCls = 'tree-panel';

interface TreePanelProps extends Omit<SelectTreeSingle, keyof SelectTreeBase> {}
interface TreePanelMultipleProps
  extends Omit<SelectTreeMultiple, keyof SelectTreeBase> {}

function TreePanel(
  props: TreePanelProps & { children?: any },
): React.ReactElement<any, any> | null;
function TreePanel(
  props: TreePanelMultipleProps & { children?: any },
): React.ReactElement<any, any> | null;

function TreePanel(props: any) {
  const { data = [], type, value, onChange = () => {} } = props;
  const [val, setVal] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<
    (string | SelectTreeDataSource)[]
  >(['请选择']);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataSource, setDataSource] = useState([data]);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (!value) {
      setVal([]);
    } else if (typeof value === 'string') {
      setVal([value]);
    } else {
      setVal(value);
    }
  }, [value]);

  const getAllValues = (
    target: SelectTreeDataSource[],
    dataArr?: SelectTreeDataSource[],
  ) => {
    dataArr?.forEach((d: SelectTreeDataSource) => {
      if (val?.includes(d.value)) {
        target.push(d);
      }
      getAllValues(target, d.children);
    });
  };

  useEffect(() => {
    const target: SelectTreeDataSource[] = [];
    getAllValues(target, data);
    onChange(target);
  }, [val, data]);

  const replaceChangeData = (item: SelectTreeDataSource) => {
    setVal([item.value]);
  };
  const addChangeData = (item: SelectTreeDataSource) => {
    const vs = [...val];
    vs.push(item.value);
    setVal(vs);
  };
  const removeChangeData = (item: SelectTreeDataSource) => {
    const vs = val.filter(it => it !== item.value);
    setVal([...vs]);
  };

  const getData = (d: any, pageItem: any, index: number): any[] => {
    if (!pageItem || typeof pageItem === 'string') {
      return d;
    }
    const target: any = d.find((item: any) => item.value === pageItem.value);
    if (target?.children?.length > 0) {
      return getData(target?.children, totalPages[index + 1], index + 1);
    }
    return d;
  };

  const onValueChange = (
    item: SelectTreeDataSource,
    type: 'replace' | 'add' | 'remove' | 'switch' | 'switchAdd',
  ) => {
    switch (type) {
      case 'replace':
        replaceChangeData(item);
        break;
      case 'add':
        addChangeData(item);
        break;
      case 'remove':
        removeChangeData(item);
        break;
      case 'switch':
        {
          const temp = [...totalPages];
          const tempDataSource = [...dataSource];
          if (item.child && item.child.length > 0) {
            const dif = totalPages.length - 1 - currentPage;
            if (dif === 0) {
              // 增加
              temp.splice(currentPage, 0, item);
              tempDataSource.push(item.child);
            } else if (dif > 0) {
              // 修改后面几项数据
              temp.splice(currentPage, dif, item);
              tempDataSource.splice(currentPage + 1, dif, item.child);
            }
            setTotalPages([...temp]);
            setDataSource([...tempDataSource]);
            setCurrentPage(temp.length - 1);
            setTimeout(() => {
              swiperRef.current.slideTo(temp.length - 1);
            }, 30);
          }
        }
        break;
    }
  };

  return (
    <div className={prefixCls}>
      <TreeNav
        pages={totalPages}
        currentIndex={currentPage}
        onChange={idx => {
          setCurrentPage(idx);
          swiperRef.current.slideTo(idx);
        }}
      />
      <div className={`${prefixCls}-container`}>
        <Swiper
          observer={true}
          autoplay={false}
          initialSlide={currentPage}
          onInit={swiper => (swiperRef.current = swiper)}
          onSlideChangeTransitionEnd={swiper =>
            setCurrentPage(swiper.activeIndex)
          }
        >
          {totalPages.map((p: any, index) => {
            return (
              <SwiperSlide key={typeof p === 'object' ? p.value : p}>
                {(dataSource[index] || []).map((item: SelectTreeDataSource) => {
                  return (
                    <TreeItem
                      key={item.value}
                      {...item}
                      type={type}
                      selectValue={val}
                      onChange={onValueChange}
                    />
                  );
                })}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default TreePanel;
