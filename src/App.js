import React, { useState} from 'react';
import LoginForm from './components/LoginForm';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Intervention from './components/Intervention';

function App() {
  const adminUser = {
    email: "customer1@business.com",
    password: "password123"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");
  const[showLogin, setShowLogin] = useState(true);

  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
  }
  
  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password){
      console.log("Logged in");
      setUser ({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("Details do not match!");
      setError("Please Try Again!");
    }
  }

  const Logout = () => {
    setUser ( { name: "", email: "" });
  }

  const navigate = useNavigate();

  const [customerID, setCustomerID] = useState("");
  const [buildingID, setBuildingID] = useState("");
  const [batteryID, setBatteryID] = useState("");
  const [columnID, setColumnID] = useState("");
  const [elevatorID, setElevatorID] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://httpbin.org/post", {
        method: "POST",
          body: JSON.stringify({
          customerID: customerID,
          buildingID: buildingID,
          batteryID: batteryID,
          columnID: columnID,
          elevatorID: elevatorID
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setCustomerID("");
        setBuildingID("");
        setBatteryID("");
        setColumnID("");
        setElevatorID("");
        setMessage("New form has been sent!");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="App">
      <>
      <button className="btnui margin-top-50" onClick={handleToggleLogin}>Toggle</button>
      <Login show={showLogin} close={handleToggleLogin} />
      </>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={customerID}
          placeholder="CustomerID"
          onChange={(e) => setCustomerID(e.target.value)}
        />
        <input
          type="text"
          value={buildingID}
          placeholder="BuildingID"
          onChange={(e) => setBuildingID(e.target.value)}
        />
        <input
          type="text"
          value={batteryID}
          placeholder="BatteryID"
          onChange={(e) => setBatteryID(e.target.value)}
        />

        <input
          type="text"
          value={columnID}
          placeholder="ColumnID"
          onChange={(e) => setColumnID(e.target.value)}
        />

        <input
          type="text"
          value={elevatorID}
          placeholder="ElevatorID"
          onChange={(e) => setElevatorID(e.target.value)}
        />

        <button type="submit">Create New Intervention</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
      
      {(user.email != "") ? (
        <div className="Welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick= {Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>

      )}
          <button onClick={() => navigate(-1)}>New Intervention</button>
          <Routes>
            <Route path="intervention" element={<Intervention/>}/>
          </Routes>

    </div>
  );
}

export default App;


