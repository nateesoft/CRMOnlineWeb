import React, { useState, forwardRef } from 'react';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import TopPromotion from './TopPromotion';
import SearchProduct from './SearchProduct';
import DialogDetail from './DialogDetail';
import GroupProduct from './GroupProduct';
import OrderFooter from './OrderFooter';
import ProductList from './ProductList';
import GridCategory from './GridCategory';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getImageRandom = (id) => {
  if(id === 0) {
    return require(`../../images/example/food1.jpg`);
  }
  return require(`../../images/example/food${id}.jpg`);
}

const data = [];
for (let i = 0; i < 40; i += 1) {
  const randomNumber = Math.floor(Math.random() * Math.floor(7));
  let imgShow = getImageRandom(randomNumber);
  data.push({
    id: i + 1,
    src: imgShow,
    title: `ตัวอย่างสินค้า ${i + 1}`,
    price: i + 20,
    point: 10,
    inStock: '9/10'
  });
}

function Media() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* <TopPromotion type="fade" /> */}
      {/* <GridCategory /> */}
      {/* <GroupProduct /> */}
      <SearchProduct />
      <ProductList
        handleClickOpen={() => handleClickOpen()}
        data={data}
        topic="Product all items 2020"
      />
      <OrderFooter />
      <DialogDetail
        open={open}
        handleClose={() => handleClose()}
        Transition={Transition}
      />
    </div>
  );
}

export default function ShoppingContent() {
  return (
    <Box overflow="hidden">
      <Media />
    </Box>
  );
}
