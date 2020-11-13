import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip, Divider, Skeleton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./index.less";

export default class Card extends Component {
  static propTypes = {
    // 必传
    title: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  render() {
    // 分别是头部  底部 中部 和加载
    const { title, footer, children, loading } = this.props;
    // console.log(1);

    return (
      <div className="card">
        {/* 骨架屏 */}
        <Skeleton
          loading={loading}
          active
          title={{ width: "100%" }}
          paragraph={{ rows: 3, width: "100%" }}
        >
          <div className="card-header">
            {title}
            {/* 图标,就是那个问号 */}
            <Tooltip title="指标说明">
              <QuestionCircleOutlined className="card-icon" />
            </Tooltip>
          </div>
          {/* 子节点,就是中部,在面面以子节点形式写 */}
          <div className="card-content">{children}</div>
          {footer && (
            <>
            {/* 分割线组件 */}
              <Divider style={{ margin: "10px 0" }} />
              {/* 底部内容 */}
              <div className="card-footer">{footer}</div>
            </>
          )}
        </Skeleton>
      </div>
    );
  }
}
