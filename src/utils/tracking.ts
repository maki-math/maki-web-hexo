import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

export const ga = ReactGA.ga.bind(ReactGA);
export const gtag = ReactGA.gtag.bind(ReactGA);

export const useTracking = () => {
  useEffect(() => {
    ReactGA.initialize('G-K5CPJGBDXD');
    gtag('js', new Date());
    gtag('config', 'G-K5CPJGBDXD');
  }, []);
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
};
