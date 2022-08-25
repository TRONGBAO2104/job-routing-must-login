import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Stack,
  TextField,
  Typography,
  Checkbox,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Container,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { login } from "../apiService";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultValues = {
    email: "bao@gmail.com",
    password: "123",
    // remember: true,
  };
  const methods = useForm({ defaultValues });
  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;
  // console.log(setError);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    let email = data.email;
    let password = data.password;
    try {
      await login({ email, password });
      auth.setLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error);
      // setError("Invalid email or password");
      setError("afterSubmit", { message: "Invalid email or password" });
    }
  };
  return (
    <Container>
      <Typography variant="h3" textAlign="center" sx={{ mt: 3, mb: 3 }}>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

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

        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            label="Remember me"
            control={
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={field.value} />
                )}
              />
            }
          />
        </Stack> */}
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

// import {
//   Alert,
//   Container,
//   IconButton,
//   InputAdornment,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import React, { useContext, useReducer, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { login } from "../apiService";
// import { AuthContext } from "../App";
// import { LoadingButton } from "@mui/lab";
// import { useNavigate } from "react-router-dom";

// // 2. Action:
// const loginReducer = (state, action) => {
//   switch (action.type) {
//     case "login":
//       return { ...state, isLoading: true };
//     case "error":
//       return {
//         ...state,
//         isLoading: false,
//         error: "Invalid username or password",
//         isLoggedIn: false,
//       };
//     case "success":
//       return {
//         ...state,
//         isLoading: false,
//         error: "",
//         isLoggedIn: true,
//         password: "",
//       };
//     case "logout":
//       return {
//         ...state,
//         isLoggedIn: false,
//         username: "",
//       };
//     case "field":
//       return {
//         ...state,
//         [action.payload.name]: action.payload.value,
//       };
//     default:
//       return state;
//   }
// };

// // Create initial state
// const initialValue = {
//   username: "baotvt",
//   password: "",
//   isLoading: false,
//   error: "",
//   isLoggedIn: false,
// };

// // 3. Create reducer function

// // 4. Dispatch

// function App() {
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [state, dispatch] = useReducer(loginReducer, initialValue);
//   const [showPassword, setShowPassword] = useState(false);
//   const { username, password, isLoading } = state;

//   const methods = useForm({ initialValue });
//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = methods;

//   const onSubmit = async (e) => {
//     // e.preventDefault();

//     auth.setLoggedIn(true);
//     navigate("/");

//     // const x = await login({ username: "baotvt", password: "123" });
//     // console.log(x);

//     dispatch({ type: "login" });
//     try {
//       await login({ username, password });
//       dispatch({ type: "success" });
//     } catch (error) {
//       dispatch({ type: "error" });
//     }
//   };
//   return (
//     <>
//       <Container>
//         <Typography variant="h3" textAlign="center" mb={3}>
//           LOGIN
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Stack spacing={3}>
//             {!!errors.afterSubmit && (
//               <Alert severity="error">{errors.afterSubmit.message}</Alert>
//             )}

//             <Controller
//               name="username"
//               control={control}
//               render={({ field, fieldState: { error } }) => (
//                 <TextField
//                   label="Username"
//                   fullWidth
//                   error={!!error}
//                   helperText={error?.message}
//                   {...field}
//                 />
//               )}
//             />

//             <Controller
//               name="password"
//               control={control}
//               render={({ field, fieldState: { error } }) => (
//                 <TextField
//                   label="Password"
//                   type={showPassword ? "text" : "password"}
//                   fullWidth
//                   error={!!error}
//                   helperText={error?.message}
//                   {...field}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={() => setShowPassword(!showPassword)}
//                           onMouseDown={(e) => e.preventDefault()}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               )}
//             />
//           </Stack>

//           <LoadingButton
//             fullWidth
//             size="large"
//             type="submit"
//             onClick={onSubmit}
//             disabled={isLoading}
//             variant="contained"
//             loading={isSubmitting}
//             sx={{ mt: 2 }}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </LoadingButton>
//         </form>
//       </Container>
//     </>
//   );
// }

// export default App;
