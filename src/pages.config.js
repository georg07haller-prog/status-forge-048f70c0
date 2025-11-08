import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Quests from './pages/Quests';
import Layout from './Layout.jsx';


export const PAGES = {
    "Onboarding": Onboarding,
    "Dashboard": Dashboard,
    "Quests": Quests,
}

export const pagesConfig = {
    mainPage: "Onboarding",
    Pages: PAGES,
    Layout: Layout,
};