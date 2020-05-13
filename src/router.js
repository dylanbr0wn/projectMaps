import React, { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { animated, useTransition, config } from "react-spring";

const Home = lazy(() => import("./view/Home"));
const GPS = lazy(() => import("./view/gps"));
const NoMatch = lazy(() => import("./view/404"));

const AppRouter = () => {
    const location = useLocation();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.gentle,
    });
    return transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
            <Suspense fallback={<div> Loading ...</div>}>
                <Switch location={item}>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/gps">
                        <GPS />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Suspense>
        </animated.div>
    ));
};

export default AppRouter;
