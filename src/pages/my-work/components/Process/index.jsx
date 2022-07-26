import React, { useEffect, useState } from "react";
import ListCard from "../ListCard";
import "./index.less";
import { workOrderNotFinished } from "../../../../api/workorder";
import { Empty, DotLoading, InfiniteScroll } from "antd-mobile";

function Serve() {
  const [pageData, setPageData] = useState([]);
  const [pageMsg, setPagemsg] = useState({
    start_page: 1,
    limit: 10,
  });
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    let { data, additional_data } = await workOrderNotFinished(pageMsg);

    let total = additional_data.total;
    setHasMore(total > 10);
    setPageData(data);
  };
  const loadMore = async () => {
    let params = {
      start_page: pageMsg.start_page + 1,
      limit: 10,
    };
    const { data, additional_data } = await workOrderNotFinished(params);
    setPageData((val) => [...val, ...data]);
    setHasMore(data.length === 10);
    setPagemsg(params);
  };

  const InfiniteScrollContent = ({ hasMore }) => {
    return (
      <>
        {hasMore ? (
          <>
            <span>加载中</span>
            <DotLoading />
          </>
        ) : (
          <span>--- 我是有底线的 ---</span>
        )}
      </>
    );
  };

  return (
    <div>
      {pageData.length ? (
        <>
          {pageData.map((item, index) => (
            <div className="card-item" key={index}>
              <ListCard
                msg={item}
                refresh={() => getPageData()}
                gotoName="undoDetail"
              ></ListCard>
            </div>
          ))}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </>
      ) : (
        <Empty description="暂无数据" />
      )}
    </div>
  );
}

export default Serve;
