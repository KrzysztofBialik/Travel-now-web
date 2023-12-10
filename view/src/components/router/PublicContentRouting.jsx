import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StarterPage, URL as StarterURL } from '../../pages/starter-page/StarterPage';
import { LoginPage, URL as LoginURL } from '../../pages/login-page/LoginPage';
import { RegisterPage, URL as RegisterURL } from '../../pages/register-page/RegisterPage';
import { ErrorPage } from '../../pages/error-page/ErrorPage';
import { DashboardPage, URL as DashboardURL } from '../../pages/dashboard-page/DashboardPage';
import { AccommodationsPage, URL as AccommodationsURL } from '../../pages/accommodation-pages/AccommodationsPage';
import { AccommodationsPageAll, URL as AccommodationsAllURL } from '../../pages/accommodation-pages/AccommodationsPageAll';
import { MyAccommodationsPage, URL as MyAccommodationsURL } from '../../pages/accommodation-pages/MyAccommodationsPage';
import { MyAccommodationVotesPage, URL as MyAccommodationVotesURL } from '../../pages/accommodation-pages/MyAccommodationVotesPage';
import { AvailabilityPage, URL as AvailabilityURL } from '../../pages/availability-pages/AvailabilityPage';
import { AvailabilityPageNew, URL as AvailabilityNewURL } from '../../pages/availability-pages/AvailabilityPageNew';
import { OptimizedDatesPage, URL as OptimizedDatesPageURL } from '../../pages/availability-pages/OptimizedDatesPage';
import { OptimizedDatesPageNew, URL as OptimizedDatesPageNewURL } from '../../pages/availability-pages/OptimizedDatesPageNew';
import { DayPlanPage, URL as DayPlanURL } from '../../pages/dayPlan-page/DayPlanPage';
import { FinancesPage, URL as FinancesURL } from '../../pages/finances-page/FinancesPage';
import { ParticipantsPage, URL as ParticipantsURL } from '../../pages/participants-page/ParticipantsPage';
import { TripSummaryPage, URL as TripSummaryURL } from '../../pages/tripSummary-page/TripSummaryPage';
import { InvitePage, URL as InviteURL } from '../../pages/invite-page/InvitePage';


export const PublicContentRouting = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<StarterPage />} />
                <Route exact path={StarterURL} element={<StarterPage />} />
                <Route exact path={LoginURL} element={<LoginPage />} />
                <Route exact path={RegisterURL} element={<RegisterPage />} />
                <Route exact path="*" element={<ErrorPage />} />
                {/* Routing to be moved to protected */}
                <Route exact path={DashboardURL} element={<DashboardPage />} />
                <Route exact path={AccommodationsURL} element={<AccommodationsPage />} />
                {/* <Route exact path={AccommodationsAllURL} element={<AccommodationsPageAll />} /> */}
                <Route exact path={MyAccommodationsURL} element={<MyAccommodationsPage />} />
                <Route exact path={MyAccommodationVotesURL} element={<MyAccommodationVotesPage />} />
                {/* <Route exact path={AvailabilityURL} element={<AvailabilityPage />} /> */}
                <Route exact path={AvailabilityNewURL} element={<AvailabilityPageNew />} />
                {/* <Route exact path={OptimizedDatesPageURL} element={<OptimizedDatesPage />} /> */}
                <Route exact path={OptimizedDatesPageNewURL} element={<OptimizedDatesPageNew />} />
                <Route exact path={DayPlanURL} element={<DayPlanPage />} />
                <Route exact path={FinancesURL} element={<FinancesPage />} />
                <Route exact path={ParticipantsURL} element={<ParticipantsPage />} />
                <Route exact path={TripSummaryURL} element={<TripSummaryPage />} />
                <Route exact path={InviteURL} element={<InvitePage />} />
            </Routes>
        </BrowserRouter>
    );
};