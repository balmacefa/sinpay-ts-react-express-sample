import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import { IProduct, mockDB } from './components/MockDB'
import LeftPanel from './components/Left'
import MainPanel from './components/Main'
import RightPanel from './components/Right'
import ProductCartDisplay from './products/ProductCartDisplay'

export default function App() {

  const [cart, setCart] = useState<IProduct[]>([]);

  const RenderItemsCart = () => {
    // get all product
    return cart.map((item) => {
      return <ProductCartDisplay key={item.id} item={item}
        removeProduct={removeProduct}
        updateAmount={updateAmount}
      />;
    }
    );
  }

  const addProductToCart = (product: IProduct) => {
    let found;
    let newState = cart.map(obj => {
      if (obj.id === product.id) {
        found = true;
        return { ...obj, amount: (obj.amount || 0) + 1 };
      }
      return obj;
    });

    if (!found) {
      product.amount = 1;
      newState = [...cart, product];
    }
    setCart(newState);
  };

  const removeProduct = (product: IProduct) => {
    const newState = cart.filter(obj => obj.id !== product.id);
    setCart(newState);
  }

  const updateAmount = (amount: number, id: string) => {
    const newState = cart.map(obj => {
      if (obj.id === id) {
        return { ...obj, amount };
      }
      return obj;
    }
    );
    setCart(newState);
  };


  useEffect(() => {
    // add one item to the cart by default
    addProductToCart(mockDB.getFirstProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    console.log("Cart update", cart)
  }, [cart])


  return (
    <div className="App">
      <Layout
        leftPanel={<LeftPanel addProductToCart={addProductToCart} />}
        mainPanel={<MainPanel productList={RenderItemsCart()} />}
        rightPanel={<RightPanel cart={cart} />}
      />
    </div>
  )
}
