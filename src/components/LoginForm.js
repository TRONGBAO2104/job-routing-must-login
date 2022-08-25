import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Stack,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Container,
  Box,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { login } from "../apiService";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  // const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultValues = {
    email: "baobao@gmail.com",
    password: "123456",
  };
  const methods = useForm({ defaultValues });
  const {
    setError,
    clearErrors,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log(">>> onSubmit");
    let email = data.email;
    let password = data.password;
    try {
      await login({ email, password });
      auth.setLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      // setError("Invalid email or password");
      setError("afterSubmit", {
        message:
          'WRONG!!! Retry with ID: "baobao@gmail.com.vn" and Password: "123" ',
      });
    }
  };
  return (
    <Container>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ mt: 3, mb: 3, fontWeight: 700 }}
      >
        LOGIN
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} onClick={() => clearErrors()}>
        <Stack spacing={3}>
          <Box sx={{ height: "40px" }}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}
          </Box>

          {/* {error && <Alert severity="error">{error}</Alert>} */}

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Email"
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                error={!!error}
                helperText={error?.message}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 2 }}
        >
          Login
        </LoadingButton>
      </form>
    </Container>
  );
}

export default LoginForm;
