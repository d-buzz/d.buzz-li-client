import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@material-ui/icons/ToggleOnOutlined";

import { makeStyles, Tooltip } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { DomainFormModal } from "../../../components";
import { updateDomainStatusRequest } from "../../../store/whitelist/actions";
import { broadcastNotification } from "../../../store/interface/actions";

const useStyles = makeStyles({
  editIcon: {
    color: green[500],
    cursor: "pointer",
  },
  toggleStatus: {
    cursor: "pointer",
  }
});

const DomainListActions = (props) => {
  const classes = useStyles();
  const {
    domainId,
    domainName,
    isActive = 1,
    updateDomainStatusRequest,
    handleGetDomainList,
    broadcastNotification,
  } = props;
  const [showEdit, setShowEdit] = useState(false);

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleToggleStatus = () => {
    let paramStatus = 1;
    if (isActive === 1) {
      paramStatus = 0;
    }

    updateDomainStatusRequest(domainId, paramStatus).then((result) => {
      if (result.code === 200) {
        handleGetDomainList();
        broadcastNotification("success", result.message);
      } else {
        broadcastNotification("error", result.message);
      }
    });
  };

  const handleCloseEditModal = () => {
    setShowEdit(false);
  };

  return (
    <React.Fragment>
      <div>
        <Tooltip title="Edit domain">
          <EditOutlinedIcon
            className={classes.editIcon}
            onClick={handleEdit}
            fontSize="large"
          />
        </Tooltip>

        {isActive == 1 && (
          <Tooltip title="Toggle inactive status">
            <ToggleOnOutlinedIcon
              className={classes.toggleStatus}
              onClick={handleToggleStatus}
              fontSize="large"
            />
          </Tooltip>
        )}

        {isActive == 0 && (
          <Tooltip title="Toggle active status">
            <ToggleOffOutlinedIcon
              color="action"
              className={classes.toggleStatus}
              onClick={handleToggleStatus}
              fontSize="large"
            />
          </Tooltip>
        )}
      </div>
      <DomainFormModal
        domainId={domainId}
        domainName={domainName}
        show={showEdit}
        onHide={handleCloseEditModal}
      />
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      updateDomainStatusRequest,
      broadcastNotification,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(DomainListActions);
