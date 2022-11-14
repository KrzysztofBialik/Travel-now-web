import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StarterPage, URL as StarterURL } from '../../pages/starter-page/StarterPage';
import { LoginPage, URL as LoginURL } from '../../pages/login-page/LoginPage';
import { RegisterPage, URL as RegisterURL } from '../../pages/register-page/RegisterPage';
import { ErrorPage } from '../../pages/error-page/ErrorPage';
import { DashboardPage, URL as DashboardURL } from '../../pages/dashboard-page/DashboardPage';
import { AccommodationsPage, URL as AccommodationURL } from '../../pages/accommodation-pages/AccommodationsPage';
import { MyAccommodationsPage, URL as MyAccommodationsURL } from '../../pages/accommodation-pages/MyAccommodationsPage';
import { MyAccommodationVotesPage, URL as MyAccommodationVotesURL } from '../../pages/accommodation-pages/MyAccommodationVotesPage';
import { AvailabilityPage, URL as AvailabilityURL } from '../../pages/availability-page/AvailabilityPage';
import { DayPlanPage, URL as DayPlanURL } from '../../pages/dayPlan-page/DayPlanPage';
import { ExpensesPage, URL as ExpensesURL } from '../../pages/expenses-page/ExpensesPage';
import { MediaPage, URL as MediaURL } from '../../pages/media-page/MediaPage';
import { ParticipantsPage, URL as ParticipantsURL } from '../../pages/participants-page/ParticipantsPage';
import { TripSummaryPage, URL as TripSummaryURL } from '../../pages/tripSummary-page/TripSummaryPage';


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
                <Route exact path={AccommodationURL} element={<AccommodationsPage />} />
                <Route exact path={MyAccommodationsURL} element={<MyAccommodationsPage />} />
                <Route exact path={MyAccommodationVotesURL} element={<MyAccommodationVotesPage />} />
                <Route exact path={AvailabilityURL} element={<AvailabilityPage />} />
                <Route exact path={DayPlanURL} element={<DayPlanPage />} />
                <Route exact path={ExpensesURL} element={<ExpensesPage />} />
                <Route exact path={MediaURL} element={<MediaPage />} />
                <Route exact path={ParticipantsURL} element={<ParticipantsPage />} />
                <Route exact path={TripSummaryURL} element={<TripSummaryPage />} />
            </Routes>
        </BrowserRouter>
    );
};