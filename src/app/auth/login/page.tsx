import { login } from "@/redux/slices/authSlice";
import axiosInstance from "@/utils/axiosInstance";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";



interface LoginFormInputs {
    email: string;
    password: string;
}


const LoginPage: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>();
    const dispatch = useDispatch();
    const router =  useRouter();


    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            dispatch(login({token: response.data.token, user: response.data.user}));
            localStorage.setItem('token', response.data.token);
            router.push('/home');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 8 }}>
          <Typography variant="h4" mb={4}>Login</Typography>
          <TextField
            {...register('email', { required: 'Email is required' })}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register('password', { required: 'Password is required' })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
      </Container>
    )
}

export default LoginPage;