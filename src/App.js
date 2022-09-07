import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { useNavigate, Routes, Route } from "react-router-dom";
import Intervention from "./components/Intervention";
import InterventionForm from "./components/InterventionForm";
import axios from "axios";


export default function App() {
    const config = {
    headers : { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo'}
  };
  const [data, setData] = useState([]);
  const getInterventions = () => {
    axios.get('https://java-api.codeboxxtest.xyz/customers/2', config)
      .then((response) => {
        console.log(response.data.interventions);
        setData(response.data.interventions)
      })
      .catch((error) => {
        console.log(error)
      });
  };

    useEffect(() => {
      getInterventions();
    }, []);

    const displayData = () => {
      return data ? (
        data.map((interventions) => {
          return (
            <div className="data" key={interventions}>
              <h3>{interventions}</h3>
            </div>
          );
        })
      ) : (
        <h3> No Data Yet</h3>
      );
    }

  // const config = {
  //   headers : { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo'}
  // };
  // axios.get ('https://java-api.codeboxxtest.xyz/customers/2', config)
  // .then(res => {
  //   console.log(res.data.interventions);
  // })
  // .catch(err => {
  //   console.log(err);
  // });  
  // const Interventions = () => {

  //   useEffect(() => {
  //     getInterventions();

  //   }, [])

  //   const [interventions, setInterventions] = useState([])
  //   const [loading, setLoading] = useState(false)

  //   const getInterventions = async () => {
  //     try {
  //       const res = await axios.get ('https://java-api.codeboxxtest.xyz/customers/2');
  //       setInterventions(res.data.interventions);
  //       setLoading(true);
  //     } catch (err) {
  //       alert(err.message)
  //     }
  //   }
  // }
  const adminUser = {
    email: "customer1@business.com",
    password: "password123",
  };
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
  };
  const Login = (details) => {
    // console.log(details);

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
      setShowForm(true);
    } else {
      // console.log("Details do not match!");
      setError("Please Try Again!");
    }
  };
  const Logout = () => {
    setUser({ name: "", email: "" });
    setShowForm(false);
    // navigate("/");
  };
  const navigate = useNavigate();

  return (

    <div className="App">

      <>
        <Login show={showLogin} close={handleToggleLogin} />
      </>
      {user.email !== "" ? (
        <div className="Welcome">
          <button onClick={displayData}>Intervention </button>
          <button onClick={Logout}>Logout</button>
          <button onClick={() => navigate("intervention")}>
            New Intervention
          </button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
      <Routes>
        <Route path="intervention" element={<Intervention />} />
      </Routes>
    </div>

  );
}

