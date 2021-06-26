import { IonApp, IonRouterOutlet } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Content/Home';
import Register from './pages/Auth/Register';
import LoginTab from './pages/Auth/LoginTab';
import Product from './pages/Content/Product';
import AkunSaya from './pages/Content/AkunSaya';
import Kupon from './pages/Content/Kupon';
import Detail from './pages/Content/Detail'
import Transaksi from './pages/Content/Transaksi';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={LoginTab} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/product" component={Product} exact />
          <Route path="/akun" component={AkunSaya} exact />
          <Route path="/kupon" component={Kupon} exact />
          <Route path="/trx/:id" component={Detail}/>
          <Route path="/trx" component={Transaksi} exact />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
