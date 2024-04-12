import ModalUnstyled from "@mui/core/ModalUnstyled";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "../../components/dialog/Dialog";
import setAuthToken from "../../untils/setAuthToken";
import AddStaff from "./AddStaff";
import UpdateStaff from "./UpdateStaff";
import { ENDPOINT } from "../../App";
import { BsSearch } from "react-icons/bs";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Staffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [originStaffs, setOriginStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [showFormAddStaff, setShowFormAddStaff] = useState(false);
  const [showFormUpdateStaff, setShowFormUpdateStaff] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const componentRef = useRef();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const columns = [
    { id: "_id", label: "Mã nhân viên" },
    { id: "fullname", label: "Tên nhân viên" },
    {
      id: "telephoneNumber",
      label: "Số điện thoại",

      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "sex",
      label: "Giới tính",
    },
  ];

  const searchTextHandler = (e) => {
    setSearchText(e.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleCloseDialog = () => {
    setShowDialogDelete(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteStaff = () => {
    const accessToken = localStorage.getItem("accessToken");
    setAuthToken(accessToken);
    axios
      .delete(`${ENDPOINT}/auth/delete/${selectedStaff._id}`)
      .then((res) => {
        handleCloseDialog();
        toast("Xóa nhân viên thành công");
        setSelectedStaff(null);
      })
      .catch(() => {
        handleCloseDialog();
        toast("Xóa nhân viên thất bại");
      });
  };
  //filter by phone and name staffs
 useEffect(()=>{
  //Call api and get data
  axios
    .get(`${ENDPOINT}/auth/search?text=${searchText}`)
    .then((response)=>{
      console.log(response)
      setStaffs(response.data.staffs)
    })
    .catch((error)=>{
      console.log(error.response.data);
    })
 },[searchText])

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAuthToken(accessToken);
    axios
      .get(`${ENDPOINT}/auth/getAllStaffs`)
      .then((res) => {
        setStaffs(res.data.staffs);
        setOriginStaffs(res.data.staffs);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [selectedStaff, showFormAddStaff, showFormUpdateStaff]);

  return (
    <div className="main staffs">
      <Dialog
        title="Xoá nhân viên"
        content={`Bạn có muốn xoá nhân viên: ${selectedStaff?.fullname} `}
        open={showDialogDelete}
        handleCancel={handleCloseDialog}
        handleAction={handleDeleteStaff}
      />
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={showFormAddStaff}
        onClose={() => {
          setShowFormAddStaff(false);
        }}
        BackdropComponent={Backdrop}
      >
        <AddStaff setShowFormAddStaff={setShowFormAddStaff} />
      </StyledModal>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={showFormUpdateStaff}
        onClose={() => {
          setShowFormUpdateStaff(false);
        }}
        BackdropComponent={Backdrop}
      >
        <UpdateStaff
          staff={selectedStaff}
          setStaff={setSelectedStaff}
          setShowFormUpdateStaff={setShowFormUpdateStaff}
        />
      </StyledModal>
      <div className="search_name">
        <div className="search_name-wrapper">
          <input
            className="search_name-input"
            id="search_name-input"
            value={searchText}
            onChange={searchTextHandler}
            placeholder="Nhập tên hoặc SĐT nhân viên"
          />
          <label htmlFor="search_name-input" className="search_name-icon">
            <BsSearch />
          </label>
        </div>
      </div>
      <div className="main_list">
        <div className="list_left">
          <div className="action-btn">
            <button className="btn" onClick={() => setShowFormAddStaff(true)}>
              <i className="bx bx-plus action-btn-icon"></i>
              Thêm nhân viên
            </button>
          </div>
        </div>
        <div className="list_right">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                ref={componentRef}
                stickyHeader
                aria-label="sticky table"
                style={{ boxShadow: "0 2px 15px rgb(0 0 0 / 25%) !important" }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundImage:
                            "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                          color: "#fff",
                          fontSize: "17px",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{
                        backgroundImage:
                          "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                      }}
                    ></TableCell>
                    <TableCell
                      style={{
                        backgroundImage:
                          "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                      }}
                    ></TableCell>
                    <TableCell
                      style={{
                        backgroundImage:
                          "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                      }}
                    ></TableCell>
                    <TableCell
                      style={{
                        backgroundImage:
                          "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          key={row.code}
                          style={
                            index % 2 === 1
                              ? { backgroundColor: "#ff861a24" }
                              : {}
                          }
                        >
                          {columns.map((column) => {
                            let value = row[column.id];
                            if (column.id === "_id") {
                              value = value?.substr(value.length - 7);
                            }

                            return (
                              <TableCell
                                key={column.id}
                                style={{ fontSize: "16px" }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            onClick={() => {
                              setSelectedStaff(row);
                            }}
                          >
                            <i
                              style={{
                                fontSize: 18,
                                color: "#005059",
                                cursor: "pointer",
                              }}
                              className="bx bxs-edit hide-on-print"
                            ></i>
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              setSelectedStaff(row);
                            }}
                          >
                            <i
                              style={{
                                fontSize: 18,
                                color: "#fd501b",
                                cursor: "pointer",
                              }}
                              className="bx bx-trash hide-on-print"
                            ></i>
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              console.log("update");
                              setSelectedStaff(row);

                              setShowFormUpdateStaff(true);
                            }}
                          >
                            <AiFillEdit
                              style={{
                                fontSize: 18,
                                color: "#005059",
                                cursor: "pointer",
                              }}
                              className="hide-on-print"
                            />
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              console.log("delete");
                              setSelectedStaff(row);
                              setShowDialogDelete(true);
                            }}
                          >
                            <AiFillDelete
                              style={{
                                fontSize: 18,
                                color: "#fd501b",
                                cursor: "pointer",
                              }}
                              className="hide-on-print"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6]}
              component="div"
              count={staffs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng hiển thị"
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Staffs;
