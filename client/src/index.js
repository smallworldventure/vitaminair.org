import React from "react"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

const client = new ApolloClient({
  // uri: "https://backend.vitaminair.org/graphql",
  uri: "http://localhost:3600/graphql",
  cache: new InMemoryCache(),
})
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
