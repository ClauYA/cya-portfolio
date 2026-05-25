import './styles/global.css';

import { useContext, useState, useEffect } from 'react';
import { AppProvider, AppCtx }  from './context/AppContext';
import { PROJECTS }             from './data/projects';

import Nav       from './components/Nav';
import BackToTop from './components/BackToTop';

import HomePage          from './pages/HomePage';
import ProjectsPage      from './pages/ProjectsPage';
import AboutPage         from './pages/AboutPage';
import ServicesPage      from './pages/ServicesPage';
import ContactPage       from './pages/ContactPage';
import PulseTrackCase    from './pages/case-studies/PulseTrackCaseStudy';
import MiningCase        from './pages/case-studies/MiningCaseStudy';

function Router() {
  const { page, caseProject } = useContext(AppCtx);

 const pages = {
    home:      <HomePage />,
    projects:  <ProjectsPage />,
    about:     <AboutPage />,
    services:  <ServicesPage />,
    casestudy: <PulseTrackCase project={caseProject || PROJECTS[0]} />,
    mining:    <MiningCase />,
    contact:   <ContactPage />,
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />
      {pages[page] || <HomePage/>}   
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}