import React, { useState, useEffect } from "react";
import {
  List,
  Switch,
  NavBar,
  SearchBar,
  InfiniteScroll,
  DotLoading,
} from "antd-mobile";
import "./index.less";
import { SearchOutline, MoreOutline, CloseOutline } from "antd-mobile-icons";
import {
  listManufactor,
  listDeviceType,
  listProject,
  listWarranty,
  listCompany,
  addSiteSituation,
} from "../../../../api/workorder";
import { debounce } from "../../../../utils/tool";

function Project({ callback, closePage }) {
  const [data, setData] = useState([]);
  const [pageMsg, setPagemsg] = useState({
    start_page: 1,
    limit: 10,
  });
  const [hasMore, setHasMore] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async (val) => {
    let params = {
      name: val,
      ...pageMsg,
    };
    let { data, success } = await listProject(params);
    if (success) {
      setData(data);
      setHasMore(data.length >= 10);
    }
  };
  const back = () => {
    closePage(true);
  };
  const handleChange = async (val) => {
    setSearchVal(val);
    setPagemsg({
      start_page: 1,
      limit: 10,
    });
    // await setTimeout(() => {}, 1000);
    getPageData(val);
  };
  const chooseItem = (val) => {
    callback(val);
  };
  const loadMore = async () => {
    let params = {
      name: searchVal,
      start_page: pageMsg.start_page + 1,
      limit: 10,
    };
    const { data, additional_data } = await listProject(params);
    setData((val) => [...val, ...data]);
    setHasMore(data.length >= 10);
    setPagemsg(params);
  };

  const InfiniteScrollContent = ({ hasMore }) => {
    return (
      <>
        {hasMore ? (
          <>
            <span>加載中</span>
            <DotLoading />
          </>
        ) : (
          <span>--- 我是有底线的 ---</span>
        )}
      </>
    );
  };

  return (
    <div className="search-list">
      <NavBar back="" backArrow={<CloseOutline />} onBack={back}>
        选择项目
      </NavBar>
      <SearchBar
        placeholder="请输入内容"
        onChange={debounce(handleChange, 300)}
        val={searchVal}
        style={{
          "--background": "#f5f5f5",
          "--height": "32px",
          "--padding-left": "12px",
          margin: "4px 18px",
          boxSizing: "border-box",
        }}
      />
      <div className="list-wrap">
        <List header="">
          {data.map((item) => (
            <List.Item
              key={item.id}
              title={item.code}
              arrow={false}
              onClick={() => {
                chooseItem(item);
              }}
            >
              {item.name}
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
          <InfiniteScrollContent hasMore={hasMore} />
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Project;
