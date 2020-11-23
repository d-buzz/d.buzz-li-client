import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getOrigLinkRequest } from "../../../store/link/actions";

const RedirectLongUrl = (props) => {
  const { match, getOrigLinkRequest } = props;
  const { keyword } = match.params;
  const [origLink, setOrigLink] = useState("");

  useEffect(() => {
    if (keyword) {
      getOrigLinkRequest(keyword).then((result) => {
        if (result.statusCode === 200) {
          setOrigLink(result.origLink);
        } else {
          setOrigLink(window.location.origin);
        }
      });
    }
  }, []);

  return (
    <React.Fragment>
      {origLink && window.location.replace(origLink)}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      getOrigLinkRequest,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RedirectLongUrl);
