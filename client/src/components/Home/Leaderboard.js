// import React from 'react'
import { Row, Col, Input, Button, TreeSelect } from "antd"
import { FaSearch } from "react-icons/fa"
import { useQuery } from "@apollo/client"
import { GET_DONATIONS, GET_MOST_DONATIONS } from "../../graphql/query"
import moment from "moment"
import { useState } from "react"
function Leaderboard() {
  const [value, setValue] = useState("recent")
  //=====get Data==========
  const { loading, data: donateData, error } = useQuery(GET_DONATIONS)
  const {
    loading: lodingMostDonate,
    data: mostDonateData,
    error: errorMostDonate,
  } = useQuery(GET_MOST_DONATIONS)
  if (loading || lodingMostDonate) return null
  if (error || errorMostDonate) return `Error! ${error.message}`
  console.log(donateData)
  const active = (e) => {
    const recents = document.getElementById("most-recents")
    const trees = document.getElementById("most-trees")
    if (e.target.id === "most-recents") {
      trees.className = "clicked"
      recents.className = ""
      recents.style.zIndex = 2
      trees.style.zIndex = 1
      setValue("recent")
    } else if (e.target.id === "most-trees") {
      recents.className = "clicked"
      trees.className = ""
      trees.style.zIndex = 2
      recents.style.zIndex = 1
      setValue("most")
    }
  }
  return (
    <div style={{ marginTop: "50px" }}>
      <h1>LEADERBOARD</h1>
      <Row align="middle" justify="center">
        <Col className="search-box gutter-row">
          <Input className="search" type="text" placeholder="Search" />
          <FaSearch className="fa-search" />
        </Col>
        <Col offset={1} className="gutter-row">
          <button value="recent" id="most-recents" onClick={active}>
            Most Recents
          </button>
          <button value="most" id="most-trees" className="clicked" onClick={active}>
            Most Trees
          </button>
        </Col>
      </Row>
      {value === "recent" ? (
        <div className="container user-list">
          {donateData.get_donations.map((res) => {
            const { tree, name, anonymous, create_at, user_message } = res
            console.log(anonymous)
            return (
              <Row className="list" align="middle">
                <Col
                  className="avatar"
                  xs={{ span: 24 }}
                  sm={{ span: 2 }}
                  md={{ span: 1 }}
                >
                  <img src="/images/list-images/icon1.svg" alt="" />
                </Col>
                <Col flex="auto">
                  <p className="list-title">
                    {anonymous === false ? name : "Anonymous"}
                  </p>
                  <p className="list-message">{user_message}</p>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24, offset: 3 }} md={{ span: 7 }}>
                  <p>
                    {tree === 1 ? (
                      <p className="badge">{tree} tree</p>
                    ) : (
                      <p className="badge">{tree} trees</p>
                    )}
                  </p>

                  <p className="list-message">
                    {moment.unix(create_at / 1000).format(" Do YYYY, h:mm:ss A")}
                  </p>
                </Col>
              </Row>
            )
          })}
          <a href="#form">
            <Button className="add-tree-btn">ADD YOUR TREE</Button>
          </a>
        </div>
      ) : (
        <div className="container user-list">
          {mostDonateData.get_most_trees.map((res) => {
            const { tree, name, anonymous, create_at, user_message } = res
            console.log(anonymous)
            return (
              <Row className="list" align="middle">
                <Col
                  className="avatar"
                  xs={{ span: 24 }}
                  sm={{ span: 2 }}
                  md={{ span: 1 }}
                >
                  <img src="/images/list-images/icon1.svg" alt="" />
                </Col>
                <Col flex="auto">
                  <p className="list-title">
                    {anonymous === false ? name : "Anonymous"}
                  </p>
                  <p className="list-message">{user_message}</p>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24, offset: 3 }} md={{ span: 7 }}>
                  <p>
                    {tree === 1 ? (
                      <p className="badge">{tree} tree</p>
                    ) : (
                      <p className="badge">{tree} trees</p>
                    )}
                  </p>

                  <p className="list-message">
                    {/* {moment.unix(create_at / 1000).format("YYYY-MM-DD")}, */}
                    {moment.unix(create_at / 1000).format(" Do YYYY, h:mm:ss A")}
                  </p>
                </Col>
              </Row>
            )
          })}
          <a href="#form">
            <Button className="add-tree-btn">ADD YOUR TREE</Button>
          </a>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
// import React from "react"
// import TestForm from "./testForm"

// const Leaderboard = () => {
//   return (
//     <div>
//       <TestForm />
//     </div>
//   )
// }

// export default Leaderboard