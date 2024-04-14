import React, { useState } from "react";
import CustomerList from "../components/CustomerList";
import AddCustomer from "../components/AddCustomer";
import EditCustomer from "../components/EditCustomer";
import { DELETE_CUSTOMER_MUTATION } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import SearchCustomerList from "../components/SearchCustomerList";

const Customer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [searchName, setSearchName] = useState("");

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

        <div style={{ marginBlock: "10px" }}>
          <input
            type="text"
            placeholder="Search here..."
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        {!searchName ? (
          <CustomerList
            setSelectedCustomer={setSelectedCustomer}
            deleteCustomer={deleteCustomer}
          />
        ) : (
          <SearchCustomerList
            setSelectedCustomer={setSelectedCustomer}
            deleteCustomer={deleteCustomer}
            searchName={searchName}
          />
        )}
      </main>
    </div>
  );
};

export default Customer;
