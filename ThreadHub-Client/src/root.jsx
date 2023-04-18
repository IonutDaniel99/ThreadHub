// @refresh reload
import { Suspense, createSignal } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  Head,
  Html,
  Meta,
  Scripts,
  Routes,
  Route,
  Title,
  useLocation,
} from "solid-start";
import "./root.css";

import Dashboard from "./routes/dashboard";
import About from "./routes/about";

export default function Root() {

  const location = useLocation();

  const active = (path) =>
    path == location.pathname
      ? "text-orange font-bold border-b-2 border-orange"
      : "text-gray-300 font-semibold";

  return (
    <Html lang="en">
      <Head>
        <Title>The ThreadHub</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <div class="h-16 bg-white border-b-2 border-gray-200 flex items-center gap-4 px-4">
              <img src="/images/logo.png" alt="Solid logo" class="h-5/6" />
              <A
                href="/dashboard"
                class={`${active("/dashboard")} duration-500 transition ease-in-out px-2.5 w-28 h-full flex items-center justify-center`}
              >Dashboard</A>
              <A href="/about"
                class={`${active("/about")} duration-500 transition ease-in-out px-2.5 h-full w-28 flex items-center justify-center`}
              >About</A>
            </div>
            <Routes>
              <Route path="/" component={Dashboard} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/about" component={About} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
