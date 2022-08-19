import React, { useState } from "react";
// import { Navigate } from "react-router-dom";

function InterventionForm() {
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
                    elevatorID: elevatorID,
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
        <>
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

                <div className="message">
                    {message ? <p>{message}</p> : null}
                </div>
            </form>
        </>
    );
}

export default InterventionForm;
