import React, { useState } from "react";
import CustomerList from "../components/CustomerList";
import AddCustomer from "../components/AddCustomer";
import EditCustomer from "../components/EditCustomer";
import { DELETE_CUSTOMER_MUTATION } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const Customer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [
    removeCustomer,
    { data: removeData, loading: removeLoading, error: removeError },
  ] = useMutation(DELETE_CUSTOMER_MUTATION, {
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const deleteCustomer = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    // If user confirms deletion
    if (confirmDelete) {
      const result = await removeCustomer({
        variables: {
          id: id,
        },
        refetchQueries: ["GetCustomers"],
      });
      console.log("Customer deleted:", result.data.updateCustomer);
    } else {
      console.log("Delete operation cancelled:");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>GraphQL and React Integration</h1>
      </header>
      <main>
        {!selectedCustomer ? (
          <AddCustomer />
        ) : (
          <EditCustomer {...selectedCustomer} />
        )}
        <CustomerList
          setSelectedCustomer={setSelectedCustomer}
          deleteCustomer={deleteCustomer}
        />
      </main>
    </div>
  );
};

export default Customer;
