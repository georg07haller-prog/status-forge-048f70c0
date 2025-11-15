import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import Duels from './pages/Duels';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import Guide from './pages/Guide';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Landing from './pages/Landing';
import FAQ from './pages/FAQ';
import Referrals from './pages/Referrals';
import Layout from './Layout.jsx';


export const PAGES = {
    "Onboarding": Onboarding,
    "Dashboard": Dashboard,
    "Quests": Quests,
    "Duels": Duels,
    "Profile": Profile,
    "Premium": Premium,
    "Guide": Guide,
    "Privacy": Privacy,
    "Terms": Terms,
    "Landing": Landing,
    "FAQ": FAQ,
    "Referrals": Referrals,
}

export const pagesConfig = {
    mainPage: "Onboarding",
    Pages: PAGES,
    Layout: Layout,
};