import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import Duels from './pages/Duels';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import Layout from './Layout.jsx';


export const PAGES = {
    "Onboarding": Onboarding,
    "Dashboard": Dashboard,
    "Quests": Quests,
    "Duels": Duels,
    "Profile": Profile,
    "Premium": Premium,
}

export const pagesConfig = {
    mainPage: "Onboarding",
    Pages: PAGES,
    Layout: Layout,
};