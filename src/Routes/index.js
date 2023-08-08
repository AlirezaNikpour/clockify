import React from 'react';
import {
    BrowserRouter as Router,
    Routes as RoutesWrapper,
    Route,
} from 'react-router-dom';
import NotFound from '../pages/NotFound';
import ROUTE_CONSTANTS from '../constants/ROUTE_CONSTANTS';
import GeneralLayout from '../layouts/GeneralLayout';
import Tracker from '../pages/Tracker';

function Routes() {

    return (
        <Router basename={ROUTE_CONSTANTS.ROOT.ABSOLUTE}>
            <RoutesWrapper>
                <Route path={ROUTE_CONSTANTS.ROOT.ABSOLUTE} element={<GeneralLayout />}>
                    <Route path={ROUTE_CONSTANTS.ROOT_STAR.ABSOLUTE} element={<NotFound />} />
                    <Route path={ROUTE_CONSTANTS.TRACKER.ABSOLUTE} element={<Tracker />} />
                </Route>
            </RoutesWrapper>
        </Router >
    );
}

export default Routes;
