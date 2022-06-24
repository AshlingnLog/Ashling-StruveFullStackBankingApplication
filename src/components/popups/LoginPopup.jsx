import { useFormik } from "formik";
import useUserContext from "../../hooks/useUserContext";
import * as yup from "yup";
import { Button, TextField, Box } from "@mui/material";

const LoginPopUp = ({ handleClose }) => {
  const { user } = useUserContext();

  //Validation schema
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const targetUser = user.users.find(
      (user) => user.email === formik.values.email
    );

    if (!targetUser) return alert("User does not exist");

    //Validate password
    if (targetUser.password !== formik.values.password)
      return alert("Invalid credentials");

    return alert("Logged In!");
  };

  const cancelButtonStyles = {
    backgroundColor: "#495057",
  };

  return (
    <>
      <div className="popup-box">
        <div className="box">
          <span className="">Login</span>
          <hr />
          <form onSubmit={(e) => handleLogin(e)}>
            <Box m={2}>
              <TextField
                className="text-box custom-input-box"
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            <Box m={2}>
              <TextField
                className="text-box custom-input-box"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>

            <Box m={2} className="custom-btn-group">
              <Button
                variant="contained"
                style={cancelButtonStyles}
                type="submit"
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                type="submit"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPopUp;
