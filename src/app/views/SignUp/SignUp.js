import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import createUser from '../../utils/fetch/createUser'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: "10%",
    alignItems: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 32,
  },
  pos: {
    marginBottom: 12,
  },
  warningText: {
    color: "red"
  }
});

const SignUp = props => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { match: { params },history } = props;
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(true)
  const [errorText,setErrorText] = useState("")
  const [values, setValues] = useState({email: '', password: '', password2: ''})

  const handleSubmit = async(e)=>{
    setLoading(true)
    const response = await createUser(values.email,values.password)
    if (response.data.id) {
      history.push('/sign-in')
    }
    else{
      setError(true)
      setErrorText('Email ya existe')
    }
    setLoading(false)
  }

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
    const validPassword = values.password === value
    const validPassword2 = values.password2 === value
    if (!values.password2 || !values.password || !values.email) return
    if ((!validPassword && (name === 'password2')) || (!validPassword2 && (name === 'password'))) {
      setError(true)
      setErrorText('Contraseñas no coinciden')
    }else{
      setError(false)
    }

  }

  return (
    <div className={classes.root}>
      <div className="container">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Crear Usuario
            </Typography>
            {error && <p className={classes.warningText}>Usuario y/o contraseña inválida</p>}
            <TextField
              id="standard-full-width"
              label="Email"
              key='email'
              name = 'email'
              onChange={handleInputChange}
              style={{ margin: 8 }}
              placeholder="correo"
              value={values.email}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-full-width"
              label="Contrasena"
              key='password'
              onChange={handleInputChange}
              style={{ margin: 8 }}
              value={values.password}
              name = 'password'
              fullWidth
              type="password"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-full-width"
              label="Repetir Contrasena"
              key='password2'
              onChange={handleInputChange}
              style={{ margin: 8 }}
              value={values.password2}
              name = 'password2'
              fullWidth
              type="password"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>
          <CardActions>
            {!loading && <Button variant="contained" size="small" color="primary" onClick={() => { handleSubmit() }}>Crear</Button>}
            {loading && <Button disabled onClick={() => { handleSubmit() }}>Crear</Button>}
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;