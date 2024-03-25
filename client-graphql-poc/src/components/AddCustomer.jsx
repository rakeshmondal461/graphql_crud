import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ADD_CUSTOMER_MUTATION } from "../graphql/mutations";

const AddCustomer = () => {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [addCustomer, { data, loading, error }] = useMutation(
    ADD_CUSTOMER_MUTATION,
    {
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    }
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const result = await addCustomer({
        variables: {
          createCustomerInput: {
            email: email,
            mobileNumber: mobileNumber,
          },
        },
        refetchQueries: ["GetCustomers"],
      });
      console.log("Customer added:", result.data.addCustomer);
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
        <label htmlFor="mob">Mobile Number:</label>
        <input
          type="number"
          id="mob"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <br />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
