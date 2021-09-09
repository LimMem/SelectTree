import React, { FC } from 'react';
import { SelectTreeMultiple, SelectTreeSingle } from './PropTypes';
import TreePanel from './components/TreePanel';
import './index.less';

interface SelectTreeProps {}

const prefixCls = 'select-tree';
function SelectTree(
  props: SelectTreeSingle & { children?: any },
): React.ReactElement<any, any> | null;

function SelectTree(
  props: SelectTreeMultiple & { children?: any },
): React.ReactElement<any, any> | null;

function SelectTree(props: any) {
  const { title, onOk, onDismiss, show, okText, ...restProps } = props;
  return <TreePanel {...restProps} />;
}

export default SelectTree;
