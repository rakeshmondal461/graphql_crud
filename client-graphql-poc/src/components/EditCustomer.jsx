import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { UPDATE_CUSTOMER_MUTATION } from "../graphql/mutations";

const EditCustomer = ({
  email: selectedEmail,
  mobileNumber: selectedMobileNumber,
  name: selectedName,
  id: selectedId,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [id, setId] = useState("");

  const [updateCustomer, { data, loading, error }] = useMutation(
    UPDATE_CUSTOMER_MUTATION,
    {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );

  useEffect(() => {
    setEmail(selectedEmail);
    setMobileNumber(selectedMobileNumber);
    setName(selectedName);
    setId(selectedId);
  }, [selectedEmail, selectedMobileNumber, selectedId]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = await updateCustomer({
        variables: {
          updateCustomerInput: {
            email: email,
            id: id,
            name: name,
            mobileNumber: mobileNumber,
          },
        },
        refetchQueries: ["GetCustomers"],
      });
      console.log("Customer added:", result.data.updateCustomer);
      console.log;
      setEmail("");
      setMobileNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="mob">Mobile Number:</label>
        <input
          type="number"
          id="mob"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCustomer;
