import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
  useIonViewDidEnter,
  IonList,
} from '@ionic/react';
import React, { useState } from 'react';

const Product: React.FC = () => {
  const [product, setProduct] = useState<any[]>();

  useIonViewDidEnter(() => {
    console.log('ENTERING');

    fetch('http://localhost:8000/api/product/read/')
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.result);
      });
  });
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle>Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
            <IonTitle size="large">Product</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {product?.map((e) => {
            return (
              <IonItem key={e.product_id}>
                <IonLabel>
                  <h2>{e.nama_produk}</h2>
                  <h2>{e.deskripsi}</h2>
                  <h3>{e.harga}</h3>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Product;
