import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions/authActions';
import authentication from '../../utils/fetch/auth';

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

const SignIn = props => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { history } = props;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    const response = await authentication(email, password)
    if (response.data.id) {
      dispatch(logIn(response.headers.authorization, response.data.email, response.data.role, response.data.description))
      history.push('/')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className={classes.root}>
      <div className="container">
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Iniciar Sesion o <a href="/sign-up">crea una cuenta</a>
            </Typography>
            {error && <p className={classes.warningText}>Usuario y/o contraseña inválida</p>}
            <TextField
              id="standard-full-width"
              label="Email"
              key='email'
              onChange={(e) => setEmail(e.target.value)}
              style={{ margin: 8 }}
              placeholder="correo"
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              style={{ margin: 8 }}
              value={password}
              fullWidth
              type="password"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>
          <CardActions>
            {!loading && <Button variant="contained" size="small" color="primary" onClick={() => { handleSubmit() }}>Ingresar</Button>}
            {loading && <Button disabled onClick={() => { handleSubmit() }}>Ingresar</Button>}
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;