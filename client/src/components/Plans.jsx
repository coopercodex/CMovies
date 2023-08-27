import React, { useState } from 'react'
import { useEffect } from 'react'
import { collection, doc, query, where, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { db } from '../firebase'
import { useSelector } from 'react-redux';
import { selectUser } from './redux/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import ReactLoading from 'react-loading';
import './plans.css'

export const Plans = () => {
  const [products, setProducts] = useState([])
  const user = useSelector(selectUser)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = query(collection(db, "products"), where("active", "==", true));

    onSnapshot(q, (querySnapshot) => {
      const products = {};
      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const productDocRef = doc(db, "products", productDoc.id);
        const priceSnap = await getDocs(collection(productDocRef, "prices"));
        priceSnap.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  const loadCheckout = async (priceId) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    },2600)
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data()
      if (error) {
        alert(`An error occurred: ${error.message}`)
      }
      if (sessionId) {
        const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
        stripe.redirectToCheckout({ sessionId })
      }
    })
  }

  return (!loading) ? (
    <div className='plans-page'>
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className='plansPage-plan' key={productId}>
            <div className='plans-info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
          </div>
        )
      })}
    </div>
  ) : <div style={{ position: 'relative', zIndex: 1 }} ><ReactLoading type={'cylon'} color={'rgb(77, 194, 223)'} height={'40%'} width={'45%'} /> <h1 style={{marginTop: -75, color: 'rgb(77, 194, 223)', fontSize: 45 }}>Redirecting to Stripe</h1></div> 
}
