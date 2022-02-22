import { Navigate } from 'react-router-dom';
import Search from '../Search/Search';
import ResultPage from '../Search/ResultPage';

const routes = [
  // {
  //   path: '/loader',
  //   name: 'Loader Test',
  //   component: Loader,
  // },
  {
    path: '/',
    name: 'Search',
    component: Search,
  },
  {
    path: '/result/:title',
    name: 'ResultPage',
    component: ResultPage,
  },
];

const route404 = {
  path: '/*',
  name: 'Not Found',
  component: () => <Navigate to="/" />,
};

// needs to go last in <Switch> list
routes.push(route404);

export default routes;
