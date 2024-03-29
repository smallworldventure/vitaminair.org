import { useQuery } from "@apollo/client";
import React from "react";
import Footer from "../../components/footer";
import { GET_A_PLANTS_SLUG } from "../../graphql/query";
import { useRouter } from "next/router";
import Output from "editorjs-react-renderer";
import { Divider, Layout, Spin } from "antd";
import { FlapperSpinner } from "react-spinners-kit";
function PlantsDetails() {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, data } = useQuery(GET_A_PLANTS_SLUG, {
    variables: {
      slug,
    },
  });
  if (loading)
    return (
      <center style={{ marginTop: "400px" }}>
        <FlapperSpinner size={50} color="#00ff89" />
      </center>
    );

  const { name, des, image, sciname, family } = data.get_a_plant_slug;

  return (
    <React.Fragment>
      <div className="container">
        <div className="single-background">
          <center>
            <img
              className="blog-image"
              src={"https://backend.vitaminair.org/public/uploads/" + image}
              alt="img"
            />
          </center>
          <div className="single-content-plants">
            <div className="line-plants-single">
              <div className="dispaly-title">
                <small>
                  <p className="title-localname">Local Name:</p>
                </small>
                <small>
                  <p className="name">{name}</p>
                </small>
              </div>
              <div className="dispaly-title">
                <small>
                  <p className="title-localname ">Scientific Name:</p>
                </small>
                <small>
                  <p className="name">{sciname}</p>
                </small>
              </div>
              <div className="dispaly-title">
                <small>
                  <p className="title-localname">Family:</p>
                </small>
                <small>
                  <p className="name">{family}</p>
                </small>
              </div>
            </div>
            <Divider
              className="divider"
              // style={{ margin: "0px" }}
              type="horizontal"
            />
            <Output data={JSON.parse(des)} />
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default PlantsDetails;
