import * as React from "react";
const BodyLayout = React.lazy(() => import("../containers/layout-body"));

const MyWork = React.lazy(() => import("../pages/my-work")); //我的工单
const Map = React.lazy(() => import("../pages/map")); //投诉建议

const LoginToHome = React.lazy(() => import("../pages/loginToHome")); //加载
const Progress = React.lazy(() => import("../pages/progress")); //进度详情
const OrderProgress = React.lazy(() => import("../pages/order-progress")); //进度详情
const OrderOver = React.lazy(() => import("../pages/order-over")); //进度详情
const RecorPprogress = React.lazy(() => import("../pages/record-progress")); //完工记录
const RecorScene = React.lazy(() => import("../pages/record-scene")); //现场记录
const RecorOver = React.lazy(() => import("../pages/record-over")); //现场记录

const config = [
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<>...</>}>{/* <Login />, */}</React.Suspense>
    ),
  },
  {
    path: "/load",
    element: (
      <React.Suspense fallback={<>...</>}>
        <LoginToHome />,
      </React.Suspense>
    ),
  },

  {
    path: "/",
    element: (
      <React.Suspense fallback={<>...</>}>
        <BodyLayout />
      </React.Suspense>
    ),
    children: [
      {
        element: (
          <React.Suspense fallback={<>...</>}>
            <MyWork />,
          </React.Suspense>
        ),
        index: true,
      },

      {
        path: "initDetail",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Progress />,
          </React.Suspense>
        ),
      },

      {
        path: "undoDetail",
        element: (
          <React.Suspense fallback={<>...</>}>
            <OrderProgress />,
          </React.Suspense>
        ),
      },
      {
        path: "overDetail",
        element: (
          <React.Suspense fallback={<>...</>}>
            <OrderOver />,
          </React.Suspense>
        ),
      },
      {
        path: "recordProgress",
        element: (
          <React.Suspense fallback={<>...</>}>
            <RecorPprogress />,
          </React.Suspense>
        ),
      },
      {
        path: "recorScene",
        element: (
          <React.Suspense fallback={<>...</>}>
            <RecorScene />,
          </React.Suspense>
        ),
      },
      {
        path: "recorOver",
        element: (
          <React.Suspense fallback={<>...</>}>
            <RecorOver />,
          </React.Suspense>
        ),
      },

      {
        path: "mywork",
        element: (
          <React.Suspense fallback={<>...</>}>
            <MyWork />,
          </React.Suspense>
        ),
      },

      {
        path: "map",
        element: (
          <React.Suspense fallback={<>...</>}>
            <Map />,
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <LoginToHome />,
  },
];
export default config;
