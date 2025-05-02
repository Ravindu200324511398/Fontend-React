import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react"
import { SignUpTask} from "../../service/Auth"
import { useAuth } from "./AuthProvider"
import { useNavigate } from 'react-router';
import styles from "./signupstyle.module.css"

export const SignUp = () => {
    interface SignUp{
        firstName:string,
        lastName:string,
        email:string,
        password:string,
        role:string,
    }

    const { login } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState<SignUp>({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        role:""
    })

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleOnSubmit = async (e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const token = await SignUpTask(user)      
        console.log(token)
        login(token)
        setUser({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            role:""
        })
        //navigate to /book
        navigate("/book")

       
    }

     return(
<div className={styles.background}>
<p className={styles.signup}>Sign up</p>
    <Form className="d-flex flex-column align-items-center mt-5" onSubmit={handleOnSubmit}>
    <div style={{ width: '500px' }}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control 

        type="text" 
        placeholder="Enter First Name"
        name="firstName"
        value={user.firstName}
        onChange={handleOnChange}

         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 

        type="text" 
        placeholder="Enter Last Name"
        name="lastName"
        value={user.lastName}
        onChange={handleOnChange}

         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        
        type="email" 
        placeholder="Enter email"
        name="email"
        value={user.email}
        onChange={handleOnChange}

         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        
        type="password" 
        placeholder="Enter Password"
        name="password"
        value={user.password}
        onChange={handleOnChange}

         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Role</Form.Label>
        <Form.Select name="role" value={user.role} onChange={handleOnChange}>
            <option value="">Select a role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="OFFICER">OFFICER</option>
            <option value="LIBRARIAN">LIBRARIAN</option>
          </Form.Select>
      </Form.Group>

      <Button variant="success" type="submit">
        Register
      </Button>
    </div>
    </Form>
</div>
        
  )
}