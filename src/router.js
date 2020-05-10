import React, { lazy, Suspense } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Route, Switch, withRouter } from "react-router-dom";

const Home = lazy(() => import("./view/home"));
const GPS = lazy(() => import("./view/gps"));
const NoMatch = lazy(() => import("./view/404"));

const AppRouter = withRouter(({ location }) => (

    <SwitchTransition>
        <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={300}
        >
            <Suspense fallback={<div> Loading ...</div>}>
                <Switch location={location}>
                    <Route exact path="/"  >
                        <Home />
                    </Route>
                    <Route path="/gps" >
                        <GPS />
                    </Route>
                    <Route path="*" >
                        <NoMatch />
                    </Route>
                </Switch>
            </Suspense>
        </CSSTransition>
    </SwitchTransition>

));

export default AppRouter;