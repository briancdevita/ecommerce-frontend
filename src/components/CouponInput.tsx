// components/CouponInput.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store'; // Ajusta la ruta según tu estructura
import { applyCoupon } from '@/redux/thunks/applyCupon';
import { clearCoupon } from '@/redux/slices/cartSlice';
import { Button, TextField, Typography } from '@mui/material';


const CouponInput: React.FC = () => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { status, error, couponCode } = useSelector((state: RootState) => state.cart);

  const handleApplyCoupon = () => {
    if (code.trim() === '') return;
    dispatch(applyCoupon(code));
  };

  const handleClearCoupon = () => {
    dispatch(clearCoupon());
    setCode('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <TextField
        label="Código de Cupón"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={!!couponCode}
        variant="outlined"
        size="small"
        style={{ marginRight: '10px' }}
      />
      {!couponCode ? (
        <Button
          onClick={handleApplyCoupon}
          variant="contained"
          color="primary"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Aplicando...' : 'Aplicar'}
        </Button>
      ) : (
        <Button
          onClick={handleClearCoupon}
          variant="contained"
          color="secondary"
        >
          Quitar Cupón
        </Button>
      )}
      {status === 'failed' && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      {status === 'succeeded' && (
        <Typography color="primary" variant="body2">
          ¡Cupón aplicado correctamente!
        </Typography>
      )}
    </div>
  );
};

export default CouponInput;